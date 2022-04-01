
/*
    replacetext(haystack, needle, replace)

        Replaces all occurrences of needle in haystack (case-insensitive)
        with replace value.

    replaceText(haystack, needle, replace)

        Replaces all occurrences of needle in haystack (case-sensitive)
        with replace value.
*/

var/list/vowels_lower = list("a","e","i","o","u")
var/list/vowels_upper = list("A","E","I","O","U")
var/list/consonants_lower = list("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z")
var/list/consonants_upper = list("B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z")
var/list/symbols = list("!","?",".",",","'","\"","@","#","$","%","^","&","*","+","-","=","_","(",")","<",">","\[","\]",":",";")
var/list/numbers = list("0","1","2","3","4","5","6","7","8","9")

var/list/stinkDescs = list("nasty","unpleasant","foul","horrible","rotten","unholy",
	"repulsive","noxious","putrid","gross","unsavory","fetid","pungent","vulgar")
var/list/stinkTypes = list("smell","stink","odor","reek","stench","miasma")
var/list/stinkExclamations = list("Ugh","Good lord","Good grief","Christ","Fuck","Eww")
var/list/stinkThings = list("garbage can","trash heap","cesspool","toilet","pile of poo",
	"butt","skunk","outhouse","corpse","fart","devil")
var/list/stinkVerbs = list("took a shit","died","farted","threw up","wiped its ass")
var/list/stinkThingies = list("ass","taint","armpit","excretions","leftovers","administrator")

/proc/stinkString()
	// i am five - ISN
	switch (rand(1,4))
		if (1)
			return "[pick(stinkExclamations)], there's a \a [pick(stinkDescs)] [pick(stinkTypes)] in here..."
		if (2)
			return "[pick(stinkExclamations)], there's a \a [pick(stinkDescs)] [pick(stinkTypes)] in here..."
		if (3)
			return "[pick(stinkExclamations)], it smells like \a [pick(stinkThings)] [pick(stinkVerbs)] in here!"
		else
			return "[pick(stinkExclamations)], it smells like \a [pick(stinkThings)]'s [pick(stinkThingies)] in here!"

//For fuck's sake.
/*
/proc/bubblesort(list/L)
	var i, j
	for(i=L.len, i>0, i--)
		for(j=1, j<i, j++)
			if(L[j] > L[j+1])
				L.Swap(j, j+1)
	return L
*/
/proc/get_local_apc(O)
	var/turf/T = get_turf(O)
	if (!T)
		return null
	var/area/A = T.loc

	if (area_space_nopower(A))
		// dont search space for an apc
		return null

	if (A.area_apc)
		return A.area_apc

	for (var/obj/machinery/power/apc/APC in machine_registry[MACHINES_POWER])
		if (get_area(APC) != A)
			continue
		if (!(APC.status & BROKEN))
			return APC

	// Lots and lots of APCs use area strings to make the blowout random event possible.
	for (var/obj/machinery/power/apc/APC2 in machine_registry[MACHINES_POWER])
		var/area/A2 = null
		if (!isnull(APC2.areastring))
			A2 = get_area_name(APC2.areastring)
			if (!isnull(A2) && istype(A2) && A == A2 && !(APC2.status & BROKEN))
				return APC2

	return null

/proc/get_area_name(N) //get area by it's name

	for(var/area/A in world)
		if(A.name == N)
			return A
	return 0

/proc/get_area_by_type(var/type_path)
	if (!ispath(type_path))
		return null

	for (var/area/A in world)
		LAGCHECK(LAG_LOW)
		if (A.type == type_path)
			return A

	return null

