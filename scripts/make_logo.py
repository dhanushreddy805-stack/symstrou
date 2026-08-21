import urllib.request, io
from PIL import Image, ImageDraw
import numpy as np

URL = "https://customer-assets-0z36b82j.emergentagent.net/job_pitch-symstruo/artifacts/v2mjky64_17854de9-fc4c-4447-ae28-052e18772847.png"
raw = urllib.request.urlopen(URL, timeout=60).read()
img = Image.open(io.BytesIO(raw)).convert("RGB")
w, h = img.size
print("size", w, h)

# Flood fill white background from the 4 corners with a marker color, then make marker transparent.
marker = (255, 0, 255)
fill_img = img.copy()
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    ImageDraw.floodfill(fill_img, seed, marker, thresh=40)

arr = np.array(fill_img)
rgba = np.array(img.convert("RGBA"))
mask = (arr[..., 0] == 255) & (arr[..., 1] == 0) & (arr[..., 2] == 255)
rgba[..., 3] = np.where(mask, 0, 255)

out = Image.fromarray(rgba, "RGBA")
# trim transparent margins
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
out.save("/app/frontend/public/logo-star.png")
print("saved", out.size, "transparent px:", int(mask.sum()))
