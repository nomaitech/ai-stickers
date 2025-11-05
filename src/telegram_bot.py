__all__ = ["InputSticker", "StickerFormat", "BOT_USERNAME", "InputFile"]

import os
from telegram import Bot, InputSticker, File, InputFile, Sticker
from telegram.constants import StickerFormat
from typing import Tuple, Optional, Union

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

bot = Bot(token=TELEGRAM_BOT_TOKEN)

BOT_USERNAME = None


async def fetch_username():
    global BOT_USERNAME
    if not BOT_USERNAME:
        bot_data = await bot.get_me()
        BOT_USERNAME = bot_data.username
    return BOT_USERNAME


async def create_sticker_pack(name: str, title: str, stickers: list[InputSticker]):
    async with bot:
        # TODO: change to sticker_pack.user_id
        return await bot.create_new_sticker_set(12911582, name, title, stickers)


async def delete_sticker_pack(name: str):
    async with bot:
        # Are sticker set names unique?
        return await bot.delete_sticker_set(name)


async def get_sticker_pack(name: str):
    async with bot:
        return await bot.get_sticker_set(name)


async def update_sticker_set_title(name: str, title: str):
    async with bot:
        return await bot.set_sticker_set_title(name, title)


async def upload_sticker_file(sticker_bytes) -> File:
    async with bot:
        return await bot.upload_sticker_file(
            12911582, InputFile(sticker_bytes), StickerFormat.STATIC
        )


async def add_sticker_to_set(name: str, sticker: InputSticker):
    async with bot:
        # TODO: change to sticker_pack.user_id
        return await bot.add_sticker_to_set(12911582, name, sticker)


async def remove_sticker_from_set(sticker: InputSticker):
    async with bot:
        return await bot.delete_sticker_from_set(sticker)


async def update_sticker_emoji(sticker, emoji_list):
    async with bot:
        return await bot.set_sticker_emoji_list(sticker, emoji_list)


async def sticker_by_file_unique_id(
    stickerset_name: str, file_unique_id: str, include_amount: bool = False
) -> Union[Optional["Sticker"], Optional[Tuple["Sticker", int]]]:
    """Get sticker from stickerset and return also the amount of stickers in the sticketset"""
    stickerset = await get_sticker_pack(stickerset_name)

    for sticker in stickerset.stickers:
        if sticker.file_unique_id == file_unique_id:
            if include_amount:
                return sticker, len(stickerset.stickers)
            else:
                return sticker

    if include_amount:
        return (None, None)
    return None
