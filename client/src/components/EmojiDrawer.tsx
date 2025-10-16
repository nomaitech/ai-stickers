import { EmojiPicker } from "frimousse"

const EmojiDrawer = () => {
    return (
        <EmojiPicker.Root>
            <EmojiPicker.Search />
            <EmojiPicker.Viewport>
                <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
                <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
                <EmojiPicker.List />
            </EmojiPicker.Viewport>
        </EmojiPicker.Root>
    )
}

export default EmojiDrawer;