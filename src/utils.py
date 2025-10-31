def is_emoji(character):
    # Get the Unicode code point of the character
    code_point = ord(character)
    # Check if the code point is in one of the expanded emoji ranges.
    # U+1F600–U+1F64F: Emoticons
    # U+1F300–U+1F5FF: Misc symbols and pictographs
    # U+1F680–U+1F6FF: Transport & map symbols
    # U+1F700–U+1F77F: Alchemical Symbols
    # U+1F780–U+1F7FF: Geometric Symbols Extended
    # U+1F800–U+1F8FF: Supplemental Arrows-C
    # U+1F900–U+1F9FF: Supplemental Symbols and Pictographs
    # U+1FA00–U+1FA6F: Chess Symbols, Symbols & Pictographs Extended-A
    # U+1FA70–U+1FAFF: Symbols and Pictographs Extended-A
    # U+1FB00–U+1FBFF: Symbols for Legacy Computing
    # U+2600–U+26FF: Misc symbols (for classic emoji like ☀)
    # U+2700–U+27BF: Dingbats
    # U+1F1E6–U+1F1FF: Regional Indicator Symbols (for flags)
    return (
        0x1F600 <= code_point <= 0x1F64F
        or 0x1F300 <= code_point <= 0x1F5FF
        or 0x1F680 <= code_point <= 0x1F6FF
        or 0x1F700 <= code_point <= 0x1F77F
        or 0x1F780 <= code_point <= 0x1F7FF
        or 0x1F800 <= code_point <= 0x1F8FF
        or 0x1F900 <= code_point <= 0x1F9FF
        or 0x1FA00 <= code_point <= 0x1FA6F
        or 0x1FA70 <= code_point <= 0x1FAFF
        or 0x1FB00 <= code_point <= 0x1FBFF
        or 0x2600 <= code_point <= 0x26FF
        or 0x2700 <= code_point <= 0x27BF
        or 0x1F1E6 <= code_point <= 0x1F1FF  # for regional indicator (flag) symbols
    )


def is_emoji_validator(character):
    if len(character) > 1 or not is_emoji(character):
        raise ValueError(f"{character} is not an emoji")
    return character