/// For interacting with stuff.
/proc/in_interact_range(atom/source, atom/user)
	. = FALSE
	if(bounds_dist(source, user) == 0 || (bounds_dist(source, user) == 0)) // IN_RANGE is for general stuff, bounds_dist is for large sprites, presumably
		return TRUE
	else if (source in bible_contents && locate(/obj/item/storage/bible) in range(1, user)) // whoever added the global bibles, fuck you
		return TRUE
	else
		if (iscarbon(user))
			var/mob/living/carbon/C = user
			if (C.bioHolder.HasEffect("telekinesis") && get_dist(source, user) <= 7) //You can only reach stuff within your screen.
				var/X = source:x
				var/Y = source:y
				var/Z = source:z
				if (isrestrictedz(Z) || isrestrictedz(user:z))
					boutput(user, "<span class='alert'>Your telekinetic powers don't seem to work here.</span>")
					return 0
				SPAWN(0)
					//I really shouldnt put this here but i dont have a better idea
					var/obj/overlay/O = new /obj/overlay ( locate(X,Y,Z) )
					O.name = "sparkles"
					O.anchored = 1
					O.set_density(0)
					O.layer = FLY_LAYER
					O.set_dir(pick(cardinal))
					O.icon = 'icons/effects/effects.dmi'
					O.icon_state = "nothing"
					flick("empdisable",O)
					sleep(0.5 SECONDS)
					qdel(O)

				return TRUE

		else if (isobj(source))
			var/obj/SO = source
			if(SO.can_access_remotely(user))
				return TRUE

	if (mirrored_physical_zone_created) //checking for vistargets if true
		var/turf/T = get_turf(source)
		if (T.vistarget)
			if(bounds_dist(T.vistarget, user) == 0 || bounds_dist(T.vistarget, user) == 0)
				return TRUE


/proc/test_click(turf/from, turf/target)
	var/obj/item/dummy/click_dummy = get_singleton(/obj/item/dummy)
	click_dummy.set_loc(from)
	for (var/atom/A in from)
		if (A.flags & ON_BORDER)
			if (!A.CheckExit(click_dummy, target))
				click_dummy.set_loc(null)
				return FALSE
	for (var/atom/A in target)
		if ((A.flags & ON_BORDER))
			if (!A.Cross(click_dummy))
				click_dummy.set_loc(null)
				return FALSE
	click_dummy.set_loc(null)
	return TRUE

/proc/can_reach(mob/user, atom/target)
	if (target in bible_contents)
		target = locate(/obj/item/storage/bible) in range(1, user) // fuck bibles
		if (!target)
			return 0
	var/turf/UT = get_turf(user)
	var/turf/TT = get_turf(target)
	if (TT)
		var/obj/cover/C = locate() in TT
		if (C && target != C)
			return 0
	if (UT && TT != UT)
		var/obj/cover/C = locate() in UT
		if (C && target != C)
			return 0
	if (isturf(user.loc))
		if (!in_interact_range(target, user))
			return 0
		var/T1 = get_turf(user)
		var/T2 = get_turf(target)
		if (T1 == T2)
			return 1
		else
			var/dir = get_dir(T1, T2)
			if (dir & (dir-1))
				var/dir1, dir2
				switch (dir)
					if (NORTHEAST)
						dir1 = NORTH
						dir2 = EAST
					if (NORTHWEST)
						dir1 = NORTH
						dir2 = WEST
					if (SOUTHEAST)
						dir1 = SOUTH
						dir2 = EAST
					if (SOUTHWEST)
						dir1 = SOUTH
						dir2 = WEST
				var/turf/D1 = get_step(T1, dir1)
				var/turf/D2 = get_step(T1, dir2)

				if (!D1.density && test_click(T1, D1))
					if ((target.flags & ON_BORDER) || test_click(D1, T2))
						return 1
				if (!D2.density && test_click(T1, D2))
					if ((target.flags & ON_BORDER) || test_click(D2, T2))
						return 1
			else
				return (target.flags & ON_BORDER) || test_click(T1, T2)
	else if (isobj(target) || ismob(target))
		var/atom/L = target.loc
		while (L && !isturf(L))
			if (L == user)
				return 1
			L = L.loc
	return 0


/proc/get_viewing_AIs(center = null, distance = 7)
	RETURN_TYPE(/list/mob)
	. = list()

	var/turf/T = get_turf(center)
	if(length(T?.cameras))
		for_by_tcl(theAI, /mob/living/silicon/ai)
			if (theAI.deployed_to_eyecam)
				var/mob/living/intangible/aieye/AIeye = theAI.eyecam
				if(IN_RANGE(center, AIeye, distance))
					. += theAI

