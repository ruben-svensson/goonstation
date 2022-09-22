
/obj/machinery/goonpc
  name = "Computer"
	desc = "Next gen tech"
	icon = 'icons/obj/computer.dmi'
	icon_state = "computer_generic"
	density = 1
	anchored = 1

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "GoonPC")
			ui.open()
