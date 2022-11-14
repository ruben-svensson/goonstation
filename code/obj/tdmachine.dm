/obj/machinery/tdmachine/
	name = "tD Machine"
	desc = "This device looks very difficult to use."
	density = 1
	anchored = 1
	icon = 'icons/obj/chemical.dmi'
	icon_state = "chemicompiler_st_off"


	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "tDMachine")
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