//Kinda sorta like viewers but includes observers. In theory.
/proc/observersviewers(var/Dist=world.view, var/Center=usr)
	var/list/viewMobs = viewers(Dist, Center)

	for(var/mob/dead/target_observer/M in observers)
		if(!M.client) continue
		if(M.target in view(Dist, Center) || M.target == Center)
			viewMobs += M

	return viewMobs

/proc/AIviewers(Depth=world.view,Center=usr)
	if (istype(Depth, /atom))
		var/newDepth = isnum(Center) ? Center : world.view
		Center = Depth
		Depth = newDepth

	. = viewers(Depth, Center) + get_viewing_AIs(Center, 7)
	if(length(by_cat[TR_CAT_OMNIPRESENT_MOBS]))
		for(var/mob/M as anything in by_cat[TR_CAT_OMNIPRESENT_MOBS])
			if(get_step(M, 0)?.z == get_step(Center, 0)?.z)
				. |= M

//A unique network ID for devices that could use one
/proc/format_net_id(var/refstring)
	if(!refstring)
		return
	. = copytext(refstring,4,(length(refstring)))
	. = add_zero(., 8)


//A little wrapper around format_net_id to account for non-null tag values
/proc/generate_net_id(var/atom/the_atom)
	if(!the_atom) return
	. = format_net_id("\ref[the_atom]")

#define CLUWNE_NOISE_DELAY 50

/proc/process_accents(var/mob/living/carbon/human/H, var/message)
	// Separate the radio prefix (if it exists) and message so the accent can't destroy the prefix
	var/prefixAndMessage = separate_radio_prefix_and_message(message)
	var/prefix = prefixAndMessage[1]
	message = prefixAndMessage[2]
	//Stores a human readable list of effects on the speech for admin logging. Please append to this list if you add more stuff here.
	var/messageEffects = list()
	var/wasUncool = phrase_log.is_uncool(message)

	if (!H || !istext(message))
		return

	if (H.bioHolder && !H.speech_void)
		var/datum/bioEffect/speech/S = null
		for(var/X in H.bioHolder.effects)
			S = H.bioHolder.GetEffect(X)
			if (istype(S,/datum/bioEffect/speech/))
				message = S.OnSpeak(message)
				messageEffects += S

	if (H.grabbed_by && length(H.grabbed_by))
		for (var/obj/item/grab/rag_muffle/RM in H.grabbed_by)
			if (RM.state > 0)
				message = mufflespeech(message)
				messageEffects += "Muffled by [H.grabbed_by]"
				break

	if (iscluwne(H))
		message = honk(message)
		messageEffects += "Cluwne Honk"
		if (world.time >= (H.last_cluwne_noise + CLUWNE_NOISE_DELAY))
			playsound(H, pick("sound/voice/cluwnelaugh1.ogg","sound/voice/cluwnelaugh2.ogg","sound/voice/cluwnelaugh3.ogg"), 35, 0, 0, H.get_age_pitch())
			H.last_cluwne_noise = world.time
	if (ishorse(H))
		message = neigh(message)
		messageEffects += "Horse"
		if (world.time >= (H.last_cluwne_noise + CLUWNE_NOISE_DELAY))
			playsound(H, pick("sound/voice/cluwnelaugh1.ogg","sound/voice/cluwnelaugh2.ogg","sound/voice/cluwnelaugh3.ogg"), 35, 0, 0, H.get_age_pitch())
			H.last_cluwne_noise = world.time

	if ((H.reagents && H.reagents.get_reagent_amount("ethanol") > 30 && !isdead(H)) || H.traitHolder.hasTrait("alcoholic"))
		if((H.reagents.get_reagent_amount("ethanol") > 125 && prob(20)))
			message = say_superdrunk(message)
			messageEffects += "Superdrunk"
		else
			message = say_drunk(message)
			messageEffects += "Drunk"

	var/datum/ailment_data/disease/berserker = H.find_ailment_by_type(/datum/ailment/disease/berserker/)
	if (istype(berserker,/datum/ailment_data/disease/) && berserker.stage > 1)
		if (prob(10))
			message = say_furious(message)
			messageEffects += "Furious"
		message = replacetext(message, ".", "!")
		message = replacetext(message, ",", "!")
		message = replacetext(message, "?", "!")
		message = uppertext(message)
		messageEffects += "Berserk"
		var/addexc = rand(2,6)
		while (addexc > 0)
			message += "!"
			--addexc

	if(H.bioHolder && H.bioHolder.genetic_stability < 50)
		if (prob(40))
			message = say_gurgle(message)
			messageEffects += "Gurgle"

	if(H.mutantrace && !isdead(H))
		message = H.mutantrace.say_filter(message)
		messageEffects += "[H.mutantrace] say_filter()"

	if(HasturPresent == 1)
		message = replacetext(message, "Hastur", "????")
		message = replacetext(message, "H.a.s.t.u.r", "????")
		message = replacetext(message, "H.astur", "????")
		message = replacetext(message, "H.a.stur", "????")
		message = replacetext(message, "H.a.s.tur", "????")
		message = replacetext(message, "H.a.s.t.ur", "????")
		message = replacetext(message, "H-a-s-t-u-r", "????")
		message = replacetext(message, "H-astur", "????")
		message = replacetext(message, "H-a-stur", "????")
		message = replacetext(message, "H-a-s-tur", "????")
		message = replacetext(message, "H-a-s-t-ur", "????")
		message = replacetext(message, "H a s t u r", "????")
		message = replacetext(message, "H astur", "????")
		message = replacetext(message, "H a s tur", "????")
		message = replacetext(message, "H a s t ur", "????")
		messageEffects += "Hastur"

