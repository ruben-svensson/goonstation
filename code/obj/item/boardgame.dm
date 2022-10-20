/obj/item/gameboard
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	layer = 2.9

	var/game = "chess"

	var/board_width = 8
	var/board_height = 8

	var/tgui_styling = list(
		"tileColour1" = "#b58863",
		"tileColour2" = "#f0d9b5",
	)

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Boardgame")
			ui.open()

	ui_static_data(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = src.name,
			"game" = src.game,
			"width" = src.board_width,
			"height" = src.board_height,
		)

		.["styling"] = src.tgui_styling



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

	attack_hand(var/mob/user) // open browser window when board is clicked
		src.ui_interact(user)

	chess
		name = "chess board"
		desc = "It's a board for playing chess!"
		icon_state = "chessboard"

	chesshor
		name = "chess board horizontal"
		desc = "It's a board for playing chess, but more horizontally!"
		icon_state = "chessboard"
		board_height = 6
		board_width = 12

		New()
			tgui_styling = list(
				"tileColour1" = "#20bb2d",
				"tileColour2" = "#5c065f",
			)
			..()


	evilchess
		name = "evil chess board"
		desc = "It's a board for playing chess, but more evil!"
		board_width = 16
		board_height = 16

		New()
			tgui_styling = list(
				"tileColour1" = "#880a0a",
				"tileColour2" = "#6d44ff",
			)
			..()



	New()
		..()
