import os.path

import cv2
import io
import numpy as np
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# converting image into opencv image
def __convert_to_bytes(file):
    image_content = file.read()
    pillow_img = Image.open(io.BytesIO(image_content))
    return np.array(pillow_img)

def predict_image(image):
    image = __convert_to_bytes(image)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray_image, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)

    lines = cv2.HoughLinesP(edges, 1, np.pi / 180 , 100, minLineLength=200, maxLineGap=5)

    horizontal_lines = []
    for line in lines:
        x1, y1, x2, y2 = line[0]
        if abs(y2-y1) < 10:
            horizontal_lines.append((y1, y2))

    horizontal_lines.sort()

    text_regions = []
    prev_y = 0
    for y1, y2 in horizontal_lines:
        answers_region = gray_image[prev_y:y1, :]
        text_regions.append(answers_region)
        prev_y = y2

    answers = []

    for idx, region in enumerate(text_regions):
        if not os.path.exists("predictions"):
            os.mkdir("predictions")
        cv2.imwrite(f"predictions/answer_{idx}.png", region)
        text = pytesseract.image_to_string(region, config = "--psm 6")
        answers.append(text)
        print(f"Answer {idx + 1}: {text}")

    return answers;