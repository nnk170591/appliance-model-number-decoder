/**
 * Part Type Classifier
 *
 * Rule-based classification of appliance part types from part
 * descriptions. Uses first-match-wins ordered patterns.
 *
 * 72 categories aligned with industry standard (RepairClinic / PartSelect)
 * and optimized for SEO consumer search language.
 *
 * Handles:
 *   - GE reversed word order (VALVE WATER, MOTOR FAN COND)
 *   - GE abbreviations (EVAP, COND)
 *   - Whirlpool comma format (Valve, Water; Motor, Fan)
 *   - Electronic SMD components (chip resistor, chip capacitor)
 *
 * Default: null (unknown is better than wrong).
 */

export interface PartTypeResult {
  slug: string
  name: string
}

// ── Category constants ──────────────────────────────────────────────

const ADHESIVE: PartTypeResult = { slug: "adhesive-sealant", name: "Adhesive & Sealant" }
const AGITATOR: PartTypeResult = { slug: "agitator-auger", name: "Agitator & Auger" }
const AXLE_ROLLER: PartTypeResult = { slug: "axle-roller-shaft-wheel", name: "Axle, Roller, Shaft & Wheel" }
const BEARING: PartTypeResult = { slug: "bearing", name: "Bearing" }
const BELT: PartTypeResult = { slug: "belt", name: "Belt" }
const BLOWER_FAN: PartTypeResult = { slug: "blower-wheel-fan-blade", name: "Blower Wheel & Fan Blade" }
const BRACKET: PartTypeResult = { slug: "bracket-flange", name: "Bracket & Flange" }
const BURNER_GRATE: PartTypeResult = { slug: "burner-grate-griddle", name: "Burner Grate & Griddle" }
const CAP_COVER: PartTypeResult = { slug: "cap-lid-cover", name: "Cap, Lid & Cover" }
const CAPACITOR: PartTypeResult = { slug: "capacitor-relay-overload", name: "Capacitor, Relay & Overload" }
const CHASSIS: PartTypeResult = { slug: "chassis-cabinet", name: "Chassis & Cabinet" }
const BOARD_TIMER: PartTypeResult = { slug: "circuit-board-timer", name: "Circuit Board & Timer" }
const CLEANER: PartTypeResult = { slug: "cleaner-deodorizer", name: "Cleaner & Deodorizer" }
const CLIP: PartTypeResult = { slug: "clip-clamp", name: "Clip & Clamp" }
const COMPRESSOR: PartTypeResult = { slug: "compressor-sealed-system", name: "Compressor & Sealed System" }
const CONTROL_BOARD: PartTypeResult = { slug: "control-board-electronic-control", name: "Control Board & Electronic Control" }
const COOKTOP: PartTypeResult = { slug: "cooktop-glass-top", name: "Cooktop & Glass Top" }
const COUPLING: PartTypeResult = { slug: "coupling-cam-drive-block", name: "Coupling, Cam & Drive Block" }
const DEFROST: PartTypeResult = { slug: "defrost-thermostat-heater", name: "Defrost Thermostat & Heater" }
const DEFLECTOR: PartTypeResult = { slug: "deflector-chute", name: "Deflector & Chute" }
const DIODE: PartTypeResult = { slug: "diode-magnetron-resistor", name: "Diode, Magnetron & Resistor" }
const WASH_ARM: PartTypeResult = { slug: "dishwasher-spray-arm-wash-arm", name: "Dishwasher Spray Arm & Wash Arm" }
const DISPENSER: PartTypeResult = { slug: "dispenser", name: "Dispenser" }
const DOOR: PartTypeResult = { slug: "door", name: "Door" }
const DRAWER: PartTypeResult = { slug: "drawer-drip-pan", name: "Drawer & Drip Pan" }
const DRUM_TUB: PartTypeResult = { slug: "drum-tub", name: "Drum & Tub" }
const DUCT: PartTypeResult = { slug: "duct-venting", name: "Duct & Venting" }
const EVAPORATOR: PartTypeResult = { slug: "evaporator", name: "Evaporator" }
const FASTENER: PartTypeResult = { slug: "fastener", name: "Fastener" }
const FILTER: PartTypeResult = { slug: "filter", name: "Filter" }
const FUSE: PartTypeResult = { slug: "fuse-thermal-fuse", name: "Fuse & Thermal Fuse" }
const GAS_VALVE: PartTypeResult = { slug: "gas-valve-burner", name: "Gas Valve & Burner" }
const GASKET: PartTypeResult = { slug: "gasket-door-seal", name: "Gasket & Door Seal" }
const GRILLE: PartTypeResult = { slug: "grille-kickplate", name: "Grille & Kickplate" }
const HANDLE: PartTypeResult = { slug: "handle", name: "Handle" }
const HEATING: PartTypeResult = { slug: "heating-element", name: "Heating Element" }
const HINGE: PartTypeResult = { slug: "hinge", name: "Hinge" }
const HOSE: PartTypeResult = { slug: "hose-tube-fitting", name: "Hose, Tube & Fitting" }
const ICE_MAKER: PartTypeResult = { slug: "ice-maker", name: "Ice Maker" }
const ICE_BIN: PartTypeResult = { slug: "ice-bin-bucket", name: "Ice Bin & Bucket" }
const IGNITER: PartTypeResult = { slug: "igniter-spark-module", name: "Igniter & Spark Module" }
const INSULATION: PartTypeResult = { slug: "insulation", name: "Insulation" }
const INSTALL_KIT: PartTypeResult = { slug: "installation-kit-hardware", name: "Installation Kit & Hardware" }
const INVERTER: PartTypeResult = { slug: "inverter", name: "Inverter" }
const KNOB: PartTypeResult = { slug: "knob-dial-button", name: "Knob, Dial & Button" }
const LATCH: PartTypeResult = { slug: "latch-catch-door-lock", name: "Latch, Catch & Door Lock" }
const LEG: PartTypeResult = { slug: "leg-leveler-caster", name: "Leg, Leveler & Caster" }
const LEVER: PartTypeResult = { slug: "lever", name: "Lever" }
const LIGHT: PartTypeResult = { slug: "light-bulb-led", name: "Light Bulb & LED" }
const LUBRICANT: PartTypeResult = { slug: "lubricant", name: "Lubricant" }
const MANUAL: PartTypeResult = { slug: "manuals-care-guides-literature", name: "Manuals, Care Guides & Literature" }
const MOTOR: PartTypeResult = { slug: "motor", name: "Motor" }
const PAINT: PartTypeResult = { slug: "paint-touch-up", name: "Paint & Touch-Up" }
const PANEL: PartTypeResult = { slug: "panel", name: "Panel" }
const POWER_CORD: PartTypeResult = { slug: "power-cord-wire-harness-connector", name: "Power Cord, Wire Harness & Connector" }
const PUMP: PartTypeResult = { slug: "pump", name: "Pump" }
const RACK: PartTypeResult = { slug: "rack-shelf-basket", name: "Rack, Shelf & Basket" }
const RAIL: PartTypeResult = { slug: "rail", name: "Rail" }
const REMOTE: PartTypeResult = { slug: "remote-control", name: "Remote Control" }
const RESERVOIR: PartTypeResult = { slug: "reservoir-tank-container", name: "Reservoir, Tank & Container" }
const SENSOR: PartTypeResult = { slug: "sensor-thermistor", name: "Sensor & Thermistor" }
const SHELF: PartTypeResult = { slug: "shelf-shelf-support", name: "Shelf & Shelf Support" }
const SPRING: PartTypeResult = { slug: "spring-suspension", name: "Spring & Suspension" }
const STARTER: PartTypeResult = { slug: "starter", name: "Starter" }
const SWITCH: PartTypeResult = { slug: "switch", name: "Switch" }
const THERMOSTAT: PartTypeResult = { slug: "temperature-control-thermostat", name: "Temperature Control Thermostat" }
const TOUCHPAD: PartTypeResult = { slug: "touchpad-control-panel", name: "Touchpad & Control Panel" }
const TRANSFORMER: PartTypeResult = { slug: "transformer", name: "Transformer" }
const TRANSMISSION: PartTypeResult = { slug: "transmission-brake-clutch", name: "Transmission, Brake & Clutch" }
const TRIM: PartTypeResult = { slug: "trim-decorative-panel", name: "Trim & Decorative Panel" }
const VALVE: PartTypeResult = { slug: "valve-float", name: "Valve & Float" }
const WIRE: PartTypeResult = { slug: "wire-receptacle-wire-connector", name: "Wire, Receptacle & Wire Connector" }