#ifdef CANADADAY
	if (prob(30))
		message = replacetext(message, "?", " Eh?")
		messageEffects += "Canada Day eh?"
#endif

	if(phrase_log.is_uncool(message) && !wasUncool)
		logTheThing("admin",H,null,"[H] tried to say [prefixAndMessage[2]] but it was garbled into [message] which is uncool by the following effects: "+jointext(messageEffects,", ")+". We garbled the bad words.")
		message = replacetext(message,phrase_log.uncool_words,pick("urr","blargh","der","hurr","pllt"))
	return prefix + message


/proc/can_see(atom/source, atom/target, length=5) // I couldnt be arsed to do actual raycasting :I This is horribly inaccurate.
	var/turf/current = get_turf(source)
	var/turf/target_turf = get_turf(target)
	if(current == target_turf)
		return TRUE
	if(get_dist(current, target_turf) > length)
		return FALSE
	current = get_step_towards(source, target_turf)
	while((current != target_turf))
		if(current.opacity)
			return FALSE
		for(var/atom/A in current)
			if(A.opacity)
				return FALSE
		current = get_step_towards(current, target_turf)
	return TRUE



/mob/proc/get_equipped_items()
	. = list()
	if(src.back) . += src.back
	if(src.ears) . += src.ears
	if(src.wear_mask) . += src.wear_mask

	if(src.l_hand)
		if (src.l_hand.c_flags & EQUIPPED_WHILE_HELD)
			. += src.l_hand


		if (src.l_hand.c_flags & HAS_GRAB_EQUIP)
			for(var/obj/item/grab/G in src.l_hand)
				if (G.c_flags & EQUIPPED_WHILE_HELD)
					. += G

	if(src.r_hand)
		if (src.r_hand.c_flags & EQUIPPED_WHILE_HELD)
			. += src.r_hand

		if (src.r_hand.c_flags & HAS_GRAB_EQUIP)
			for(var/obj/item/grab/G in src.r_hand)
				if (G.c_flags & EQUIPPED_WHILE_HELD)
					. += G


/proc/get_step_towards2(var/atom/ref , var/atom/trg)
	var/base_dir = get_dir(ref, get_step_towards(ref,trg))
	var/turf/temp = get_step_towards(ref,trg)

	if(is_blocked_turf(temp))
		var/dir_alt1 = turn(base_dir, 90)
		var/dir_alt2 = turn(base_dir, -90)
		var/turf/turf_last1 = temp
		var/turf/turf_last2 = temp
		var/free_tile = null
		var/breakpoint = 0

		while(!free_tile && breakpoint < 10)
			if(!is_blocked_turf(turf_last1))
				free_tile = turf_last1
				break
			if(!is_blocked_turf(turf_last2))
				free_tile = turf_last2
				break
			turf_last1 = get_step(turf_last1,dir_alt1)
			turf_last2 = get_step(turf_last2,dir_alt2)
			breakpoint++

		if(!free_tile) return get_step(ref, base_dir)
		else return get_step_towards(ref,free_tile)

	else return get_step(ref, base_dir)

