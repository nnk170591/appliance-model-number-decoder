# Complete Whirlpool Model Number Breakdown (With Examples)

How Whirlpool Corporation encodes brand, product type, configuration, year, and color into appliance model numbers.

Covers: Whirlpool, KitchenAid, Maytag, Amana, Jenn-Air, Estate, Roper, Crosley, IKEA, and Gladiator.

## Structure: `[Brand][Platform][Config][Series][Features][Year][Color]`

## Position 1 — Brand
| Code | Brand |
|------|-------|
| W | Whirlpool |
| K | KitchenAid |
| M | Maytag |
| A | Amana |
| J | Jenn-Air |
| I | IKEA |
| T | Estate |
| R | Roper |
| C | Crosley |
| GA | Gladiator |

## Position 2 — Platform (Product Type)
Consistent across brands:
| Code | Product Type |
|------|-------------|
| R | Freestanding Refrigerator |
| B | Built-In Refrigerator |
| U | Specialty/Undercounter Refrigeration |
| Z | Freezer |
| D | Dishwasher |
| F | Freestanding Range (also Front-Load Washer for Maytag) |
| C | Cooktop |
| O | Wall Oven |
| E | Dryer / Slide-In Range |
| G | Gas Dryer / Gas Range |
| M | Microwave |
| A | Ventilation |
| T | Top-Load Washer |
| V | Ventilation / Laundry Tower |
| H | Pedestal / Heat Pump Dryer |
| S | Side-by-Side Refrigerator (older) |

## Position 3 — Configuration
### Refrigerators (xRx)
| Code | Config |
|------|--------|
| F | French Door Bottom Mount (3-door) |
| M | 4-Door French Door |
| V | 5-Door French Door |
| X | Quad-Door / 4-Door |
| S | Side-by-Side |
| Q | Quad-Door |
| T | Top Mount |
| B | Bottom Mount |
| R | All Refrigerator (column) |

### Dishwashers (xDx)
| Code | Config |
|------|--------|
| T | Top Control (towel bar) |
| P | Pocket Handle |
| F | Front Control |

### Ranges (xFx / xEx)
| Code | Config |
|------|--------|
| G | Gas |
| E | Electric Radiant |
| I | Induction |
| C | Coil (electric) |
| D | Dual Fuel |

### Wall Ovens (xOx)
| Code | Config |
|------|--------|
| S | Single Oven |
| D | Double Oven |
| C | Combo (Microwave + Oven) |
| E | Electric Combo |

### Microwaves (xMx)
| Code | Config |
|------|--------|
| H | Microwave Hood Combination |
| L | Low Profile Hood |
| M | Flush Mount |
| C | Countertop |
| B | Built-In |
| T | Built-In (with trim) |

### Washers (xTx / xFx)
| Code | Config |
|------|--------|
| W | Washer (top-load WTW, front-load WFW) |

### Dryers (xEx / xGx)
| Code | Config |
|------|--------|
| D | Standard Dryer |
| T | Stacked/Tower |

### Cooktops (xCx)
| Code | Config |
|------|--------|
| G | Gas |
| E | Electric |
| I | Induction |

### Freezers (xZx)
| Code | Config |
|------|--------|
| F | Vertical/Upright |
| C | Chest |

## Year Code (typically position 7-8 in newer models)
| Code | Year |
|------|------|
| B | 2013 |
| D | 2014 |
| E | 2015 |
| F | 2016 |
| G | 2017 |
| H | 2018 |
| J | 2019 |
| K | 2020 |
| L | 2021 |
| M | 2022 |
| P | 2023 |
| R | 2024 |

## Color Codes (typically last 1-2 chars)
| Code | Color |
|------|-------|
| B | Black |
| S/SS | Stainless Steel |
| W/WH | White |
| V | Fingerprint Resistant Black Stainless |
| Z | Fingerprint Resistant Stainless |
| PA | Panel Ready |
| BL | Black (KitchenAid) |
| BS | Black Stainless (KitchenAid) |

## Examples

| Model | Brand | Type | Config | Year | Color |
|-------|-------|------|--------|------|-------|
| WRF555SDFZ | Whirlpool | Refrigerator | French Door | 2016 | FP Resistant Stainless |
| KDT780SSSS | KitchenAid | Dishwasher | — | — | Stainless |
| MED5500FW0 | Maytag | Dryer | — | 2016 | — |
| WTW5000DW1 | Whirlpool | Washer | — | 2014 | — |
| WOS92EC0HZ | Whirlpool | Wall Oven | Microwave Combo | 2018 | FP Resistant Stainless |

## Appliance Type Detection from Model Number
Given a WPL model starting with a known brand letter, position 2 reliably identifies appliance type:
- `W[RBUS]` = Refrigeration, `WZ` = Freezer
- `WD` = Dishwasher
- `W[FE]` = Range OR Laundry (check pos3: G/E/I/C/D = cooking, W = washer, D = dryer)
- `W[TF]W` = Washer, `W[EG]D` = Dryer
- `WO` = Wall Oven, `WM` = Microwave, `WC` = Cooktop
- `WV`/`WA` = Ventilation

---

For a live tool built on this data, visit [oemparthub.com](https://oemparthub.com).
