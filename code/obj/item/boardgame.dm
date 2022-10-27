/obj/item/boardgame
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	layer = 2.9

	var/game = "chess"
	var/pattern = "checkerboard"

	var/board_width = 8
	var/board_height = 8

	var/draw_custom_icon = true

	var/board = list() // single dimensional board
	var/tgui_styling = list(
		"tileColour1" = "#f0d9b5",
		"tileColour2" = "#b58863",
	)

	var/starting_positions = list()

	// Store the users who are currently using the board
	// also track pawns they have selected and moving
	var/active_users = list()

	proc/generateEmptyBoard()
		src.board = list()
		// Generate empty board
		for (var/i in 1 to board_height * board_width)
			src.board += ""

	proc/setupEmptyStartingPosition()
		// Automatically generate preset for an empty board
		// Example of a 8x8 board
		// Fen: 8/8/8/8/8/8/8/8
		var/fen = ""
		for(var/y in 1 to src.board_height)
			fen += "[src.board_width]/"
		fen = copytext(fen, 1, length(fen)) // Remove the last slash

		src.starting_positions["Empty"] = fen


	proc/applyFen(fen)
		// Example code: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
		// Remove all the slashes, replace numbers with x number of empty spaces
		src.board = list()
		var/filtered_fen = replacetext(fen, "/", "")
		for (var/char in splittext(filtered_fen, ""))
			if (isnum(text2num_safe(char)))
				for (var/i in 1 to text2num_safe(char))
					src.board += ""
			else
				src.board += char

	proc/createPiece(var/fenCode, var/x, var/y)
		// Convert 2d coordinates to 1d, array starts at 1
		var/index = (y - 1) * board_width + x
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = fenCode

	proc/movePiece(var/x1, var/y1, var/x2, var/y2)
		var/index1 = (y1 - 1) * board_width + x
		var/index2 = (y2 - 1) * board_width + x2
		// return if index is out of bounds
		if (index1 < 1 || index1 > board_height * board_width)
			return
		if (index2 < 1 || index2 > board_height * board_width)
			return
		src.board[index2] = src.board[index1]
		src.board[index1] = ""

	proc/removePiece(var/x, var/y)
		var/index = (y - 1) * board_width + x
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = ""

	proc/selectPawn(ckey, pCode, pTeam, pGame)
		src.active_users[ckey]["selected"] = list(
			"code" = pCode,
			"team" = pTeam,
			"game" = pGame
		)

	proc/deselectPawn(ckey)
		src.active_users[ckey]["selected"] = null

	proc/placePawn(ckey, x, y)
		if (!src.active_users[ckey]["selected"])
			return
		var/pawn = src.active_users[ckey]["selected"]
		src.createPiece(pawn["code"], x, y)
		playsound(src.loc, 'sound/impact_sounds/Wood_Hit_Small_1.ogg', 50, 1)


	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Boardgame")
			ui.open()

			if(!src.active_users[user.ckey])
				src.active_users[user.ckey] = list(
					"ckey" = user.ckey,
					"name" = user.name,
					"mouseX" = 0,
					"mouseY" = 0,
					"selected" = null
				)

	ui_static_data(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = src.name,
			"game" = src.game,
			"pattern" = src.pattern,
			"startingPositions" = src.starting_positions,
			"width" = src.board_width,
			"height" = src.board_height,
		)


	ui_data(mob/user)
		. = list()
		.["board"] = src.board
		.["styling"] = src.tgui_styling
		.["users"] = src.active_users
		.["currentUser"] = user.ckey

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return
		switch(action)
			if("pawnMove")
				var/x1 = text2num(params["x1"]) + 1 //Convert to dm array
				var/y1 = text2num(params["y1"]) + 1 //Convert to dm array
				var/x2 = text2num(params["x2"]) + 1 //Convert to dm array
				var/y2 = text2num(params["y2"]) + 1 //Convert to dm array
				src.movePiece(x1, y1, x2, y2)
				. = TRUE
			if("pawnCreate")
				var/fenCode = params["fenCode"]
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.createPiece(fenCode, x, y)
				. = TRUE
			if("pawnRemove")
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.removePiece(x, y)
				. = TRUE
			if("pawnSelect")
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				var/ckey = params["ckey"]
				var/pCode = params["pCode"]
				var/pTeam = params["pTeam"]
				var/pGame = params["pGame"]
				src.selectPawn(ckey, pCode, pTeam, pGame, x, y)
				. = TRUE
			if("pawnDeselect")
				var/ckey = params["ckey"]
				src.deselectPawn(ckey)
				. = TRUE
			if("pawnPlace")
				// Place the pawn on the board currently selected
				var/ckey = params["ckey"]
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.placePawn(ckey, x, y)
				. = TRUE
			if("mouseMove")
				var/x = text2num(params["x"])
				var/y = text2num(params["y"])
				var/ckey = params["ckey"]
				src.active_users[ckey]["mouseX"] = x
				src.active_users[ckey]["mouseY"] = y
				. = TRUE
			if("applyFen")
				var/fen = params["fen"]
				src.applyFen(fen)
				. = TRUE

	ui_close(mob/user)
		src.active_users -= user
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 10))
			return UI_CLOSE

	attack_hand(var/mob/user) // open browser window when board is clicked
		src.ui_interact(user)

	attackby(var/obj/item/I, mob/user)


	chess
		name = "chess board"
		desc = "It's a board for playing chess!"
		icon_state = "chessboard"

		New()
			..()
			src.setupEmptyStartingPosition()
			src.starting_positions["Starting Position"] = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"


	chesshor
		name = "chess board horizontal"
		desc = "It's a board for playing chess, but more horizontally!"
		board_height = 6
		board_width = 12

		New()
			..()
			tgui_styling = list(
				"tileColour1" = "#20bb2d",
				"tileColour2" = "#5c065f",
			)


	evilchess
		name = "evil chess board"
		desc = "It's a board for playing chess, but more evil!"
		board_width = 16
		board_height = 16

		New()
			..()
			tgui_styling = list(
				"tileColour1" = "#880a0a",
				"tileColour2" = "#6d44ff",
			)


	New()
		..()
		src.generateEmptyBoard()

		if(src.draw_custom_icon)
			var/icon/custom_icon = icon(src.icon, icon_state = "base")
			// Draw checkered pattern
			// using custom_icon.DrawBox(rgb(r,g,b), x, y, w, y)
			// make each square 2 pixels wide and height
			for (var/x in 1 to src.board_width)
				for (var/y in 1 to src.board_height)
					var/color1rgb = hex2num(src.tgui_styling["tileColour1"])
					var/color2rgb = hex2num(src.tgui_styling["tileColour2"])

					var/r = (x + y) % 2 ? color1rgb >> 16 & 0xFF : color2rgb >> 16 & 0xFF
					var/g = (x + y) % 2 ? color1rgb >> 8 & 0xFF : color2rgb >> 8 & 0xFF
					var/b = (x + y) % 2 ? color1rgb & 0xFF : color2rgb & 0xFF
					custom_icon.DrawBox(rgb(r,g,b), x * 2, y * 2, 2, 2)

			src.icon = custom_icon

/obj/item/boardgame_clock
	name = "board game clock"
	desc = "A set of clocks used to track time for two player board games. Fancy!"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessclock"

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Gameclock")
			ui.open()

	ui_data(mob/user)
		. = list(
		)

	ui_act(action, params)

	mouse_drop(var/mob/user)
		if((istype(user,/mob/living/carbon/human))&&(!user.stat)&&!(src in user.contents))
			user.put_in_hand_or_drop(src)
		return ..()

	attack_hand(var/mob/user)
		src.ui_interact(user)

	attack_self(var/mob/user)
		src.ui_interact(user)
