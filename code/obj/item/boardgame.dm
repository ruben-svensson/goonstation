/obj/item/boardgame
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	w_class = W_CLASS_NORMAL
	layer = 2.9
	// The old game kit did this too, we should keep a piece of its dead corpse with us forever - DisturbHerb
	stamina_damage = 30
	stamina_cost = 20

	var/game = "chess"
	var/pattern = "checkerboard"

	var/board_width = 8
	var/board_height = 8

	var/icon/custom_board = null
	/// If true, the board will be drawn with a checkerboard pattern automatically
	/// If false, the board will be drawn with the icon provided
	var/draw_custom_icon = FALSE
	var/lock_pieces_to_tile = TRUE // If true, pieces will be locked to the center of the tile they're on, otherwise they'll be free to move around

	/// Apply custom styling, matches both in dm and tgui releated code
	var/styling = list(
		"tileColour1" = rgb(226,195,122),
		"tileColour2" = rgb(95,61,45),
	)
	// Store the users who are currently using the board
	// also track pawns they have selected and moving
	var/active_users = list()
	var/pieces = list()


	proc/applyGNot(gnot)
		// Like FEN but comma seperated
		// Apply a GNot string and parse each value as a piece and set its x and y
		// Example GNOT of a 3x3 board: P,P,P,3,p,p,p the true length is 9

		// Clear the board
		src.pieces = list()

		// Split the string into a list
		var/list/gnot_pieces = splittext(gnot, ",")
		var/piece_index = 1 // Used to keep track of the piece we're on, a number increases it by that value
		for (var/piece in gnot_pieces)
			// If the piece is a number, increase the index by that number
			if (isnum(text2num_safe(piece)))
				// Get value of piece, string to number
				piece_index += text2num_safe(piece)
				continue
			// If the piece is a letter or string
			if (piece)
				// Get the x and y of the piece
				var/x = ((piece_index - 1) % board_width)
				var/y = round((piece_index - 1) / board_width)
				// Add the piece to the list
				src.createPiece(piece, x, y)
				// Increase the index by 1
				piece_index += 1

		playsound(src.loc, 'sound/effects/sine_boop.ogg', 30, 1)



	/*proc/applyFen(fen)
		src.board = list()
		var/filtered_fen = replacetext(fen, "/", "")
		for (var/char in splittext(filtered_fen, ""))
			if (isnum(text2num_safe(char)))
				for (var/i in 1 to text2num_safe(char))
					src.board += ""
			else
				src.board += char

		src.drawBoardIcon()
	*/

	proc/uniquePieceId()
		// create a unique random id for a piece when adding it to the board
		var/id = ""
		while ((id == "") || (id in src.pieces))
			id = "[rand(1000, 9999)]"
		return id

	proc/createPiece(var/code, var/x, var/y)
		var/id = src.uniquePieceId()
		src.pieces[id] = list(
			"code" = code,
			"x" = x,
			"y" = y,
			"selected" = FALSE,
		)

	proc/getPawnById(var/id)
		return src.pieces[id]

	proc/removePiece(var/id)
		src.pieces -= id

	proc/removePieceAt(var/x, var/y)
		for (var/id in src.pieces)
			var/list/pawn = src.getPawnById(id)
			if (pawn["x"] == x && pawn["y"] == y)
				src.removePiece(id)
				return
		return

	proc/selectPawn(ckey, pId)
		src.active_users[ckey]["selected"] = pId
		pieces[pId]["selected"] = src.active_users[ckey]

	proc/deselectPawn(ckey)
		var/id = src.active_users[ckey]["selected"]
		// return if piece doesn't exist
		if (!id)
			return

		src.active_users[ckey]["selected"] = null
		pieces[id]["selected"] = FALSE

	proc/getPawnAt(x, y)
		for (var/id in src.pieces)
			var/list/pawn = src.pieces[id]
			if (pawn["x"] == round(x) && pawn["y"] == round(y))
				return pawn
		return null

	proc/placePawn(ckey, x, y)
		if (!src.active_users[ckey]["selected"])
			return
		var/pawn = getPawnById(src.active_users[ckey]["selected"])
		//Check if pawn hasn't moved
		if (pawn["x"] == round(x) && pawn["y"] == round(y))
			return


		// Place pawn, capture pawn if there is one
		src.deselectPawn(ckey)

		if(src.getPawnAt(x, y))
			src.removePieceAt(x, y)
			playsound(src.loc, 'sound/effects/capture.ogg', 30, 1)
		else
			playsound(src.loc, 'sound/impact_sounds/Wood_Tap.ogg', 30, 1)

		pawn["x"] = x
		pawn["y"] = y

		//src.drawBoardIcon()


	proc/capturePawn(var/pawn)
		//src.drawBoardIcon()
		playsound(src.loc, 'sound/effects/capture.ogg', 30, 1)
		src.removePiece(pawn["id"])

	/*
	proc/drawBoardIcon()
		if(!draw_custom_icon) return

		var/board_padding = 4
		var/width = (board_width * 3) + board_padding
		var/height = (board_height * 3) + board_padding

		src.bound_width = width
		src.bound_height = height

		src.custom_board = icon(src.icon, icon_state = "base")
		src.custom_board.Crop(1, 1, width, height)

		var/color1rgb = styling["tileColour1"]
		var/color2rgb = styling["tileColour2"]

		// Draw the background for the board
		var/list/RGB = rgb2num(color1rgb)
		var/darker = 0.9
		var/darkercolor1 = rgb(RGB[1] * darker, RGB[2] * darker, RGB[3] * darker)

		src.custom_board.DrawBox(darkercolor1, 0, 0, width, height)

		//reverse for (var/y in 1 to board_height)

		for (var/x in 1 to board_width)
			for (var/y in 1 to board_height)
				var/index = (y - 1) * board_width + x
				var/letter = src.board[index]

				// DrawBox uses x1, y1, x2, y2, each tile should be 2x2

				var/tile_size = 3

				var/tile_x1 = (x) * tile_size
				var/tile_y1 = (board_height - y + 1) * tile_size
				var/tile_x2 = tile_x1 + tile_size
				var/tile_y2 = tile_y1 + tile_size

				var/tile_color = color1rgb
				if ((x + y) % 2 == 0)
					tile_color = color2rgb
				src.custom_board.DrawBox(tile_color, tile_x1, tile_y1, tile_x2-1, tile_y2-1)

				var/pawn_height = 1
				if(letter == "p" || letter == "P")
					pawn_height = 0
				if(letter == "k" || letter == "K")
					pawn_height = 2

				if (letter != "")
					if (letter == uppertext(letter))
						src.custom_board.DrawBox(rgb(255, 255, 255), tile_x1 + 1, tile_y1 + 1, tile_x1 + 1, tile_y1 + 1 + pawn_height)
					else
						src.custom_board.DrawBox(rgb(0, 0, 0), tile_x1 + 1, tile_y1 + 1, tile_x1 + 1, tile_y1 + 1 + pawn_height)


			src.icon = custom_board
	*/

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Boardgame")
			ui.open()

			if(!src.active_users[user.ckey])
				src.active_users[user.ckey] = list(
					"ckey" = user.ckey,
					"name" = user.name,
					"selected" = null
				)

	ui_static_data(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = src.name,
			"game" = src.game,
			"pattern" = src.pattern,
			"width" = src.board_width,
			"height" = src.board_height,
			"lock" = src.lock_pieces_to_tile
		)


	ui_data(mob/user)
		. = list()
		.["pieces"] = src.pieces
		.["styling"] = src.styling
		.["users"] = src.active_users
		.["currentUser"] = src.active_users[user.ckey]

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(. || !IN_RANGE(src, ui.user, 1))
			return
		switch(action)
			if("pawnCreate")
				var/fenCode = params["fenCode"]
				var/x = text2num(params["x"])
				var/y = text2num(params["y"])
				src.createPiece(fenCode, x, y)
				. = TRUE
			if("pawnRemove")
				var/id = params["id"]
				src.removePiece(id)
				. = TRUE
			if("pawnSelect")
				var/ckey = params["ckey"]
				var/pId = params["pId"]
				src.selectPawn(ckey, pId)
				//src.removePiece
				. = TRUE
			if("pawnDeselect")
				var/ckey = params["ckey"]
				src.deselectPawn(ckey)
				. = TRUE
			if("pawnPlace")
				// Place the pawn on the board currently selected
				var/ckey = params["ckey"]
				var/x = text2num(params["x"])
				var/y = text2num(params["y"])
				src.placePawn(ckey, x, y)
				. = TRUE
			/*if("applyFen")
				var/fen = params["fen"]
				src.applyFen(fen)
				. = TRUE*/
			if("applyGNot")
				var/gnot = params["gnot"]
				src.applyGNot(gnot)
				. = TRUE

	ui_close(mob/user)
		src.active_users -= user
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 10))
			return UI_CLOSE

	examine(mob/user)
		. = ..()
		if(IN_RANGE(src, user, 10))
			src.ui_interact(user)

	mouse_drop(var/mob/user)
		if((istype(user,/mob/living/carbon/human))&&(!user.stat)&&!(src in user.contents))
			user.put_in_hand_or_drop(src)
		return ..()

	attack_hand(var/mob/user) // open browser window when board is clicked
		src.ui_interact(user)

	attackby(var/obj/item/I, mob/user)

	examine(mob/user)
		. = ..()
		ui_interact(user)

	chess
		name = "chess board"
		desc = "It's a board for playing chess and checkers!"

		New()
			..()

	New()
		..()
		//src.generateEmptyBoard()
		//src.drawBoardIcon()

