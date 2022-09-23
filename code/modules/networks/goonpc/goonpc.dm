
/obj/machinery/goonpc
	name = "GoonPC"
	desc = "Next gen tech"
	icon = 'icons/obj/computer.dmi'
	icon_state = "old"
	density = 1
	anchored = 1

	var/programs = list(
		"testprogram" = /obj/machinery/goonpc/program/testprogram
	)

	New()
		..()

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "GoonPC")
			ui.open()

	ui_data(mob/user)
		. = list(
			"name" = src.name,
			"style" = list(
				"bgColor" = "" // Check GoonPC.tsx for more options
			)
		)

	ui_act(action, params)
		. = ..()
		if(.) return

		switch(action)
			if("program_launch")
				var/obj/machinery/goonpc/program/selectedProgram = new /obj/machinery/goonpc/program/testprogram()
				boutput(usr, "Launching program [selectedProgram.name]")
				selectedProgram.ui_interact(usr)


/obj/machinery/goonpc/program
	name = "Unknown Program"
	var/programName = null
	var/xpos = 0
	var/ypos = 0

	testprogram
		name = "Test Program"
		programName = "GpcTestProgram"

	New()
		..()

