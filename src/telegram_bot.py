__all__ = ["InputSticker", "StickerFormat", "BOT_USERNAME"]

import os
from telegram import Bot, InputSticker
from telegram.constants import StickerFormat


TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

bot = Bot(token=TELEGRAM_BOT_TOKEN)

# TODO: change to env variable or something else
BOT_USERNAME = "GenAIStickersBot"

async def create_sticker_pack(name: str, title:str, stickers: list[InputSticker]):
    async with bot:
        # TODO: change to sticker_pack.user_id
        return await bot.create_new_sticker_set(2816783, name, title, stickers)

async def delete_sticker_pack(name: str):
    async with bot:
        return await bot.delete_sticker_set(name)