/proc/get_areas(var/areatype)
	//Takes: Area type as text string or as typepath OR an instance of the area.
	//Returns: A list of all areas of that type in the world.
	//Notes: Simple!
	if(!areatype) return null
	if(istext(areatype)) areatype = text2path(areatype)
	if(isarea(areatype))
		var/area/areatemp = areatype
		areatype = areatemp.type

	. = new/list()

	for(var/area/R in world)
		if(istype(R, areatype))
			. += R

/proc/get_areas_with_turfs(var/areatype)
	//Takes: Area type as text string or as typepath OR an instance of the area.
	//Returns: A list of all areas of that type in the world.
	//Notes: Simple!
	if(!areatype) return null
	if(istext(areatype)) areatype = text2path(areatype)
	if(isarea(areatype))
		var/area/areatemp = areatype
		areatype = areatemp.type

	. = new/list()

	for(var/area/R in world)
		LAGCHECK(LAG_LOW)
		if(istype(R, areatype))
			for (var/turf/T in R)
				. += R
				break

/proc/get_areas_with_unblocked_turfs(var/areatype)
	//Takes: Area type as text string or as typepath OR an instance of the area.
	//Returns: A list of all areas of that type in the world that have at least one unblocked turf.
	//Also sets an unblocked turf for each area for the spy thief mode.
	//Notes: Simple!
	if(!areatype) return null
	if(istext(areatype)) areatype = text2path(areatype)
	if(isarea(areatype))
		var/area/areatemp = areatype
		areatype = areatemp.type

	. = list()

	for(var/area/R in world)
		LAGCHECK(LAG_LOW)
		if(istype(R, areatype))
			for (var/turf/T in R)
				if(!is_blocked_turf(T))
					R.spyturf = T
					. += R
					break

/proc/get_area_turfs(var/areatype, var/floors_only)
	//Takes: Area type as text string or as typepath OR an instance of the area.
	//Returns: A list of all turfs in areas of that type of that type in the world.
	//Notes: Simple!

	if(!areatype)
		return null
	if(istext(areatype)) areatype = text2path(areatype)
	if(isarea(areatype))
		var/area/areatemp = areatype
		areatype = areatemp.type

	. = new/list()
	var/list/areas = get_areas(areatype)
	for(var/area/R in areas)
		for(var/turf/T in R)
			if(floors_only && (!isfloor(T) || is_blocked_turf(T)))
				continue
			. += T

/proc/get_area_all_atoms(var/areatype)
	//Takes: Area type as text string or as typepath OR an instance of the area.
	//Returns: A list of all atoms	(objs, turfs, mobs) in areas of that type of that type in the world.
	//Notes: Simple!

	if(!areatype) return null
	if(istext(areatype)) areatype = text2path(areatype)
	if(isarea(areatype))
		var/area/areatemp = areatype
		areatype = areatemp.type

	. = new/list()
	var/list/areas = get_areas(areatype)
	for(var/area/R in areas)
		for(var/atom/A in R)
			. += A

/datum/coords //Simple datum for storing coordinates.
	var/x_pos = null
	var/y_pos = null
	var/z_pos = null


/datum/color	//Simple datum for RGBA colours
			  	// used as an alternative to rgb() proc
			  	// for ease of access to components
	var/r = null	// all stored as 0-255
	var/g = null
	var/b = null
	var/a = null

	New(_r,_g,_b,_a=255)
		..()
		r = _r
		g = _g
		b = _b
		a = _a

	proc/from_hex(var/hexstr)
		r = GetRedPart(hexstr)
		g = GetGreenPart(hexstr)
		b = GetBluePart(hexstr)
		a = 255
		return

	// return in #RRGGBB hex form
	proc/to_rgb()
		return rgb(r,g,b)

	// return in #RRGGBBAA hex form
	proc/to_rgba()
		return rgb(r,g,b,a)


