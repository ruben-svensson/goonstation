#define BLACK FALSE
#define WHITE TRUE

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
	var/list/styling = list(
		"tileColour1" = rgb(240, 217, 181),
		"tileColour2" = rgb(181, 136, 99),
		"border" = rgb(131, 100, 74),
	)

	var/list/sounds = list(
		"move" = 'sound/impact_sounds/Wood_Tap.ogg',
		"capture" = 'sound/effects/capture.ogg',
		"newgame" = 'sound/effects/sine_boop.ogg',
	)

	// Store the users who are currently using the board
	// also track pawns they have selected and moving
	var/list/active_users = list()
	var/list/pieces = list()


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

		playsound(src.loc, src.sounds["newgame"], 30, 1)

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
			"selected" = null, // Piece on the board selected
			"palette" = null, // Piece from the palette selected
		)
		playsound(src.loc, src.sounds["move"], 30, 1)

	proc/getPawnById(var/id)
		return src.pieces[id]

	proc/removePiece(var/piece)
		src.pieces -= piece

	proc/removePieceById(var/id)
		src.removePiece(src.getPawnById(id))

	proc/removePieceAt(var/x, var/y)
		for (var/piece in src.pieces)
			if (src.pieces[piece]["x"] == x && src.pieces[piece]["y"] == y)
				src.removePiece(piece)

	proc/selectPawn(ckey, pId)
		src.active_users[ckey]["selected"] = pId
		pieces[pId]["selected"] = src.active_users[ckey]

	proc/deselectPawn(ckey)
		if (src.active_users[ckey]["selected"])
			pieces[src.active_users[ckey]["selected"]]["selected"] = FALSE
			src.active_users[ckey]["selected"] = null

	proc/getPawnAt(x, y)
		for (var/id in src.pieces)
			var/list/pawn = src.pieces[id]
			if (pawn["x"] == round(x) && pawn["y"] == round(y))
				return pawn
		return null

	proc/placePawn(ckey, x, y)

		var/pawn = src.getPawnById(src.active_users[ckey]["selected"])
		if (!pawn)
			src.deselectPawn(ckey)
			return

		var/old_x = pawn["x"]
		var/old_y = pawn["y"]

		// Check if the pawn is moving to a new tile
		if (old_x == round(x) && old_y == round(y))
			src.deselectPawn(ckey)
			return

		// Check if the pawn is moving to a tile that is already occupied

		var/occupied = src.getPawnAt(round(x), round(y))

		if (occupied)
			// Check if the pawn is moving to a tile that is occupied by an enemy
			if (pawn != occupied)
				playsound(src.loc, src.sounds["capture"], 30, 1)
				src.removePieceAt(round(x), round(y))
			else
				// If the piece is moving to a tile that is occupied by a friendly
				return

		playsound(src.loc, src.sounds["move"], 30, 1)

		// Move the pawn to the new tile
		pawn["x"] = round(x)
		pawn["y"] = round(y)

		// Deselect the pawn
		src.deselectPawn(ckey)

	proc/capturePawn(var/pawn)
		//src.drawBoardIcon()
		playsound(src.loc, src.sounds["capture"], 30, 1)
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
			if("pawnRemoveHeld")
				var/ckey = params["ckey"]
				var/id = src.active_users[ckey]["selected"]
				src.deselectPawn(ckey)
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

	go
		name = "go board"
		desc = "It's a board for playing go!"

		pattern="go"
		icon_state = "goboard"
		board_width = 19
		board_height = 19


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
	var/turn = WHITE
	var/swap = FALSE // for swapping the layout of the clocks
	var/whiteTime = 5 MINUTES
	var/blackTime = 5 MINUTES
	var/lastTick = 0
	var/const/maxTime = 1 HOUR
	var/const/minTime = 0

	proc/buttonState()
		if ((src.turn + src.swap) % 2 == 0) // It is Right Player's turn if the turn and swap values sum to an even integer
			icon_state = "chessclock_R"
		else
			icon_state = "chessclock_L"

	proc/formatTimeText(var/timeValue as num) // FIX THIS SHIT
		var/seconds = round((timeValue / 10) % 60)
		var/minutes = round(((timeValue / 10) - seconds) / 60)
		if (minutes < 10)
			minutes = "0[minutes]"
		if (seconds < 10)
			seconds = "0[seconds]"
		return "[minutes]:[seconds]"

	proc/returnMaxOfTimeOrZero()
		if (src.turn)
			src.whiteTime = max(src.whiteTime, 0)
		else
			src.blackTime = max(src.blackTime, 0)

	proc/setTime(var/newWhiteTime as num, var/newBlackTime as num)
		src.whiteTime = clamp(newWhiteTime, src.minTime, src.maxTime)
		src.blackTime = clamp(newBlackTime, src.minTime, src.maxTime)

	proc/tickDown(var/timeValue as num) // Decrements the given timeValue by the time passed since the proc was last called
		var/passedTime = TIME - src.lastTick
		if (timeValue > 0)
			timeValue -= passedTime
		else
			timeValue = 0
			src.timing = FALSE
			src.lastTick = 0
			src.timeFlag()
		return timeValue

	proc/timeFlag()
		var/winner = src.turn ? "Black" : "White"
		var/loser = !src.turn ? "Black" : "White"
		var/map_text = make_chat_maptext(src, "[winner] wins on time.", "color: #A8E9F0;", alpha = 150)
		for (var/mob/O in hearers(src))
			O.show_message(assoc_maptext = map_text)
		src.visible_message("[src] stops. [loser] has flagged and [winner] wins on time.")
		src.icon_state = "[src.icon_state]_stopped"
		playsound(src.loc, 'sound/effects/bell_high_pitch.ogg', 30)

	examine()
		. = ..()
		if (src.timing)
			. += "White's remaining time is <b>[formatTimeText(src.whiteTime)]</b> and Black's remaining time is <b>[formatTimeText(src.blackTime)]</b>."
		else
			. += "The clocks are currently paused."

	process()
		if (src.timing)
			if (!src.lastTick)
				src.lastTick = TIME
			if (src.turn)
				src.whiteTime = tickDown(src.whiteTime)
			else
				src.blackTime = tickDown(src.blackTime)
			src.lastTick = TIME
		else
			processing_items.Remove(src)
			src.lastTick = 0
		src.returnMaxOfTimeOrZero()

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Gameclock")
			ui.open()

	ui_static_data(mob/user)
		. = list()
		.["clockStatic"] = list(
			"maxTime" = round(src.maxTime / 10),
			"minTime" = round(src.minTime / 10),
		)

	ui_data(mob/user)
		src.process()
		. = list(
			"timing" = src.timing,
			"turn" = src.turn,
			"swap" = src.swap,
			"whiteTime" = round(src.whiteTime / 10),
			"blackTime" = round(src.blackTime / 10),
		)

	ui_act(action, params)
		switch(action)
			if ("set_turn")
				src.add_fingerprint(usr)
				src.turn = text2num_safe(params["nextTurn"])
				. = TRUE
			if ("set_time")
				src.add_fingerprint(usr)
				var/whiteTime = text2num_safe(params["whiteTime"])
				var/blackTime = text2num_safe(params["blackTime"])
				src.setTime(round(whiteTime), round(blackTime))
				. = TRUE
			if ("swap")
				src.add_fingerprint(usr)
				src.swap = !src.swap
				. = TRUE
			if ("toggle_timing")
				src.add_fingerprint(usr)
				if (src.whiteTime == 0 || src.blackTime == 0)
					. = TRUE
					return
				src.timing = !src.timing
				if(src.timing)
					processing_items |= src
					src.buttonState()
				else
					icon_state = "chessclock"
				. = TRUE
			if ("end_turn")
				src.add_fingerprint(usr)
				src.lastTick = null
				src.turn = !src.turn
				playsound(src.loc, 'sound/impact_sounds/Clock_slap.ogg', 30)
				src.buttonState()
				. = TRUE

	mouse_drop(var/mob/user)
		if((istype(user,/mob/living/carbon/human))&&(!user.stat)&&!(src in user.contents))
			user.put_in_hand_or_drop(src)
		return ..()

	attack_hand(var/mob/user)
		src.ui_interact(user)

	attack_self(var/mob/user)
		src.ui_interact(user)
