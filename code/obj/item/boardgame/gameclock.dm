#define BLACK FALSE
#define WHITE TRUE

/obj/item/gameclock
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
