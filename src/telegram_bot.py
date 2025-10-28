__all__ = ["InputSticker", "StickerFormat", "BOT_USERNAME", "InputFile"]

import os
from typing import Sequence
from telegram import Bot, InputSticker, File, InputFile
from telegram.constants import StickerFormat
import asyncio

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

bot = Bot(token=TELEGRAM_BOT_TOKEN)

BOT_USERNAME = None

async def fetch_username():
    global BOT_USERNAME
    if not BOT_USERNAME:
        bot_data = await bot.get_me()
        BOT_USERNAME = bot_data.username
    return BOT_USERNAME


async def create_sticker_pack(name: str, title:str, stickers: list[InputSticker]):
    async with bot:
        # TODO: change to sticker_pack.user_id
        return await bot.create_new_sticker_set(12911582, name, title, stickers)


async def delete_sticker_pack(name: str):
    async with bot:
        # Are sticker set names unique?
        return await bot.delete_sticker_set(name)


async def update_sticker_set_title(name: str, title: str):
    async with bot:
        return await bot.set_sticker_set_title(name, title)


async def add_sticker_to_set(_user_id: int, name: str, sticker: InputSticker):
    async with bot:
        # TODO: change to sticker_pack.user_id
        return await bot.add_sticker_to_set(12911582, name, sticker)


async def remove_sticker_from_set(sticker: InputSticker):
    async with bot:
        return await bot.delete_sticker_from_set(sticker)


async def update_sticker_emoji(sticker):
    pass

async def upload_sticker_file(sticker_bytes) -> File:
    async with bot:
        return await bot.upload_sticker_file(12911582, InputFile(sticker_bytes), StickerFormat.STATIC)

