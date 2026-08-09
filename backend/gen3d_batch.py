import asyncio, os, base64, sys, time
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

SLUGS = [
    "my-dream-nest", "my-dream-casa", "my-dream-avasa", "my-dream-skylark",
    "my-dream-glenmore", "my-dream-hillock", "my-dream-summit", "my-dream-griffin",
    "my-dream-selene", "my-dream-atlantis", "my-dream-perch", "my-dream-solace",
    "my-dream-zenith", "my-dream-aurelia", "my-dream-elysium", "my-dream-aura",
    "my-dream-echelon", "my-dream-vale",
]

PROMPT = """Transform this 2D architectural floor plan into a premium photorealistic 3D cutaway (dollhouse) floor plan render.

CAMERA: tilted three-quarter aerial perspective, camera elevated roughly 45 degrees looking down at the floor from one corner — NOT a flat top-down view. The entire floor plan must be visible in one frame with gentle perspective depth, walls with visible height, no dramatic distortion.

CRITICAL ACCURACY: preserve the EXACT layout, positions, proportions and geometry of this floor plan. Read the room labels written in the plan and furnish each room according to its labeled function. Every room, wall, door opening, window, balcony, toilet, kitchen, utility, passage, staircase and lift must stay in its exact original position and relative size. Do not add, remove, move or resize any room or architectural element.

STYLE: luxury real-estate developer brochure quality. The model rests on a deep charcoal near-black architectural studio background with a very subtle graphite gradient, a soft natural contact shadow beneath the model, and a slight warm architectural key light — like a premium physical scale model photographed on a dark studio table. Warm ivory walls with clean cut edges and visible wall thickness; light natural wood flooring in bedrooms and living areas; elegant light-grey stone tiles in kitchens, toilets and balconies; premium minimal furniture matching each room's labeled function; soft daylight with gentle shadows and subtle ambient occlusion; a calm premium palette of warm wood, ivory, beige, light grey and subtle charcoal.

ABSOLUTELY NO TEXT, NO LABELS, NO DIMENSIONS, NO NUMBERS, NO LOGOS, NO WATERMARKS anywhere in the image. No people. Sharp architectural edges, high resolution, photorealistic rendering."""

OUT = "/app/backend/gen3d"
os.makedirs(OUT, exist_ok=True)


async def gen(slug):
    plan = f"/app/frontend/public/assets/projects/{slug}/floor-plan-display.jpg"
    with open(plan, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    chat = LlmChat(
        api_key=os.environ["EMERGENT_LLM_KEY"],
        session_id=f"plan3d-{slug}",
        system_message="You are an architectural visualization expert producing premium real-estate renders.",
    )
    chat.with_model("gemini", "gemini-3-pro-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=PROMPT, file_contents=[ImageContent(b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    if images:
        data = base64.b64decode(images[0]["data"])
        with open(f"{OUT}/{slug}.jpg", "wb") as f:
            f.write(data)
        print(f"OK {slug} {len(data)} bytes", flush=True)
    else:
        print(f"FAIL {slug} no image; text={(text or '')[:120]}", flush=True)


async def main():
    for slug in SLUGS:
        dest = f"{OUT}/{slug}.jpg"
        if os.path.exists(dest):
            print(f"SKIP {slug}", flush=True)
            continue
        for attempt in (1, 2):
            try:
                await gen(slug)
                break
            except Exception as e:
                print(f"ERR {slug} attempt {attempt}: {str(e)[:200]}", flush=True)
                time.sleep(5)
        time.sleep(2)
    print("ALL DONE", flush=True)


asyncio.run(main())
