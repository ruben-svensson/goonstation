/*

If it's a num it's a value
If it's a string it's a variable
sx is source register, valid sources are 1-10 for the reservoirs
tx is target register, valid targets are for reservoirs 1-10, and 11 for pill, 12 for vial, 13 for syringe
ax is amount register (16-bit)





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

	var/list/registers = list(
		"sx" = 0, // Source register
		"tx" = 0, // Target register
		"ax" = 0, // Amount register
	)
	var/list/variables = list()

	var/list/program = list() // Each entry is an instruction
	var/pointer = 1 // The current instruction

	var/running = FALSE


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
			program.Add(list(line_split))

	process()
		if(!program.len || !running)
			return

		if(pointer > program.len)
			running = FALSE
			boutput(world, "Program finished.")
			playsound(src, "sound/machines/ding.ogg", 50, 1)
			return

		if(src.running)
			src.execStep()

	proc/execStep()
		src.processProgram()
		src.pointer += 1

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



			if("jmp")
				// Jumps to label
				var/label = instruction[2]
				for(var/i = 1 to program.len)
					if(program[i][1] == "lbl" && program[i][2] == label)
						pointer = i
						break


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
		if(value in variables)
			state[1] = value
			state[2] = IS_VARIABLE
		if(value in registers)
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

	proc/compile(program)
		src.resetProgram()
		src.raw_program = program
		src.build()

	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "ChemiAssembler")
			ui.open()

	ui_data(mob/user)
		src.process()
		. = list()
		.["raw_program"] = src.raw_program
		.["registers"] = src.registers
		.["variables"] = src.variables
		.["program"] = src.program
		.["pointer"] = src.pointer
		.["running"] = src.running

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
