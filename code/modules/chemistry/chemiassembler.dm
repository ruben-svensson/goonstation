/*

If it's a num it's a value
If it's a string it's a variable
sx is source register, valid sources are 1-10 for the reservoirs
tx is target register, valid targets are for reservoirs 1-10, and 11 for pill, 12 for vial, 13 for syringe
ax is amount register (16-bit)

var, mov, add, sub,

Instructions:
var val/reg/var name
Moves val/reg/var name

add val/reg/var reg/var
Adds val/reg/var to reg/var

sub val/reg/var reg/var
Subtracts val/reg/var from reg/var

mov val/reg/var reg/var
Moves reg/var to reg/var

lbl name
Creates a label

jmp name
Jumps to label

cal @
Transfer ax units of reagent from reservoir sx to resevoir tx.

cal $
Heat or cool tx to ax
It takes as long as the chemistry lab heater would take.


*/

#define IS_VALUE 1
#define IS_VARIABLE 2
#define IS_REGISTER 3

/obj/machinery/chemiassembler
	name = "Chemical Assembler"
	desc = "Uses assembly to create chemicals."
	density = 1
	anchored = 1
	icon = 'icons/obj/chemical.dmi'
	icon_state = "chemicompiler_st_off"
	mats = 15
	flags = NOSPLASH
	processing_tier = PROCESSING_FULL
	deconstruct_flags = DECON_SCREWDRIVER | DECON_WRENCH | DECON_CROWBAR | DECON_WELDER | DECON_MULTITOOL


	/**
	 * The raw program data for the machine.
	 * convert the string variables and program instructions.
	 *
	 */
	var/raw_program = ""

	var/list/reservoirs = list(
		null,null,null,null,null,null,null,null,null,null,
	)

	var/list/registers = list(
		"sx" = 0, // Source register
		"tx" = 0, // Target register
		"ax" = 0, // Amount register
	)
	var/list/variables = list()

	var/list/program = list() // Each entry is an instruction
	var/pointer = 1 // The current instruction

	var/holder = null // The current reagent holder

	var/running = FALSE
	var/processing = FALSE

	var/list/console_output = list()

	var/list/active_users = list()


	proc/build()
		var/list/pre_program = splittext(raw_program, "\n")
		for(var/line in pre_program)
			// Remove spaces at the start and end of the line
			var/clean_line = trim(line)
			// Remove comments, example: "mov 1 2 ; This is a comment"
			var/comment_start = findtext(clean_line, ";")
			if(comment_start)
				clean_line = copytext(clean_line, 1, comment_start)
			// Remove spaces at the start and end of the line again
			clean_line = trim(clean_line)
			// If the line is empty, skip it
			if(!clean_line)
				continue

			var/list/line_split = splittext(clean_line, " ")
			// if the line is a variable, prebuild it
			program.Add(list(line_split))


	process()
		if(!program.len || !running)
			return

		if(pointer == 1 && running)
			playsound(src, "sound/machines/shieldgen_startup.ogg", 50, 1)

		if(pointer > program.len)
			running = FALSE
			boutput(world, "Program finished.")
			playsound(src, "sound/machines/shieldgen_shutoff.ogg", 50, 1)
			return

		if(src.running)
			src.execStep()

	proc/execStep()
		src.processing = TRUE
		playsound(src, "sound/machines/law_insert.ogg", 50, 1)
		var/message = src.processProgram()
		src.console_output += message
		playsound(src, "sound/machines/law_remove.ogg", 50, 1)
		src.processing = FALSE
		src.pointer++
		for (var/mob/user in src.active_users)
			src.ui_interact(user)


	proc/arithmaticHelper(instruction, state1, state2)



	proc/processProgram()
		var/list/instruction = program[pointer]
		switch(instruction[1])
			if("var")
				// Moves val/reg/var name
				var/state = src.parseValue(instruction[2])
				switch(state[2])
					if(IS_VALUE)
						variables[instruction[3]] = state[1]
					if(IS_VARIABLE)
						variables[instruction[3]] = variables[state[1]]
					if(IS_REGISTER)
						variables[instruction[3]] = registers[state[1]]

			if("mov")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] = state1[1]
							if(IS_REGISTER)
								registers[state2[1]] = state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] = variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] = variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] = registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] = registers[state1[1]]

			if("add")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] += state1[1]
							if(IS_REGISTER)
								registers[state2[1]] += state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] += variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] += variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] += registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] += registers[state1[1]]

			if("sub")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] -= state1[1]
							if(IS_REGISTER)
								registers[state2[1]] -= state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] -= variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] -= variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] -= registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] -= registers[state1[1]]
			if("mul")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] *= state1[1]
							if(IS_REGISTER)
								registers[state2[1]] *= state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] *= variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] *= variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] *= registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] *= registers[state1[1]]
			if("div")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] /= state1[1]
							if(IS_REGISTER)
								registers[state2[1]] /= state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] /= variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] /= variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] /= registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] /= registers[state1[1]]
			if("mod")
				var state1 = src.parseValue(instruction[2])
				var state2 = src.parseValue(instruction[3])

				switch(state1[2])
					if(IS_VALUE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] %= state1[1]
							if(IS_REGISTER)
								registers[state2[1]] %= state1[1]
					if(IS_VARIABLE)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] %= variables[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] %= variables[state1[1]]
					if(IS_REGISTER)
						switch(state2[2])
							if(IS_VARIABLE)
								variables[state2[1]] %= registers[state1[1]]
							if(IS_REGISTER)
								registers[state2[1]] %= registers[state1[1]]


			if("jmp")
				// Jumps to label
				var/label = instruction[2]
				for(var/i = 1 to program.len)
					if(program[i][1] == "lbl" && program[i][2] == label)
						pointer = i
						break
			if("print")
				// Prints a value
				// Example: print "The value of sx is [sx]"
				// Replace "[x]"" with the value of the variable or register x
				// Add output to out

				// Join the rest of the instruction into a string, excluding the first two words
				var/str = instruction[2]
				for(var/i = 3 to instruction.len)
					str += " " + instruction[i]
				var/out = ""


				var/found = FALSE
				var/start = 1
				var/end = 1
				for(var/i = 1 to length(str))
					var/char = str[i]
					if(char == "\[")
						found = TRUE
						start = i
					if(char == "\]" && found)
						end = i
						found = FALSE
						var/val = src.parseValue(copytext(str, start + 1, end))
						switch(val[2])
							if(IS_VALUE)
								out += "[val[1]]"
							if(IS_VARIABLE)
								out += "[variables[val[1]]]"
							if(IS_REGISTER)
								out += "[registers[val[1]]]"
					if(!found && char != "\]")
						// Remove last character from char
						out += char

				// Clean str from quotes
				out = replacetext(out, "\"", "")

				return out



	proc/isRegister(regi)
		return regi in src.registers

	proc/isVariable(vari)
		return vari in src.variables

	proc/parseValue(value)
		var/list/state = list(
			1 = 0, // Value
			2 = 0 // Type
		)
		if(isnum(text2num_safe(value)))
			state[1] = text2num_safe(value)
			state[2] = IS_VALUE
		if(value in src.variables)
			state[1] = value
			state[2] = IS_VARIABLE
		if(value in src.registers)
			state[1] = value
			state[2] = IS_REGISTER
		return state

	proc/resetProgram()
		src.program = list()
		src.pointer = 1
		src.registers = list(
			"sx" = 0, // Source register
			"tx" = 0, // Target register
			"ax" = 0, // Amount register
		)
		src.variables = list()
		src.console_output = list()

	proc/compile(program)
		src.resetProgram()
		src.raw_program = program
		src.build()

	proc/ejectReservoir(mob/user, index)
		if(!src.reservoirs[index])
			return

		if(istype(src.reservoirs[index], /obj/item/reagent_containers/glass))
			// Check if user is holding something
			if(!usr.equipped())
				var/obj/item/reagent_containers/glass/reservoir = src.reservoirs[index][1]
				usr.put_in_hand_or_drop(reservoir)
				src.reservoirs[index] = null


	proc/insertReservoir(mob/user, index)
		// Check if there is a reservoir in the user's hand
		var/obj/item/I = usr.equipped()
		if(istype(I, /obj/item/reagent_containers/glass))
			var/obj/item/reagent_containers/glass/reservoir = I
			// Create a list of reagents
			var/list/reagents = list()
			for(var/datum/reagent/R in reservoir.reagents.reagent_list)
				reagents += list(
					"name" = R.name,
					"volume" = R.volume,
					"fluid_r" = R.fluid_r,
					"fluid_g" = R.fluid_g,
					"fluid_b" = R.fluid_b,
				)

			usr.drop_item()
			reservoir.loc = src
			src.reservoirs[index] = list(
				"obj" = I,
				"name" = reservoir.name,
				"initVolume" = reservoir.initial_volume,
				"totalVolume" = reservoir.reagents.total_volume,
				"reagents" = reagents,
			)

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "ChemiAssembler")
			ui.open()

			if(!src.active_users[user.ckey])
				src.active_users[user.ckey] = user

	ui_data(mob/user)
		if(!src.processing)
			src.process()

		. = list()
		.["raw_program"] = src.raw_program
		.["registers"] = src.registers
		.["variables"] = src.variables
		.["program"] = src.program
		.["pointer"] = src.pointer
		.["running"] = src.running
		.["reservoirs"] = src.reservoirs
		.["active_user"] = src.active_users[user.ckey]
		.["console_output"] = src.console_output

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return
		switch(action)
			if("compandrun")
				src.compile(params["program"])
				src.running = TRUE
			if("compile")
				src.compile(params["program"])
			if("stop")
				src.running = FALSE
				playsound(src, "sound/machines/shieldgen_shutoff.ogg", 50, 1)
			if("running")
				var/running = params["running"]
				if(running)
					src.running = TRUE
				else
					src.running = FALSE
			if("step")
				src.execStep()
			if("reset")
				src.resetProgram()
			if("eject_reservoir")
				var/ckey = params["ckey"]
				var/index = params["index"]
				var/mob/M = src.active_users[ckey]
				src.ejectReservoir(M, index)
			if("insert_reservoir")
				var/ckey = params["ckey"]
				var/index = params["index"]
				var/mob/M = src.active_users[ckey]
				src.insertReservoir(M, index)

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 1))
			return UI_CLOSE

	attack_hand(mob/user as mob)
		..()
		src.ui_interact(user)

#undef IS_VALUE
#undef IS_VARIABLE
#undef IS_REGISTER