/area/proc/move_contents_to(var/area/A, var/turftoleave=null, var/ignore_fluid = 0, turf_to_skip=null)
	//Takes: Area. Optional: turf type to leave behind.
	//Returns: Nothing.
	//Notes: Attempts to move the contents of one area to another area.
	//       Movement based on lower left corner. Tiles that do not fit
	//		 into the new area will not be moved.
	if(!A || !src) return 0

	var/list/turfs_src = get_area_turfs(src.type)
	var/list/turfs_trg = get_area_turfs(A.type)

	var/src_min_x = 0
	var/src_min_y = 0
	for (var/turf/T as anything in turfs_src)
		if(T.x < src_min_x || !src_min_x) src_min_x	= T.x
		if(T.y < src_min_y || !src_min_y) src_min_y	= T.y
	DEBUG_MESSAGE("src_min_x = [src_min_x], src_min_y = [src_min_y]")

	var/trg_min_x = 0
	var/trg_min_y = 0
	var/trg_z = 0
	for (var/turf/T as anything in turfs_trg)
		if(T.x < trg_min_x || !trg_min_x) trg_min_x	= T.x
		if(T.y < trg_min_y || !trg_min_y) trg_min_y	= T.y
		trg_z = T.z
	DEBUG_MESSAGE("trg_min_x = [src_min_x], trg_min_y = [src_min_y]")

	for (var/turf/S in turfs_src)
		var/turf/T = locate(S.x - src_min_x + trg_min_x, S.y - src_min_y + trg_min_y, trg_z)
		if(T?.loc != A || istype(S, turf_to_skip)) continue
		T.ReplaceWith(S.type, keep_old_material = 0, force=1)
		T.appearance = S.appearance
		T.set_density(S.density)
		T.set_dir(S.dir)

	for (var/turf/S in turfs_src)
		var/turf/T = locate(S.x - src_min_x + trg_min_x, S.y - src_min_y + trg_min_y, trg_z)
		for (var/atom/movable/AM as anything in S)
			if (istype(AM, /obj/forcefield) || istype(AM, /obj/overlay/tile_effect)) continue
			if (!ignore_fluid && istype(AM, /obj/fluid)) continue
			if (istype(AM, /obj/decal/tile_edge) && istype(S, turf_to_skip)) continue
			AM.set_loc(T)
		if(turftoleave)
			S.ReplaceWith(turftoleave, keep_old_material = 0, force=1)
		else
			S.ReplaceWithSpaceForce()



// return description of how full a container is
proc/get_fullness(var/percent)

	if(percent == 0)
		return "empty"
	if(percent < 2)
		return "nearly empty"
	if(percent < 24)
		return "less than a quarter full"
	if(percent < 26)
		return "a quarter full"
	if(percent < 37)
		return "more than a quarter full"
	if(percent < 49)
		return "less than half full"
	if(percent < 51)
		return "half full"
	if(percent < 62)
		return "more than half full"
	if(percent < 74)
		return "less than three-quarters full"
	if(percent < 76)
		return "three-quarters full"
	if(percent < 97)
		return "more than three-quarters full"
	if(percent < 99.5)
		return "nearly full"
	return "full"

// return description of transparency/opaqueness

proc/get_opaqueness(var/trans)	// 0=transparent, 255=fully opaque
	if(trans < 25)
		return "clear"
	if(trans < 60)
		return  "transparent"
	if(trans< 150)
		return "mostly transparent"
	if(trans <200)
		return "dense"
	return "opaque"

proc/LoadSavefile(name)
	. = new/savefile(name)

