/obj/item/device/game
	name = "game"
	desc = "This device is gam."
	icon = 'icons/obj/items/pda.dmi'
	icon_state = "pda"
	item_state = "pda"


	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Game")
			ui.open()

	ui_close(mob/user)
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 1))
			return UI_CLOSE

	attack_hand(mob/user)
		. = ..()
		src.ui_interact(user)
