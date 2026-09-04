from PIL import Image, ImageOps, ImageDraw

def create_favicons():
    # Load source logo
    logo = Image.open("public/images/logo.png").convert("RGBA")
    
    # 1. High-res 512x512 icon on clean white circle for browser tab clarity
    size = 512
    icon_circle = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon_circle)
    
    # Draw white circle badge with subtle forest border
    margin = 16
    draw.ellipse([margin, margin, size - margin, size - margin], fill=(255, 255, 255, 255), outline=(46, 125, 50, 200), width=8)
    
    # Scale logo to fit inside the circle
    inner_width = size - (margin * 2) - 48
    scale = inner_width / logo.width
    inner_height = int(logo.height * scale)
    scaled_logo = logo.resize((inner_width, inner_height), Image.Resampling.LANCZOS)
    
    # Paste centered
    offset_x = (size - inner_width) // 2
    offset_y = (size - inner_height) // 2
    icon_circle.paste(scaled_logo, (offset_x, offset_y), scaled_logo)
    
    # Save icon.png (512x512)
    icon_circle.save("src/app/icon.png", "PNG")
    icon_circle.save("public/icon.png", "PNG")
    
    # Save apple-icon.png (180x180)
    apple_icon = icon_circle.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save("src/app/apple-icon.png", "PNG")
    apple_icon.save("public/apple-icon.png", "PNG")
    
    # Also save multi-resolution favicon.ico (16x16, 32x32, 48x48, 64x64, 128x128, 256x256)
    icon_circle.save(
        "src/app/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    )
    icon_circle.save(
        "public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    )
    print("Favicons generated successfully!")

if __name__ == "__main__":
    create_favicons()