// ── Rules: first match wins, more specific before general ───────────

const RULES: [RegExp, PartTypeResult][] = [
  // ═══════════════════════════════════════════════════════════════════
  // OVERRIDES — multi-word specifics that need special routing
  // ═══════════════════════════════════════════════════════════════════

  // ── WCI/GE first-word overrides (Type,modifier or TYPE MODIFIER) ──
  // When description starts with a specific part type, trust it
  [/^hinge[\s,-]/i, HINGE],
  [/^bracket[\s,-]/i, BRACKET],
  [/^screw[\s,-]/i, FASTENER],
  [/^clip[\s,-]/i, CLIP],
  [/^latch[\s,-]/i, LATCH],
  [/^bushing[\s,-]/i, AXLE_ROLLER],
  [/^harness[\s,-]/i, WIRE],
  [/^spacer[\s,-]/i, FASTENER],

  // ── Sealed-system insulation → Insulation (not Bracket) ──
  [/\binsulat\w*\b.*\b(compressor|evap(orator)?|cond(enser)?)\b/i, INSULATION],
  [/\b(compressor|evap(orator)?|cond(enser)?)\b.*\binsulat\w*\b/i, INSULATION],

  // ── Sealed-system covers → Cap/Cover (not Compressor/Evaporator) ──
  [/\b(cover|shield)\b.*\b(compressor|evap(orator)?|cond(enser)?)\b/i, CAP_COVER],
  [/\b(compressor|evap(orator)?|cond(enser)?)\b.*\b(cover|shield)\b/i, CAP_COVER],

  // ── Sealed-system hardware → Bracket (not Compressor/Evaporator) ──
  [/\b(clip|grommet|stud|mount\w*|bracket|support\w*|brace|screw|pad|nut|bolt|clamp|retainer|trim|insul\w*|reflector|shroud|plate|roller|strap)\b.*\b(compressor|evap(orator)?|cond(enser)?)\b/i, BRACKET],
  [/\b(compressor|evap(orator)?|cond(enser)?)\b.*\b(clip|grommet|stud|mount\w*|bracket|support\w*|brace|screw|pad|nut|bolt|clamp|retainer|trim|insul\w*|reflector|shroud|plate|roller|strap)\b/i, BRACKET],

  // Capacitor abbreviation (CAPAC. MTR-FAN 9MFD)
  [/\bcapac\.?\b/i, CAPACITOR],
  [/\bmfd\b/i, CAPACITOR],

  // Compressor start components → Capacitor/Relay, not Compressor
  [/compressor\s*(start\s*)?(relay|overload)/i, CAPACITOR],
  [/(relay|overload)\s*comp(ressor)?/i, CAPACITOR],

  // Condenser/evaporator fan → Blower/Fan, not sealed system
  [/cond(enser)?\s*fan/i, BLOWER_FAN],
  [/fan\s*cond(enser)?/i, BLOWER_FAN],
  [/evap(orator)?\s*fan/i, BLOWER_FAN],
  [/fan\s*evap(orator)?/i, BLOWER_FAN],
  [/shroud\s*fan/i, BLOWER_FAN],
  [/fan\s*shroud/i, BLOWER_FAN],

  // Evaporator/condenser covers → Cap/Cover, not sealed system
  [/evap(orator)?[\s-]*(cover|panel|shield|drain|casing)/i, CAP_COVER],
  [/(cover|panel|shield|drain|casing)[\s-]*evap(orator)?/i, CAP_COVER],
  [/cond(enser)?[\s-]*(cover|panel|shield|baffle|grille|clip|bracket)/i, CAP_COVER],
  [/(cover|panel|shield|baffle|grille|clip|bracket)[\s-]*cond(enser)?/i, CAP_COVER],
  [/compressor\s*(access\s*)?(cover|baffle)/i, CAP_COVER],
  [/(baffle|grille)\s*comp(ressor)?/i, CAP_COVER],

  // ── Cross-category overrides (round 1 fixes) ──
  // Bracket + handle/dispenser → Bracket (not Handle/Dispenser)
  [/bracket.*handle/i, BRACKET],
  [/handle.*bracket/i, BRACKET],
  [/bracket.*dispenser/i, BRACKET],
  [/bracket.*door/i, BRACKET],
  // Cover/fender + board → Cap/Cover (not Circuit Board)
  [/cover.*board/i, CAP_COVER],
  [/board.*cover/i, CAP_COVER],
  [/pcb.*cover/i, CAP_COVER],
  [/fender\s*board/i, PANEL],
  // Harness/wire + heater/defrost/lock → Wire (not Heating/Latch)
  [/harness.*(?:heater|defrost|lock|motor)/i, WIRE],
  [/wiring.*(?:heater|defrost|lock|motor)/i, WIRE],
  // Grommet + motor/fan → Fastener (not Motor)
  [/grommet.*(?:motor|fan)/i, FASTENER],
  [/(?:motor|fan).*grommet/i, FASTENER],
  // Plate + damper → Panel (not Spring)
  [/plate.*damper/i, PANEL],
  [/damper.*plate/i, PANEL],
  // Assist spring / spring + lid/cover/washer → Spring (not Cap/Cover)
  [/\bassist\s*spring/i, SPRING],
  [/\bspring\b.*\b(lid|cover|washer)\b/i, SPRING],
  // Seal/gasket + valve/inlet → Gasket (not Valve) — WCI "Seal-water inlet,inlet valve"
  [/^seal[\s,-].*valve/i, GASKET],
  [/gasket.*valve/i, GASKET],
  [/seal.*gasket/i, GASKET],
  // Switch + motor → Switch (motor start switch, not Motor)
  [/\bswitch\b.*\bmotor\b/i, SWITCH],
  [/\bmotor\b.*\bswitch\b/i, SWITCH],
  // Bracket/support + solenoid → Bracket (not Valve)
  [/\bbracket\b.*\bsolenoid\b/i, BRACKET],
  [/\bsupport\b.*\bvalve\b/i, BRACKET],
  // Tube/hose + valve → Hose (not Valve)
  [/\btube\b.*\bvalve\b/i, HOSE],
  // Harness + valve/door → Wire (not Valve/Door)
  [/\bharness\b.*\b(valve|door)\b/i, WIRE],
  [/\bwiring\b.*\bdoor\b/i, WIRE],
  // Screw + capillary → Fastener (not Compressor)
  [/\bscrew\b.*\bcapillary\b/i, FASTENER],
  // Clamp + element → Clip (not Heating)
  [/\bclamp\b.*\belement\b/i, CLIP],
  [/\belement\b.*\bclamp\b/i, CLIP],
  // Clip + motor → Clip (not Motor)
  [/\bclip\b.*\bmotor\b/i, CLIP],
  // Bracket + lamp → Bracket (not Light)
  [/\bbracket\b.*\blamp\b/i, BRACKET],
  // Latch + drawer → Latch (not Drawer)
  [/\blatch\b.*\bdrawer\b/i, LATCH],
  // Guide/slide + drawer → Rail (not Drawer)
  [/\bguide\b.*\bdrawer\b/i, RAIL],
  // Duct + magnetron → Duct (not Diode)
  [/\bduct\b.*\bmagnetron\b/i, DUCT],
  // Label/energy guide → Trim (not Rail from "guide")
  [/\benergy\s*guide\b/i, TRIM],
  [/\blabel\b.*\bguide\b/i, TRIM],
  // Gasket + nozzle → Gasket (not Hose)
  [/gasket.*nozzle/i, GASKET],
  [/nozzle.*gasket/i, GASKET],
  // Thermostat/defrost + ice maker → Defrost (not Ice Maker)
  [/thermostat.*ice\s*maker/i, DEFROST],
  [/defrost.*ice\s*maker/i, DEFROST],
  // Blower wheel → Blower Fan (not Axle/Wheel)
  [/blower\s*wheel/i, BLOWER_FAN],
  [/wheel\s*blower/i, BLOWER_FAN],
  // Timer knob → Knob (not Board/Timer)
  [/timer.*knob/i, KNOB],
  [/knob.*timer/i, KNOB],
  // Harness + PCB/board → Wire (not Circuit Board)
  [/harness.*(?:pcb|board)/i, WIRE],
  [/(?:pcb|board).*harness/i, WIRE],
  // Screw/bracket/insulation + motor/igniter/burner → their category, not Motor/Igniter/Burner
  [/\b(screw|grommet)\b.*\b(motor|ignit\w*|burner)\b/i, FASTENER],
  [/\b(motor|ignit\w*|burner)\b.*\b(screw|grommet)\b/i, FASTENER],
  [/bracket.*motor/i, BRACKET],
  [/motor.*bracket/i, BRACKET],
  [/insulation.*motor/i, INSULATION],
  [/motor.*insulation/i, INSULATION],
  // Roller/shaft + tub → Axle/Roller (not Drum/Tub)
  [/roller.*tub/i, AXLE_ROLLER],
  [/tub.*roller/i, AXLE_ROLLER],
  [/shaft.*damper/i, AXLE_ROLLER],
  // Track + filter → Rail (not Filter)
  [/track.*filter/i, RAIL],
  [/filter.*track/i, RAIL],
  // Latch/lock + door (flexible spacing) → Latch (not Door)
  [/\blatch\b.*\bdoor\b/i, LATCH],
  [/\block\b.*\bdoor\b/i, LATCH],
  // Knob + switch → Knob (not Switch)
  [/knob.*switch/i, KNOB],
  [/switch.*knob/i, KNOB],
  // Seal tape → Adhesive (not Gasket)
  [/seal\s*tape/i, ADHESIVE],
  [/tape\s*seal/i, ADHESIVE],
  // Hinge + maintop → Hinge (not Cooktop)
  [/hinge.*maintop/i, HINGE],
  [/maintop.*hinge/i, HINGE],
  // Defrost heater shield → Cap/Cover (not Defrost)
  [/defrost.*heater.*shield/i, CAP_COVER],
  [/shield.*defrost.*heater/i, CAP_COVER],
  // Mount + tub → Bracket (not Drum/Tub)
  [/mount.*tub/i, BRACKET],
  [/tub.*mount/i, BRACKET],
  // Connector + harness → Wire (not Hose)
  [/connector.*harness/i, WIRE],
  [/harness.*connector/i, WIRE],
  // PM/owner guide → Manual (not Rail)
  [/\bpm\s*guide/i, MANUAL],
  [/owner'?s?\s*guide/i, MANUAL],

  // ── Drum/Tub accessories → specific category, not Drum & Tub ──
  [/drum\s*(roller|glide|slide|belt|seal|felt|support|shaft|pad)/i, AXLE_ROLLER],
  [/(roller|glide|slide)\s*drum/i, AXLE_ROLLER],
  [/drum\s*bearing/i, BEARING],
  [/bearing\s*drum/i, BEARING],
  [/tub\s*bearing/i, BEARING],
  [/bearing\s*tub/i, BEARING],
  [/tub\s*seal\b/i, GASKET],
  [/seal\s*tub/i, GASKET],
  [/drum\s*(belt|seal|felt)/i, BELT],
  [/(belt|felt)\s*drum/i, BELT],

  // Tub cosmetic → trim/cover, not Drum & Tub
  [/tub\s*(cover|lid|cap|trim|strip|decoration|ring)/i, CAP_COVER],
  [/(cover|lid|cap|trim|strip|decoration|ring)\s*tub/i, CAP_COVER],

  // Tub connectors → specific category, not Drum & Tub
  [/tub\s*(hose|clamp|connector|spring|gasket|nut|bolt|screw|bracket|dampener)/i, HOSE],
  [/(hose|clamp|connector)\s*tub/i, HOSE],

  // ── Door specifics ([\s,-]* for WCI comma/hyphen format) ──
  [/door[\s,-]*(handle)/i, HANDLE],
  [/(handle)[\s,-]*door/i, HANDLE],
  [/door[\s,-]*(gasket|seal)/i, GASKET],
  [/(gasket|seal)[\s,-]*door/i, GASKET],
  [/door[\s,-]*(hinge|pivot)/i, HINGE],
  [/(hinge|pivot)[\s,-]*door/i, HINGE],
  [/door[\s,-]*(latch|lock|catch|strike)/i, LATCH],
  [/(latch|lock|catch|strike)[\s,-]*door/i, LATCH],
  [/door[\s,-]*(switch|interlock)/i, SWITCH],
  [/(switch|interlock)[\s,-]*door/i, SWITCH],
  [/door[\s,-]*(spring|closer|cam)/i, SPRING],
  [/(spring|closer)[\s,-]*door/i, SPRING],
  [/door[\s,-]*(glass|panel|liner)/i, PANEL],
  [/(glass|liner)[\s,-]*door/i, PANEL],
  [/door[\s-]*(shelf|bin|rack|basket)/i, RACK],
  [/(shelf|bin|rack|basket)[\s-]*door/i, RACK],

  // ── Ice specifics ──
  [/ice\s*(tray|bucket|bin|container|pan)/i, ICE_BIN],
  [/(tray|bucket|bin|container)\s*ice/i, ICE_BIN],
  [/ice\s*maker/i, ICE_MAKER],
  [/ice\s*machine/i, ICE_MAKER],
  [/ice\s*(mold|ejector|cutter|auger)/i, ICE_MAKER],
  [/ice\s*stripper/i, ICE_MAKER],
  [/stripper\s*im\b/i, ICE_MAKER],
  [/\bim\s*stripper/i, ICE_MAKER],
  [/shut[-\s]*off\s*arm/i, ICE_MAKER],
  [/arm\s*shut[-\s]*off/i, ICE_MAKER],
  [/\bcup\s*fill/i, ICE_MAKER],
  [/\bfill\s*cup/i, ICE_MAKER],
  [/\bim\s*crescent/i, ICE_MAKER],
  [/\bcrescent\s*im\b/i, ICE_MAKER],
  [/funnel\s*(fill|drain|ice)/i, ICE_MAKER],
  [/(fill|drain|ice)\s*funnel/i, ICE_MAKER],
  [/extension\s*funnel/i, ICE_MAKER],

  // ── Control board specifics ──
  [/main\s*control\s*board/i, CONTROL_BOARD],
  [/board\s*(main\s*)?control/i, CONTROL_BOARD],
  [/electronic\s*control\b/i, CONTROL_BOARD],
  [/power\s*(control\s*)?board/i, CONTROL_BOARD],
  [/control\s*board/i, CONTROL_BOARD],
  [/board\s*control/i, CONTROL_BOARD],

  // ── Gas specifics ──
  [/gas\s*valve/i, GAS_VALVE],
  [/valve\s*gas/i, GAS_VALVE],
  [/gas\s*burner/i, GAS_VALVE],
  [/burner\s*gas/i, GAS_VALVE],
  [/\bburner\s*(tube|cap|head|orifice|ignit)/i, GAS_VALVE],
  [/(tube|cap|head|orifice)\s*burner/i, GAS_VALVE],
  [/flame\s*spreader/i, GAS_VALVE],
  [/spreader\s*flame/i, GAS_VALVE],

  // ── Water valve → Valve, not filter ──
  [/water\s*valve/i, VALVE],
  [/valve\s*water/i, VALVE],
  [/inlet\s*valve/i, VALVE],
  [/valve\s*inlet/i, VALVE],

  // ── Defrost specifics ──
  [/defrost\s*(timer|control|board)/i, BOARD_TIMER],
  [/defrost\s*(thermostat|bi-?metal|limit)/i, DEFROST],
  [/defrost\s*(heater|element|calrod)/i, DEFROST],
  [/defrost\s*valve/i, VALVE],
  [/\bdefrost/i, DEFROST],

  // ── Spray/wash arm ──
  [/spray\s*arm/i, WASH_ARM],
  [/arm\s*spray/i, WASH_ARM],
  [/wash\s*arm/i, WASH_ARM],
  [/arm\s*wash/i, WASH_ARM],

  // ── Agitator specifics ──
  [/agitator\s*(dog|cog|cam|coupl)/i, COUPLING],
  [/(dog|cog|cam)\s*agitator/i, COUPLING],
  [/\bagitator/i, AGITATOR],
  [/\bauger/i, AGITATOR],

  // ── Drive belt → Belt, not motor ──
  [/drive\s*belt/i, BELT],
  [/belt\s*drive/i, BELT],

  // ── Drive motor / blower motor → Motor ──
  [/drive\s*motor/i, MOTOR],
  [/motor\s*drive/i, MOTOR],
  [/blower\s*motor/i, MOTOR],
  [/motor\s*blower/i, MOTOR],
  [/fan\s*motor/i, MOTOR],
  [/motor\s*fan/i, MOTOR],
  [/pump\s*motor/i, PUMP],
  [/motor\s*pump/i, PUMP],

  // ── Drip pan/bowl → Drawer & Drip Pan ──
  [/drip\s*(pan|bowl|tray)/i, DRAWER],
  [/(pan|bowl|tray)\s*drip/i, DRAWER],

  // ── Touch-up paint ──
  [/touch[\s-]*up\s*paint/i, PAINT],
  [/paint\s*touch/i, PAINT],

  // ── Wire harness → Power Cord ──
  [/wire\s*harness/i, POWER_CORD],
  [/harness\s*wire/i, POWER_CORD],
  [/power\s*cord/i, POWER_CORD],
  [/cord\s*power/i, POWER_CORD],
  [/line\s*cord/i, POWER_CORD],

  // ── Installation kit ──
  [/install(ation)?\s*kit/i, INSTALL_KIT],
  [/install(ation)?\s*set/i, INSTALL_KIT],
  [/hardware\s*kit/i, INSTALL_KIT],
  [/mounting\s*kit/i, INSTALL_KIT],
  [/\bwrench\b/i, INSTALL_KIT],
  [/\ballen\b/i, INSTALL_KIT],

  // ── Leveling leg → Leg ──
  [/leveling\s*(leg|foot)/i, LEG],
  [/\bleg\b.*\b(level|adjust)/i, LEG],

  // ── Cooktop specifics ──
  [/glass\s*top/i, COOKTOP],
  [/cooktop/i, COOKTOP],
  [/cook\s*top/i, COOKTOP],
  [/ceramic\s*top/i, COOKTOP],
  [/\brangetop\b/i, COOKTOP],
  [/\brange\s*top/i, COOKTOP],
  [/\bmaintop\b/i, COOKTOP],
  [/\bmain\s*top/i, COOKTOP],
  [/\bhob\b/i, COOKTOP],

  // ═══════════════════════════════════════════════════════════════════
  // SEALED SYSTEM — Compressor, Evaporator, Condenser
  // ═══════════════════════════════════════════════════════════════════

  [/\bcompressor\b/i, COMPRESSOR],
  [/refrigerant/i, COMPRESSOR],
  [/\br134a\b/i, COMPRESSOR],
  [/\bcapillary/i, COMPRESSOR],
  [/expansion\s*(valve|device)/i, COMPRESSOR],
  [/filter\s*drier/i, COMPRESSOR],
  [/drier\s*filter/i, COMPRESSOR],
  [/\bdrier\b/i, COMPRESSOR],
  [/heat\s*exchanger/i, COMPRESSOR],
  [/sealed\s*system/i, COMPRESSOR],
  [/suction\s*line/i, COMPRESSOR],
  [/discharge\s*line/i, COMPRESSOR],
  [/liquid\s*line/i, COMPRESSOR],
  [/metering\s*device/i, COMPRESSOR],
  [/\baccumulator\b/i, COMPRESSOR],
  [/high\s*side\s*asm/i, COMPRESSOR],
  [/low\s*side\s*asm/i, COMPRESSOR],

  [/\bevap(orator)?\b/i, EVAPORATOR],
  // Note: condenser fan already caught above → BLOWER_FAN
  // Bare condenser → Compressor & Sealed System (same sealed circuit)
  [/\bcond(enser)?\b/i, COMPRESSOR],

  // ═══════════════════════════════════════════════════════════════════
  // HEAVY / STRUCTURAL
  // ═══════════════════════════════════════════════════════════════════

  [/\btransmission/i, TRANSMISSION],
  [/gear\s*case/i, TRANSMISSION],
  [/\bgearcase\b/i, TRANSMISSION],
  [/\bclutch/i, TRANSMISSION],
  [/\bbrake\s*(pad|shoe|drum|band|assembly)/i, TRANSMISSION],
  [/\bbrake\b/i, TRANSMISSION],
  [/\bplanetary\b/i, TRANSMISSION],

  [/\binverter/i, INVERTER],

  [/(inner|outer)\s*tub/i, DRUM_TUB],
  [/tub\s*(inner|outer)/i, DRUM_TUB],
  [/\bdrum\b/i, DRUM_TUB],
  [/\btub\b/i, DRUM_TUB],
  [/spider\s*arm/i, DRUM_TUB],

  // ═══════════════════════════════════════════════════════════════════
  // MOTORS
  // ═══════════════════════════════════════════════════════════════════

  [/\bstator\b/i, MOTOR],
  [/\brotor\b/i, MOTOR],
  [/\bmotor\b/i, MOTOR],
  [/\barmature\b/i, MOTOR],
  [/\bactuator\b/i, MOTOR],

  // ═══════════════════════════════════════════════════════════════════
  // ELECTRONIC COMPONENTS
  // ═══════════════════════════════════════════════════════════════════

  // Boards / Timers (generic — specific control boards caught above)
  [/\bpcb\b/i, BOARD_TIMER],
  [/\bpwb\b/i, BOARD_TIMER],
  [/\btimer\b/i, BOARD_TIMER],
  [/\bboard\b/i, BOARD_TIMER],

  // Touchpad / Control Panel
  [/\btouchpad/i, TOUCHPAD],
  [/\bkeypad/i, TOUCHPAD],
  [/\boverlay\b/i, TOUCHPAD],
  [/\bmembrane\b/i, TOUCHPAD],
  [/control\s*panel/i, TOUCHPAD],
  [/panel\s*control/i, TOUCHPAD],

  // Diode / Magnetron / Resistor
  [/\bmagnetron/i, DIODE],
  [/\bdiode\b/i, DIODE],
  [/\bresistor/i, DIODE],
  [/\bvaristor/i, DIODE],
  [/\btriac\b/i, DIODE],
  [/\btransistor/i, DIODE],
  [/\bthyristor/i, DIODE],
  [/\brectifier/i, DIODE],
  [/\bfet\b/i, DIODE],
  [/\binductor/i, DIODE],
  [/\bresonator/i, DIODE],

  // Capacitor / Relay / Overload
  [/\bcapacitor/i, CAPACITOR],
  [/\brelay\b/i, CAPACITOR],
  [/\boverload/i, CAPACITOR],
  [/\bsuppressor/i, CAPACITOR],
  [/\bstart\s*device/i, CAPACITOR],
  [/\bptc\b/i, CAPACITOR],
  [/\bptcr\b/i, CAPACITOR],

  // Transformer
  [/\btransformer/i, TRANSFORMER],

  // Fuse / Thermal Fuse
  [/\bfuse\b/i, FUSE],
  [/\bthermal\s*(cutoff|cutout|limit)/i, FUSE],

  // Sensor / Thermistor
  [/\bthermistor/i, SENSOR],
  [/\bsensor\b/i, SENSOR],
  [/\bprobe\b/i, SENSOR],

  // Thermostat (temperature control)
  [/\bthermostat/i, THERMOSTAT],
  [/\bthermal/i, THERMOSTAT],

  // Switch
  [/\bswitch\b/i, SWITCH],
  [/\binterlock/i, SWITCH],
  [/\bmicro[\s-]?switch/i, SWITCH],
  [/\bpressure\s*switch/i, SWITCH],
  [/\bselector/i, SWITCH],

  // Starter
  [/\bstarter/i, STARTER],

  // Remote Control
  [/remote\s*control/i, REMOTE],
  [/\bremote\b/i, REMOTE],

  // ═══════════════════════════════════════════════════════════════════
  // HEATING / IGNITION / GAS
  // ═══════════════════════════════════════════════════════════════════

  [/\bignit(er|or|ion)?\b/i, IGNITER],
  [/glow\s*bar/i, IGNITER],
  [/spark\s*(module|electrode|plug)/i, IGNITER],
  [/\bspark\b/i, IGNITER],
  [/\belectrode\b/i, IGNITER],

  [/\belement\b/i, HEATING],
  [/\bcalrod\b/i, HEATING],
  [/\bheater\b/i, HEATING],
  [/heating\s*element/i, HEATING],
  [/bake\s*element/i, HEATING],
  [/broil\s*element/i, HEATING],
  [/broil\s*unit/i, HEATING],

  [/\bburner\b/i, GAS_VALVE],
  [/\bgrate\b/i, BURNER_GRATE],
  [/\bgriddle\b/i, BURNER_GRATE],

  // ═══════════════════════════════════════════════════════════════════
  // VALVES / PUMPS / PLUMBING
  // ═══════════════════════════════════════════════════════════════════

  [/\bvalve\b/i, VALVE],
  [/\bfloat\b/i, VALVE],
  [/\bsolenoid/i, VALVE],
  [/\bcheck\s*ball/i, VALVE],
  [/\bball[,\s]+check/i, VALVE],
  [/\bpressure\s*regulator/i, VALVE],
  [/\bregulator\s*pressure/i, VALVE],
  [/\bregulator\b/i, VALVE],

  [/\bpump\b/i, PUMP],
  [/\bsump\b/i, PUMP],

  [/\bhose\b/i, HOSE],
  [/\btube\b/i, HOSE],
  [/\btubing\b/i, HOSE],
  [/\bfitting\b/i, HOSE],
  [/\bmanifold\b/i, HOSE],
  [/\bnozzle\b/i, HOSE],
  [/\bsleeve\b/i, HOSE],
  [/\bthimble\b/i, HOSE],
  [/\badapters?\b/i, HOSE],
  [/\bcoupling\b/i, COUPLING],
  [/\bcoupler\b/i, COUPLING],
  [/\bsplutch/i, COUPLING],
  [/\bbar[-\s]*drive/i, COUPLING],
  [/\bdrive[-\s]*bar/i, COUPLING],
  [/\bpipe\b/i, HOSE],
  [/\btee\s*nut/i, FASTENER],
  [/\btee\b/i, HOSE],
  [/\belbow\b/i, HOSE],
  [/\boverflow/i, HOSE],
  [/\bconnector\b/i, HOSE],

  // ═══════════════════════════════════════════════════════════════════
  // GASKET / SEAL
  // ═══════════════════════════════════════════════════════════════════

  [/\bgasket\b/i, GASKET],
  [/\bseal\b/i, GASKET],
  [/\bsealing\b/i, GASKET],
  [/\bo-ring\b/i, GASKET],
  [/\boring\b/i, GASKET],
  [/wear\s*ring/i, GASKET],
  [/ring\s*wear/i, GASKET],
  [/compression\s*ring/i, GASKET],
  [/ring\s*compression/i, GASKET],

  // ═══════════════════════════════════════════════════════════════════
  // BELT
  // ═══════════════════════════════════════════════════════════════════

  [/\bbelt\b/i, BELT],

  // ═══════════════════════════════════════════════════════════════════
  // FILTER
  // ═══════════════════════════════════════════════════════════════════

  [/water\s*filter/i, FILTER],
  [/filter\s*water/i, FILTER],
  [/\bfilter\b/i, FILTER],
  [/\bstrainer\b/i, FILTER],

  // ═══════════════════════════════════════════════════════════════════
  // LIGHTING
  // ═══════════════════════════════════════════════════════════════════

  [/(light\s*)?bulb\b/i, LIGHT],
  [/\bled\b.*light/i, LIGHT],
  [/light\s*led/i, LIGHT],
  [/\bled[,\s]*chip/i, LIGHT],
  [/\blamp\b/i, LIGHT],
  [/\blight\b/i, LIGHT],
  [/\blens\b/i, LIGHT],
  [/\bsocket\b.*light/i, LIGHT],
  [/light\b.*\bsocket\b/i, LIGHT],

  // ═══════════════════════════════════════════════════════════════════
  // SHELVING / STORAGE / RACKS
  // ═══════════════════════════════════════════════════════════════════

  [/\bshelf\b/i, SHELF],
  [/\bshelves\b/i, SHELF],
  [/shelf\s*support/i, SHELF],
  [/\brack\b/i, RACK],
  [/\bbasket\b/i, RACK],
  [/\bdishrack\b/i, RACK],
  [/\bcrisper\b/i, DRAWER],
  [/\bdrawer\b/i, DRAWER],
  [/\btrough\b/i, DRAWER],
  [/\bbowl\b/i, DRAWER],
  [/\btray\b/i, RACK],

  // ═══════════════════════════════════════════════════════════════════
  // KNOB / HANDLE / BUTTON
  // ═══════════════════════════════════════════════════════════════════

  [/\bknob\b/i, KNOB],
  [/\bdial\b/i, KNOB],
  [/\bbuttons?\b/i, KNOB],
  [/\bpush\s*button/i, KNOB],
  [/\bhandle\b/i, HANDLE],
  [/\bbail\b/i, HANDLE],

  // ═══════════════════════════════════════════════════════════════════
  // DOOR / HINGE
  // ═══════════════════════════════════════════════════════════════════

  [/\bdoor\b/i, DOOR],
  [/\bhinge\b/i, HINGE],

  // ═══════════════════════════════════════════════════════════════════
  // LATCH / LOCK
  // ═══════════════════════════════════════════════════════════════════

  [/\blatch\b/i, LATCH],
  [/\block\b/i, LATCH],
  [/\bcatch\b/i, LATCH],
  [/\bstrike\b/i, LATCH],
  [/\bdetent\b/i, LATCH],

  // ═══════════════════════════════════════════════════════════════════
  // DISPENSER
  // ═══════════════════════════════════════════════════════════════════

  [/\bdispenser/i, DISPENSER],
  [/\brinse\s*aid/i, DISPENSER],

  // ═══════════════════════════════════════════════════════════════════
  // TRIM / COSMETIC / PANEL
  // ═══════════════════════════════════════════════════════════════════

  [/\btrims?\b/i, TRIM],
  [/\bescutcheon/i, PANEL],
  [/\bfascia\b/i, PANEL],
  [/\bbulkhead\b/i, PANEL],
  [/\bpanel\b/i, PANEL],
  [/\bnameplate/i, TRIM],
  [/\bbadge\b/i, TRIM],
  [/\bdecoration/i, TRIM],

  // ═══════════════════════════════════════════════════════════════════
  // CAP / COVER / SHIELD / GUARD
  // ═══════════════════════════════════════════════════════════════════

  [/\bcover\b/i, CAP_COVER],
  [/\blid\b/i, CAP_COVER],
  [/\bcap\b(?!acitor)/i, CAP_COVER],
  [/\bshield\b/i, CAP_COVER],
  [/\bguard\b/i, CAP_COVER],
  [/\bplug\b/i, CAP_COVER],
  [/\bendcap\b/i, CAP_COVER],

  // ═══════════════════════════════════════════════════════════════════
  // GRILLE / KICKPLATE
  // ═══════════════════════════════════════════════════════════════════

  [/\bgrille\b/i, GRILLE],
  [/\bgrill\b/i, GRILLE],
  [/toe\s*kick/i, GRILLE],
  [/kick\s*plate/i, GRILLE],
  [/toe\s*plate/i, GRILLE],
  [/\btoeplate/i, GRILLE],

  // ═══════════════════════════════════════════════════════════════════
  // GLASS
  // ═══════════════════════════════════════════════════════════════════

  [/\bglass\b/i, PANEL],
  [/\bfloor\b/i, PANEL],

  // ═══════════════════════════════════════════════════════════════════
  // BRACKET / FLANGE
  // ═══════════════════════════════════════════════════════════════════

  [/\bbracket\b/i, BRACKET],
  [/\bflange\b/i, BRACKET],
  [/\bmount\w*\b/i, BRACKET],
  [/\bgusset\b/i, BRACKET],
  [/\banti[-\s]*tip/i, BRACKET],
  [/\brotation\s*stop/i, BRACKET],

  // ═══════════════════════════════════════════════════════════════════
  // FASTENER / HARDWARE
  // ═══════════════════════════════════════════════════════════════════

  [/\bstandoff\b/i, FASTENER],
  [/\bfastener\b/i, FASTENER],
  [/\bscrews?\b/i, FASTENER],
  [/\bscr\b/i, FASTENER],
  [/\bbolt\b/i, FASTENER],
  [/\bnut\b/i, FASTENER],
  [/\bwasher\b/i, FASTENER],
  [/\brivets?\b/i, FASTENER],
  [/\bstud\b/i, FASTENER],
  [/\broll\s*pin/i, FASTENER],
  [/\bpin\b/i, FASTENER],
  [/\bspeednut/i, FASTENER],
  [/\bspeed\s*nut/i, FASTENER],
  [/\be[-\s]ring\b/i, FASTENER],
  [/#\d+x\d/i, FASTENER],

  // ═══════════════════════════════════════════════════════════════════
  // CLIP / CLAMP
  // ═══════════════════════════════════════════════════════════════════

  [/\bclip\b/i, CLIP],
  [/\bclamp\b/i, CLIP],
  [/\bretainer\b/i, CLIP],
  [/\bretaining\s*ring/i, CLIP],
  [/\bring\s*retaining/i, CLIP],

  // ═══════════════════════════════════════════════════════════════════
  // AXLE / ROLLER / WHEEL / PULLEY
  // ═══════════════════════════════════════════════════════════════════

  [/\brollers?\b/i, AXLE_ROLLER],
  [/\bwheel\b/i, AXLE_ROLLER],
  [/\baxle\b/i, AXLE_ROLLER],
  [/\bpulley\b/i, AXLE_ROLLER],
  [/\bcaster\b/i, AXLE_ROLLER],
  [/\bglide\b/i, AXLE_ROLLER],

  // ═══════════════════════════════════════════════════════════════════
  // SPRING / SUSPENSION
  // ═══════════════════════════════════════════════════════════════════

  [/\bspring\b/i, SPRING],
  [/\bshock\b/i, SPRING],
  [/\bdamper\b/i, SPRING],
  [/\bsuspension/i, SPRING],
  [/\bsnubber/i, SPRING],

  // ═══════════════════════════════════════════════════════════════════
  // BEARING
  // ═══════════════════════════════════════════════════════════════════

  [/\bbearing\b/i, BEARING],

  // ═══════════════════════════════════════════════════════════════════
  // DUCT / VENTING
  // ═══════════════════════════════════════════════════════════════════

  [/\bduct\b/i, DUCT],
  [/\bvent\b/i, DUCT],
  [/\bventing/i, DUCT],
  [/\bexhaust\b/i, DUCT],
  [/\bplenum\b/i, DUCT],
  [/\bblower\b/i, BLOWER_FAN],
  [/\bfan\b/i, BLOWER_FAN],
  [/\bimpeller\b/i, BLOWER_FAN],
  [/\bblade\b/i, BLOWER_FAN],

  // ═══════════════════════════════════════════════════════════════════
  // WIRE / ELECTRICAL
  // ═══════════════════════════════════════════════════════════════════

  [/\bwire\b/i, WIRE],
  [/\bharness\b/i, WIRE],
  [/\bcord\b/i, POWER_CORD],
  [/\breceptacle/i, WIRE],
  [/\brecepacle/i, WIRE],
  [/\bterminal\b/i, WIRE],
  [/\bsocket\b/i, WIRE],

  // ═══════════════════════════════════════════════════════════════════
  // INSULATION / PADDING
  // ═══════════════════════════════════════════════════════════════════

  [/\binsulation/i, INSULATION],
  [/\binsulat(or|e|ing)\b/i, INSULATION],
  [/\binsul\b/i, INSULATION],
  [/\bfoam\b/i, INSULATION],
  [/\bfoil\b/i, INSULATION],
  [/\breflector\b/i, INSULATION],

  // ═══════════════════════════════════════════════════════════════════
  // ADHESIVE / SEALANT
  // ═══════════════════════════════════════════════════════════════════

  [/\badhesive/i, ADHESIVE],
  [/\bsealant/i, ADHESIVE],
  [/\bglue\b/i, ADHESIVE],
  [/\btape\b/i, ADHESIVE],
  [/\bcaulk/i, ADHESIVE],
  [/\bepoxy/i, ADHESIVE],

  // ═══════════════════════════════════════════════════════════════════
  // CLEANER / DEODORIZER
  // ═══════════════════════════════════════════════════════════════════

  [/\bcleaner\b/i, CLEANER],
  [/\bdeodorizer/i, CLEANER],
  [/\bdescaler/i, CLEANER],

  // ═══════════════════════════════════════════════════════════════════
  // LUBRICANT
  // ═══════════════════════════════════════════════════════════════════

  [/\blubricant/i, LUBRICANT],
  [/\bgrease\b/i, LUBRICANT],

  // ═══════════════════════════════════════════════════════════════════
  // PAINT / TOUCH-UP
  // ═══════════════════════════════════════════════════════════════════

  [/\bpaint\b/i, PAINT],

  // ═══════════════════════════════════════════════════════════════════
  // MANUALS / LITERATURE
  // ═══════════════════════════════════════════════════════════════════

  [/\bmanual\b/i, MANUAL],
  [/\bliterature/i, MANUAL],
  [/\binstructions?\b/i, MANUAL],
  [/(care|user|owner'?s?|installation|use\s*&?\s*care)\s*guide/i, MANUAL],
  [/\bparts\s*catalog/i, MANUAL],
  [/\bcatalog\b/i, MANUAL],

  // ═══════════════════════════════════════════════════════════════════
  // LEG / LEVELER / CASTER
  // ═══════════════════════════════════════════════════════════════════

  [/\bleg\b/i, LEG],
  [/\bfoot\b/i, LEG],
  [/\bleveler/i, LEG],
  [/\bcaster\b/i, LEG],
  [/\bpedestal\b/i, LEG],

  // ═══════════════════════════════════════════════════════════════════
  // LEVER
  // ═══════════════════════════════════════════════════════════════════

  [/\blever\b/i, LEVER],

  // ═══════════════════════════════════════════════════════════════════
  // DEFLECTOR / CHUTE
  // ═══════════════════════════════════════════════════════════════════

  [/\bdeflector/i, DEFLECTOR],
  [/\bchute\b/i, DEFLECTOR],
  [/\bbaffle\b/i, DEFLECTOR],
  [/\bseparator\b/i, DEFLECTOR],
  [/\bdiverter\b/i, DEFLECTOR],

  // ═══════════════════════════════════════════════════════════════════
  // CHASSIS / CABINET
  // ═══════════════════════════════════════════════════════════════════

  [/\bcabinet\b/i, CHASSIS],
  [/\bchassis\b/i, CHASSIS],
  [/\bframe\b/i, CHASSIS],
  [/\bhousing\b/i, CHASSIS],
  [/\bbase\b/i, CHASSIS],

  // ═══════════════════════════════════════════════════════════════════
  // RESERVOIR / TANK / CONTAINER
  // ═══════════════════════════════════════════════════════════════════

  [/\breservoir/i, RESERVOIR],
  [/\btank\b/i, RESERVOIR],
  [/\bcontainer\b/i, RESERVOIR],
  [/\bbin\b/i, DRAWER],
  [/\bbucket\b/i, ICE_BIN],

  // ═══════════════════════════════════════════════════════════════════
  // RAIL
  // ═══════════════════════════════════════════════════════════════════

  [/\brail\b/i, RAIL],
  [/\btrack\b/i, RAIL],
  [/\bslide\b/i, RAIL],
  [/\bglider\b/i, RAIL],
  [/\bguide\b/i, RAIL],

  // ═══════════════════════════════════════════════════════════════════
  // MISC SMALL PARTS
  // ═══════════════════════════════════════════════════════════════════

  [/\bbushing\b/i, AXLE_ROLLER],
  [/\bspacer\b/i, FASTENER],
  [/\bgrommet\b/i, FASTENER],
  [/\bpad\b/i, CAP_COVER],
  [/\bcushion\b/i, CAP_COVER],
  [/\bbumper\b/i, CAP_COVER],
  [/\bstopper\b/i, CAP_COVER],
  [/\bstrip\b/i, GASKET],
  [/\bsupport\b/i, BRACKET],
  [/\bhanger\b/i, BRACKET],
  [/\bplate\b/i, PANEL],
  [/\bmagnet\b/i, LATCH],
  [/\bslider\b/i, RAIL],
  [/\bcam\b/i, COUPLING],
  [/\bcontrol\b/i, CONTROL_BOARD],

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL PATTERNS (Round 1 unclassified fixes)
  // ═══════════════════════════════════════════════════════════════════

  [/\bcrank\b/i, COUPLING],
  [/\bstrap\b/i, WIRE],
  [/\bconsole\b/i, TOUCHPAD],
  [/\bmodule\b/i, CONTROL_BOARD],
  [/\bterminals?\b/i, WIRE],
  [/\bholder\b/i, BRACKET],
  [/\bshaft\b/i, AXLE_ROLLER],
  [/\bkey\s*panel/i, TOUCHPAD],
  [/\bkeypanel/i, TOUCHPAD],
  [/\bgear\b/i, COUPLING],
  [/\bshim\b/i, FASTENER],
  [/\bbroiler\s*pan/i, RACK],
  [/\bdish\b/i, RACK],
  [/\bshroud\b/i, BLOWER_FAN],
  [/\bgrid\b/i, RACK],
  [/\brange\s*back/i, PANEL],
  [/\bpan\b/i, DRAWER],
  [/\blouver\b/i, DEFLECTOR],
  [/\bbrace\b/i, BRACKET],
  [/\bspray\b/i, WASH_ARM],
  [/\bpower\s*supply/i, CONTROL_BOARD],
  [/\bwrapper\b/i, CHASSIS],
  [/\bbacksplash/i, PANEL],
  [/\bferrule\b/i, HOSE],
  [/\bhookbolt/i, FASTENER],
  [/\bdiffus[oe]r/i, DUCT],
  [/\bchain\s*drive/i, COUPLING],
  [/\bjack\b/i, WIRE],
  [/\bic\b,/i, DIODE],
  [/\brake\b/i, ICE_MAKER],
  [/use\s*&?\s*care/i, MANUAL],
  [/\binf\.?\s*(ht\.?|heat)\s*sw/i, SWITCH],
  [/\bmtr\b/i, MOTOR],
  [/\borifice\b/i, GAS_VALVE],
  [/\bcable\b/i, POWER_CORD],
  [/\bbackguard/i, PANEL],
  [/\bbrush\b/i, BLOWER_FAN],
  [/\bcomplement\b/i, PANEL],
  [/\bconv(ersion)?\s*kit/i, INSTALL_KIT],
  [/\blogo\b/i, TRIM],
  [/\bemblem\b/i, TRIM],
  [/repair\s*parts\s*list/i, MANUAL],
  [/\bscroll\s*case/i, BLOWER_FAN],
  [/\bmixer\b/i, DEFLECTOR],
  [/\bconduit\b/i, HOSE],
  [/\bcoil\b/i, HEATING],
  [/\bnipple\b/i, HOSE],
  [/\bliner\b/i, PANEL],
  [/\bunit\s*broil/i, HEATING],
  [/\bhub\b/i, AXLE_ROLLER],
  [/\bsplice\b/i, WIRE],
  [/\bfirmware\b/i, CONTROL_BOARD],
  [/\bs\/w[,\s]/i, CONTROL_BOARD],
  [/\bmainboard\b/i, CONTROL_BOARD],
  [/\bbreaker\b/i, TRIM],
  [/\bfunnel\b/i, HOSE],
  [/\bdrain\b/i, HOSE],
  [/\bmullion\b/i, GASKET],
  [/\bdisplay\b/i, TOUCHPAD],
  [/\bcontroller\b/i, CONTROL_BOARD],
  [/\bring\b/i, CLIP],
  [/\btco\b/i, FUSE],
  [/\bcurb\b/i, BRACKET],
  [/\bseal\b/i, GASKET],

  // ═══════════════════════════════════════════════════════════════════
  // LABEL / DECAL → Trim
  // ═══════════════════════════════════════════════════════════════════

  [/\blabel\b/i, TRIM],
  [/\bdecal\b/i, TRIM],
  [/\bsticker\b/i, TRIM],

  // ═══════════════════════════════════════════════════════════════════
  // Round 4 — 1000-sample unclassified fixes
  // ═══════════════════════════════════════════════════════════════════

  // Abbreviations
  [/\bbrkt\b/i, BRACKET],
  [/\bbrkts\b/i, BRACKET],
  [/\belment\b/i, HEATING],  // misspelling of "element"
  [/\bsheild\b/i, CAP_COVER],  // misspelling of "shield"
  [/\bo\.?l\.?p\.?\b/i, CAPACITOR],  // overload protector

  // Parts that need specific patterns
  [/\bcase\b/i, CHASSIS],
  [/\bcavity\b/i, CHASSIS],
  [/\bturntable\b/i, AXLE_ROLLER],
  [/\bspout\b/i, DISPENSER],
  [/\bmolding\b/i, TRIM],
  [/\blining\b/i, PANEL],
  [/\babsorber\b/i, SPRING],
  [/\bheat\s*sink/i, DIODE],
  [/\bend\s*caps?\b/i, CAP_COVER],
  [/\bpilot\b/i, GAS_VALVE],
  [/\bscroll\b/i, BLOWER_FAN],
  [/\bfaceplate\b/i, PANEL],
  [/\bfiller\b/i, PANEL],
  [/\bgauge\b/i, SENSOR],
  [/\bservice\s*sheet/i, MANUAL],
  [/\bsplasher\b/i, DEFLECTOR],
  [/\bextrusion\b/i, RAIL],
  [/\bchannel\b/i, RAIL],
  [/\bepaulet\b/i, TRIM],
  [/\barm\b/i, LEVER],
  [/\btop\b/i, PANEL],
  [/\bbush\b/i, AXLE_ROLLER],
  [/\bbezel\b/i, TRIM],
  [/\bbody\b/i, CHASSIS],
  [/\bclock\b/i, BOARD_TIMER],
  [/\bflue\b/i, DUCT],
  [/\bkeyboard\b/i, TOUCHPAD],
  [/\bkit\b/i, INSTALL_KIT],
  [/\blocknut/i, FASTENER],
  [/\bpeg\b/i, FASTENER],
  [/\bpulsator\b/i, AGITATOR],
  [/\bremocon\b/i, REMOTE],
  [/\bsealer\b/i, ADHESIVE],
  [/\bshutter\b/i, DEFLECTOR],
  [/\bstandpipe\b/i, HOSE],
  [/\btoeboard\b/i, GRILLE],
  [/\btransition\b/i, DUCT],
  [/\bvane\b/i, DEFLECTOR],
  [/\bwrap\b/i, CHASSIS],
  [/\bmanuals\b/i, MANUAL],
  [/\bmnl\b/i, MANUAL],
  [/\bcook\s*book/i, MANUAL],
  [/\blockwasher/i, FASTENER],
  [/\beyelet\b/i, FASTENER],
  [/\blokring\b/i, HOSE],
  [/\bcompresser\b/i, COMPRESSOR],
  [/\btopcover\b/i, CAP_COVER],
  [/\bpower\s*shower/i, WASH_ARM],
  [/\bsteam\s*generator/i, HEATING],
  [/\bfelt\b/i, GASKET],

  // ═══════════════════════════════════════════════════════════════════
  // Round 5 — 77K unclassified analysis (2026-03-13)
  // ═══════════════════════════════════════════════════════════════════

  // ── Bosch-specific patterns ──
  [/\bgas\s*tap\b/i, GAS_VALVE],
  [/\bworktop\b/i, COOKTOP],
  [/\brepair[\s-]*set\b/i, INSTALL_KIT],
  [/\bconnection\s*piece/i, HOSE],
  [/\bseating\b/i, BRACKET],
  [/\baxial\b/i, AXLE_ROLLER],
  [/\bflap\b/i, DEFLECTOR],
  [/\bprofile\s*stripe/i, GASKET],
  [/\bprofile\b/i, TRIM],
  [/\bfixture\b/i, BRACKET],

  // ── LG-specific patterns ──
  [/\bbpr\b.*assembly/i, CONTROL_BOARD],  // BPR = main board assembly
  [/\bmain\s*total\s*assembly/i, CONTROL_BOARD],
  [/\bpackage\s*assembly/i, INSTALL_KIT],
  [/\bparts\s*assembly/i, INSTALL_KIT],
  [/\bservice\s*parts?\s*assembly/i, INSTALL_KIT],
  [/\bspeaker\b/i, DIODE],  // speaker/buzzer → electronics
  [/\bbuzzer\b/i, DIODE],
  [/\bsmps\b/i, CONTROL_BOARD],  // switched-mode power supply
  [/\bpba\b/i, CONTROL_BOARD],  // printed board assembly
  [/\bmicom\b/i, CONTROL_BOARD],  // microcomputer
  [/\bcessory\s*assembly/i, INSTALL_KIT],  // truncated "accessory"
  [/\baccessory\s*assembly/i, INSTALL_KIT],
  [/\baccessory\b/i, INSTALL_KIT],
  [/\ba\/s\s*box/i, INSTALL_KIT],  // after-service box

  // ── GE-specific patterns ──
  [/\bsubassembly\s*to\b/i, INSTALL_KIT],  // "Subassembly to WD35X194"
  [/\bsmartboard\b/i, CONTROL_BOARD],
  [/\bcustomer\s*interface/i, TOUCHPAD],
  [/\bgraphic\b.*\binsert/i, TRIM],
  [/\bguardette\b/i, CAP_COVER],
  [/\bcore\s*(charge|debit)/i, COMPRESSOR],  // sealed system core charges

  // ── WCI-specific patterns ──
  [/\bservice\s*data\s*sheet/i, MANUAL],
  [/\bwiring\s*diagram/i, MANUAL],
  [/\btech\s*data\s*sheet/i, MANUAL],
  [/\bservice\s*tech\s*sheet/i, MANUAL],
  [/\bparts\s*list\b/i, MANUAL],
  [/\btechnical\s*card/i, MANUAL],

  // ── Samsung-specific patterns ──
  [/\bpartition\b/i, DEFLECTOR],
  [/\bpacking\s*parts/i, INSTALL_KIT],
  [/\bbullnose\b/i, PANEL],

  // ── Cross-brand common misses ──
  [/\bhood\b/i, DUCT],  // range hood
  [/\bscreen\b.*\blint\b/i, FILTER],
  [/\blint\b.*\bscreen\b/i, FILTER],
  [/\bscreen\b/i, FILTER],
  [/\bwindow\s*screen/i, FILTER],
  [/\bair\s*scoop\b/i, DUCT],
  [/\bair\s*tower\b/i, DUCT],
  [/\bchimney\b/i, DUCT],
  [/\btine\s*row\b/i, RACK],  // dishwasher rack tines
  [/\btine\b/i, RACK],
  [/\bdivider\b/i, RACK],
  [/\binsert\b/i, RACK],
  [/\brod\b/i, AXLE_ROLLER],
  [/\bcolumn\b/i, BRACKET],
  [/\bcasing\b/i, CHASSIS],
  [/\bprotector\b/i, CAP_COVER],
  [/\bextension\b/i, HOSE],
  [/\bbag\b/i, INSTALL_KIT],
  [/\bhardware\b/i, INSTALL_KIT],
  [/\bweight\b/i, BRACKET],
  [/\bpacking\b/i, INSTALL_KIT],
  [/\bdecor\b/i, TRIM],
  [/\btile\b/i, TRIM],
  [/\bcard\b/i, CONTROL_BOARD],  // circuit card
  [/\bcarrier\b/i, BRACKET],
  [/\bflipper\b/i, DEFLECTOR],
  [/\bcrystal\b/i, DIODE],
  [/\bprimer\b/i, PAINT],
  [/\bsheet\b/i, PANEL],
  [/\bbox\b/i, CHASSIS],
  [/\bblock\b/i, BRACKET],
  [/\bfront\b/i, PANEL],
  [/\bbottom\b/i, PANEL],
  [/\bback\b/i, PANEL],
  [/\bjar\b/i, RESERVOIR],
  [/\bbeaker\b/i, RESERVOIR],
  [/\bkey\b/i, FASTENER],
  [/\bconnection\b/i, HOSE],
  [/\bmicrostator\b/i, MOTOR],
  [/\bmicrocptr\b/i, CONTROL_BOARD],  // microcomputer abbreviation
  [/\bshipping\s*bar/i, INSTALL_KIT],
  [/\bblock[\s-]*shipping/i, INSTALL_KIT],
  [/\bindicator\b/i, LIGHT],
  [/\bic\b/i, CONTROL_BOARD],  // integrated circuit
  [/\blink\b/i, COUPLING],
  [/\badjusting\s*device/i, LEG],
  [/\boven\s*side/i, PANEL],
  [/\bside\s*oven/i, PANEL],

  // ── Round 5b — remaining 41K analysis ──
  [/\bled\s*assembly/i, LIGHT],
  [/\bwindow\b/i, PANEL],
  [/\bcollar\b/i, CLIP],
  [/\bsoundproofing/i, INSULATION],
  [/\bstop\b/i, LATCH],
  [/\bbarrier\b/i, INSULATION],
  [/\bheating\s*zone/i, HEATING],
  [/\bbellows\b/i, GASKET],
  [/\bdistributor\b/i, DISPENSER],
  [/\bjet\b/i, HOSE],  // spray jet/nozzle
  [/\bbrochure\b/i, MANUAL],
  [/\bisolator\b/i, SPRING],  // vibration isolator
  [/\bchopper\b/i, BLOWER_FAN],
  [/\brunner\b/i, RAIL],
  [/\bladder\b/i, RACK],
  [/\bvacuum\s*break/i, VALVE],
  [/\bbreak\b.*\bvacuum/i, VALVE],
  [/\bcup\b.*\binlet/i, VALVE],
  [/\bwater\s*inlet/i, VALVE],
  [/\binlet\b/i, VALVE],
  [/\boutdoor\b/i, PANEL],
  [/\bsmall\s*appliance\b/i, INSTALL_KIT],  // Bosch "Small Appliance Spare Part"
  [/\blaundry\s*spare/i, INSTALL_KIT],
  [/\bspare\s*part/i, INSTALL_KIT],
  [/\bpack\b/i, INSTALL_KIT],
  [/\bassembly\b/i, INSTALL_KIT],  // bare "Assembly" — generic parts kit
]

/**
 * Classify a part type from a part description string.
 *
 * Pure function — no DB dependency, safe to call client-side or server-side.
 * Returns { slug, name } or null if unclassifiable.
 */
export function getPartType(
  description: string | null | undefined,
): PartTypeResult | null {
  if (!description) return null

  for (const [pattern, result] of RULES) {
    if (pattern.test(description)) {
      return result
    }
  }

  return null
}