/// Returns a turf at the edge of a squared circle of specified radius around a thing
proc/GetRandomPerimeterTurf(var/atom/A, var/dist = 10, var/dir)
	var/turf/T = get_turf(A)
	if(!isturf(T))
		return
	var/T_x = T.x
	var/T_y = T.y
	var/T_z = T.z
	var/out_x
	var/out_y
	var/x_or_y = pick("x", "y") // Which edge of the squircle isn't randomized
	if(dir)
		if(dir == NORTH || dir == SOUTH)
			x_or_y = "y"
		else
			x_or_y = "x"
	if(x_or_y == "x")
		if(dir)
			if(dir == EAST)
				out_x = clamp(T_x + dist, 1, world.maxx)
			else if (dir == WEST)
				out_x = clamp(T_x - dist, 1, world.maxx)
		else
			out_x = clamp(pick((T_x + dist), (T_x - dist)), 1, world.maxx)
		out_y = clamp(rand(T_y - dist, T_y + dist), 1, world.maxy)
	else
		if(dir)
			if(dir == NORTH)
				out_y = clamp(T_y + dist, 1, world.maxy)
			else if (dir == SOUTH)
				out_y = clamp(T_y - dist, 1, world.maxy)
		else
			out_y = clamp(pick((T_y + dist), (T_y - dist)), 1, world.maxy)
		out_x = clamp(rand(T_x - dist, T_x + dist), 1, world.maxx)
	T = locate(out_x, out_y, T_z)
	if(isturf(T))
		return T

proc/ThrowRandom(var/atom/movable/A, var/dist = 10, var/speed = 1, var/list/params, var/thrown_from, var/throw_type, var/allow_anchored, var/bonus_throwforce, var/end_throw_callback)
	if(istype(A))
		var/turf/Y = GetRandomPerimeterTurf(A, dist)
		A.throw_at(Y, dist, speed, params, thrown_from, throw_type, allow_anchored, bonus_throwforce, end_throw_callback)



/// get_ouija_word_list
// get a list of words for an ouija board
proc/get_ouija_word_list(var/atom/movable/source = null, var/words_min = 5, var/words_max = 8, var/include_nearby_mobs_chance = 40, var/include_most_mobs_chance = 20, include_said_phrases_chance = 10)
	var/list/words = list()

	// Generic Ouija words
	for(var/i in 1 to rand(words_min, words_max))
		var/picked = pick(strings("ouija_board.txt", "ouija_board_words"))
		words |= picked

	if (prob(include_nearby_mobs_chance))
		var/list/mobs = observersviewers(Center = source)
		if (length(mobs))
			var/mob/M = pick(mobs)
			words |= (M.real_name ? M.real_name : M.name)

	if(prob(include_said_phrases_chance))
		words |= phrase_log.random_phrase("say")

	if (prob(include_most_mobs_chance))

		var/roll = rand(0, 200)
		switch (roll)
			if (0)
				// any actual antag
				var/list/player_pool = list()
				for (var/mob/M in mobs)
					if (!M.client || istype(M, /mob/new_player) || !checktraitor(M))
						continue
					player_pool += M
				if (length(player_pool))
					var/mob/M = pick(player_pool)
					words |= (M.real_name ? M.real_name : M.name)
			if (1 to 5)
				// fake wraith
				words |= call(/mob/wraith/proc/make_name)()
			if (6 to 10)
				// fake blob (heh)
				var/blobname = phrase_log.random_phrase("name-blob")
				words |= strip_html(copytext(blobname, 1, 26) + " the Blob")
			if (10 to 20)
				// fake nukeop (uses the real nukeop company name, too)
				// Copied from gamemodes/nuclear.dm
				var/list/callsign_pool_keys = list("nato", "melee_weapons", "colors", "birds", "mammals", "moons")
				//Alphabetical agent callsign lists are delcared here, seperated in to catagories.
				var/list/callsign_list = strings("agent_callsigns.txt", pick(callsign_pool_keys))
				words |= "[syndicate_name()] Operative [pick(callsign_list)]"
			if (20 to 30)
				// fake wizard
				var/wizname = phrase_log.random_phrase("name-wizard")
				words |= strip_html(copytext(wizname, 1, 26))

			else
				// any random living mob
				var/list/player_pool = list()
				for (var/mob/M in mobs)
					if (!M.client || istype(M, /mob/new_player))
						continue
					player_pool += M
				if (length(player_pool))
					var/mob/M = pick(player_pool)
					words |= (M.real_name ? M.real_name : M.name)

	return words
