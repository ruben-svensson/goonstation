/obj/item/boardgame
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	w_class = W_CLASS_NORMAL
	two_handed = TRUE
	stamina_damage = 30
	stamina_cost = 20

	var/game = "chess"
	var/pattern = "checkerboard"

	var/board_width = 8
	var/board_height = 8

	var/list/pieceSets = list("chess", "draughts", "go")

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
		"aspectRatio" = 1, // 1 to 1 ratio, use null for auto
		"useNotations" = TRUE, // Whether to use chess-like notation or not
		// Set fixed width and height to null to disable
		"tileWidth" = null,
		"tileHeight" = null,
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
			id = "[rand(1000, 99999)]"
		return id

	proc/createPiece(var/code, var/x, var/y)
		var/id = src.uniquePieceId()
		src.pieces[id] = list(
			"code" = code,
			"x" = x,
			"y" = y,
			"selected" = null, // Piece on the board selected
			"palette" = null, // Code of the palette
		)
		playsound(src.loc, src.sounds["move"], 30, 1)

	// Apply a palette to the user
	proc/setPalette(var/ckey, var/code)
		src.active_users[ckey]["palette"] = code

	proc/clearPalette(var/ckey)
		src.active_users[ckey]["palette"] = null

	proc/getActivePalette(var/ckey)
		return src.active_users[ckey]["palette"]

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
		if (!pId)
			return
		// Check if ["selected"] is null
		if (src.active_users[ckey]["selected"])
			pieces[pId]["selected"] = src.active_users[ckey]



	proc/deselectPawn(ckey)
		// Check if ckey exists
		if (ckey in src.active_users)
			// Check if the user has a selected piece
			if (src.active_users[ckey]["selected"])
				// Deselect the piece
				pieces[src.active_users[ckey]["selected"]]["selected"] = null
				src.active_users[ckey]["selected"] = null

	proc/getPawnAt(x, y)
		for (var/id in src.pieces)
			var/list/pawn = src.pieces[id]
			if (pawn["x"] == x && pawn["y"] == y)
				return pawn
		return null

	proc/placePalette(ckey, x, y)
		if (x < 0 || x >= src.board_width || y < 0 || y >= src.board_height)
			return

		var/palette = src.active_users[ckey]["palette"]
		if (palette)
			// Remove any piece at the location
			src.removePieceAt(x, y)

			src.createPiece(palette, x, y)
			src.clearPalette(ckey)

		return

	proc/placePawn(ckey, x, y)
		// Check if out of bounds
		if (x < 0 || x >= src.board_width || y < 0 || y >= src.board_height)
			return

		var/pawn = src.getPawnById(src.active_users[ckey]["selected"])
		if (!pawn)
			src.deselectPawn(ckey)
			return

		var/old_x = pawn["x"]
		var/old_y = pawn["y"]

		// Check if the pawn is moving to a new tile
		if (old_x == x && old_y == y)
			src.deselectPawn(ckey)
			return

		// Check if the pawn is moving to a tile that is already occupied

		var/occupied = src.getPawnAt(x, y)

		if (occupied)
			// Check if the pawn is moving to a tile that is occupied by an enemy
			if (pawn != occupied)
				playsound(src.loc, src.sounds["capture"], 30, 1)
				src.removePiece(occupied)
			else
				// If the piece is moving to a tile that is occupied by a friendly
				return

		playsound(src.loc, src.sounds["move"], 30, 1)

		// Move the pawn to the new tile
		pawn["x"] = x
		pawn["y"] = y

		// Deselect the pawn
		src.deselectPawn(ckey)

	proc/capturePawn(var/pawn)
		//src.drawBoardIcon()
		playsound(src.loc, src.sounds["capture"], 30, 1)
		src.removePiece(pawn["id"])


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
				if(src.active_users[ckey]["selected"])
					src.placePawn(ckey, x, y)
				else
					src.placePalette(ckey, x, y)
				. = TRUE
			/*if("applyFen")
				var/fen = params["fen"]
				src.applyFen(fen)
				. = TRUE*/
			if("applyGNot")
				var/gnot = params["gnot"]
				src.applyGNot(gnot)
				. = TRUE

			// Palette actions
			if("paletteSet")
				var/ckey = params["ckey"]
				var/code = params["code"]
				src.setPalette(ckey, code)
				. = TRUE

			if("paletteClear")
				var/ckey = params["ckey"]
				src.clearPalette(ckey)
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
			styling["useNotations"] = FALSE

	xiangqi
		name = "xiangqi board"
		desc = "It's a board for playing xiangqi!"

		pattern="xiangqi"
		icon_state = "xiangqiboard"
		board_width = 9
		board_height = 10

		New()
			..()
			styling["useNotations"] = FALSE

	New()
		..()

