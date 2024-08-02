/*
 *	WEBGL, just a machine to test webgl stuff
 */

TYPEINFO(/obj/machinery/webgl)
	mats = 10

/obj/machinery/webgl
	name = "webgl machine"
	icon = 'icons/obj/chemical.dmi'
	icon_state = "chemicompiler_st_off"

	New()
		..()

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if (!ui)
			ui = new(user, src, "WebGlMachine")
			ui.open()

	ui_static_data(mob/user)

	ui_data(mob/user)
		. = list()

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return


	attackby(mob/user)
		..()
		src.ui_interact(user)
