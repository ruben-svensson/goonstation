/obj/item/boardgame/testboard
	name="This is a test board"
	desc="This is a test board for testing purposes."

	board_height = 16
	board_width = 16

	New()
		..()

	movePiece(piece, x, y)
		..()
		// Randomize the pieces position instead of being normal
		piece["x"] = rand(0, board_width)
		piece["y"] = rand(0, board_height)
