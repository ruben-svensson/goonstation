/obj/item/drumplayer
	name = "drum player"
	desc = "A full drum kit, with a player."
	icon = 'icons/obj/instruments.dmi'
	icon_state = "bongos"

	var/is_playing = 0



	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "DrumPlayer")
			ui.open()

	ui_data(mob/user)


		. = list(
			"playing" = is_playing,
		)

		.["drums"] = list("bass", "snare", "hihat", "cymbal")

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return

	ui_close(mob/user)
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 1))
			return UI_CLOSE


	attack_self(mob/user as mob)
		..()
		ui_interact(user)