/obj/item/boardgame_clock
	name = "board game clock"
	desc = "A set of clocks used to track time for two player board games. Fancy!"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessclock"
	var/timing = FALSE
	var/turn = TRUE // TRUE for white, FALSE for black
	var/whiteTime = 0
	var/blackTime = 0
	var/lastTick = 0
	var/const/maxTime = 1800 SECONDS
	var/const/minTime = 0

	proc/setTime(var/newWhiteTime as num, var/newBlackTime as num)
		src.whiteTime = clamp(newWhiteTime, src.minTime, src.maxTime)
		src.blackTime = clamp(newBlackTime, src.minTime, src.maxTime)

	proc/tickDown(var/timeValue as num)
		var/passedTime = TIME - src.lastTick
		if (timeValue > 0)
			timeValue -= passedTime
		else
			timeValue = 0
			src.timing = FALSE
			src.lastTick = 0
		return timeValue

	proc/returnMaxOfTimeOrZero()
		if (turn) // returns true if it's white's turn, false if it's black's turn
			src.whiteTime = max(src.whiteTime, 0)
		else
			src.blackTime = max(src.blackTime, 0)

	// examine()
	// 	. = list("A set of clocks used to track time for two player board games. Fancy!")
	// 	if(src.timing)
	// 		var/whiteSecond = src.whiteTime % 60
	// 		var/whiteMinute = (src.whiteTime - whiteSecond) / 60
	// 		var/blackSecond = src.blackTime % 60
	// 		var/blackMinute = (src.blackTime - blackSecond) / 60
	// 		// anyone know a good way of doing conditionals in DM?
	// 		. += "White's remaining time is <b>[(whiteMinute ? text("[whiteMinute]:") : null)][whiteSecond] [whiteMinute ? null : text("seconds")]</b> and Black's remaining time is <b>[(blackMinute ? text("[blackMinute]:") : null)][blackSecond] [blackMinute ? null : text("seconds")]</b>"
	// 	else
	// 		. += "The clocks are currently paused."

	process()
		if (src.timing)
			if (!src.lastTick)
				src.lastTick = TIME
			if (src.turn) // returns true if it's white's turn, false if it's black's turn
				src.whiteTime = tickDown(src.whiteTime)
			else
				src.blackTime = tickDown(src.blackTime)
			src.lastTick = TIME
		else
			processing_items.Remove(src)
			src.lastTick = 0
		returnMaxOfTimeOrZero()

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Gameclock")
			ui.open()

	ui_data(mob/user)
		src.process()
		. = list(
			"timing" = src.timing,
			"turn" = src.turn,
			"whiteTime" = round(src.whiteTime / 10),
			"blackTime" = round(src.blackTime / 10),
		)

	ui_act(action, params)
		switch(action)
			if ("set_turn")
				src.turn = text2num_safe(params["nextTurn"])
				. = TRUE
			if ("set_time")
				var/whiteTime = text2num_safe(params["whiteTime"])
				var/blackTime = text2num_safe(params["blackTime"])
				src.setTime(round(whiteTime), round(blackTime))
				. = TRUE
			if ("toggle_timing")
				src.timing = !src.timing
				if(src.timing)
					processing_items |= src
				. = TRUE
			if ("end_turn")
				src.turn = !src.turn
				. = TRUE

	mouse_drop(var/mob/user)
		if((istype(user,/mob/living/carbon/human))&&(!user.stat)&&!(src in user.contents))
			user.put_in_hand_or_drop(src)
		return ..()

	attack_hand(var/mob/user)
		src.ui_interact(user)

	attack_self(var/mob/user)
		src.ui_interact(user)
