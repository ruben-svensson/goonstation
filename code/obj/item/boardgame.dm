/obj/item/gameboard
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	layer = 2.9

	var/game = "chess"

	var/board_width = 8
	var/board_height = 8

	var/list/tgui_styling = list(
		"tileColour1" = "#b58863",
		"tileColour2" = "#f0d9b5",
	)

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "ChessBoard")
			ui.open()

	ui_data_static(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = name,
			"game" = game,
			"width" = board_width,
			"height" = board_height,
		)

	ui_data(mob/user)
		. = list()

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return

	ui_close(mob/user)
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 10))
			return UI_CLOSE


	chess
		name = "chess board"
		desc = "It's a board for playing chess!"
		icon_state = "chessboard"

	evilchess
		name = "evil chess board"
		desc = "It's a board for playing chess, but more evil!"
		board_width = 16
		board_height = 16
		tgui_styling["tileColour1"] = "#740000"
		tgui_styling["tileColour2"] = "#754301"

	New()
		..()
