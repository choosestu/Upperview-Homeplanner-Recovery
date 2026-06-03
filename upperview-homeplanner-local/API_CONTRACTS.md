# API Contracts

The contracts below are inferred from the frontend parser and model constructors. They are intended as a rebuild spec, not proof of the exact historical database.

Field-level support status for the generated compatibility layer is tracked in `LEGACY_SCHEMA_COVERAGE.md`.

Late-flow favorites, lead, email, CRM, brochure, and user/session mock behavior is tracked in `LATE_FLOW_MOCK_ENDPOINTS.md`.

## XML Conventions

The frontend uses jQuery XML traversal and `attr(...)`. Missing string attributes often become `undefined`; missing numeric attributes often become `NaN`, so a rebuilt backend should provide all fields listed as required.

## `getclientdata.php`

Returns:

```xml
<data>
  <designers contentStorage="cloudinary" pageOrder="0,1,2,3,12,5,6,8,9" bgColor="E5F0B8" />
  <client id="1" name="UpperView" logo="" altLogo="" dir="upperview" website="" designApp="1" phone="" email="" fbPostUrl="" />
</data>
```

Key behavior:

- `pageOrder` controls the navigation steps. The old `PLAN` page (`4`) asserts as deprecated in this bundle; `PLAN_FP` (`12`) is used instead.
- `dir` drives asset paths such as `app/upperview/images/`.
- `<designers>` can contain CRM, display, brochure, and label flags.

## `getcolorlib.php`

Returns XML:

```xml
<data>
  <vendors><vendor id="1" name="Vendor"/></vendors>
  <colors><color id="1" vendorId="1" ident="white" name="White" hex="FFFFFF"/></colors>
</data>
```

Colors are referenced by schemes and palettes.

## `getsummary.php`

Returns JSON:

```json
{
  "maxPhpInt": 2147483647,
  "filterCats": [],
  "regiondata": [
    {
      "id": 1,
      "name": "Grandview Trail",
      "state": "ON",
      "numInv": 0,
      "locations": [
        {
          "id": 1,
          "name": "Oshawa",
          "metro": "Grandview Trail",
          "state": "ON",
          "city": "Oshawa",
          "region": "Grandview Trail",
          "nbrhoods": [
            { "id": 1, "name": "Grandview Trail", "metro": "Grandview Trail", "state": "ON", "city": "Oshawa", "pricing": 1 }
          ]
        }
      ]
    }
  ]
}
```

The app uses this response to find the target neighborhood by name before loading plans.

## `getnbrhoodsdata.php`

Returns XML neighborhood detail:

```xml
<data>
  <nbrhood id="1" name="Grandview Trail" def="1" salesapp="1" active="1" pricing="1" city="Oshawa" state="ON" metro="Grandview Trail" metroId="1" cmtd="PALETTE" sort="Name" order="asc" schemeids="1" palids="1">
    <agent agentid="1" fname="" lname="" email="" phone="" />
    <stdfeatures>
      <category id="1" name="Community"><feature id="1" name="..."/></category>
    </stdfeatures>
    <legend>
      <entry id="1" code="i" name="Available" color="#..." />
    </legend>
    <lot id="1" x="0" y="0" width="0" height="0" sold="i" elevId="1001">1</lot>
  </nbrhood>
</data>
```

Lots are optional but required for siteplan/homesite behavior.

## `getplans.php`

Returns XML attached to neighborhoods:

```xml
<data>
  <nbrhood id="1">
    <palettes>...</palettes>
    <schemes>...</schemes>
    <plan id="101" name="Plan Name" defaultFloor="1" imgs="" fpimgs="" def="1" description="">
      <elev id="1001" cap="A" tag="A" bed="4" bath="3.5" size="2512" cost="807990" schemeids="1" cars="2" floorCount="2" defaultFloor="1" />
    </plan>
    <inventory ... />
  </nbrhood>
</data>
```

Required elevation attributes: `id`, `cap`, `tag`, `bed`, `bath`, `size`, `cost`, `schemeids`, `cars`.

## Lazy JSON Contracts

`getElevationDetails.php`, `getElevationElements.php`, and `getPlanFloorplans.php` use this shape:

```json
{
  "planData": {
    "imgs": "",
    "fpimgs": "",
    "elevations": [
      {
        "id": 1001,
        "elements": [{ "id": 1, "name": "Body Colour", "src": "" }],
        "paletteOverlays": [],
        "floorplans": [
          {
            "fnum": 1,
            "groups": [{ "id": 1, "groupType": "structural", "name": "Options", "designatedPrimary": 0, "fpOptIds": "2001" }],
            "opts": [{ "id": 2000, "name": "Base", "src": "floorplan.svg", "base": 1, "opt": 0, "cost": 0, "size": 0, "groupIds": "", "fpAlts": [] }]
          }
        ]
      }
    ]
  },
  "schemes": [{ "id": 1, "name": "Scheme", "cost": 0, "elements": [] }],
  "palettes": [{ "id": 1, "name": "Palette", "layid": 1, "lay": "Exterior", "blendmode": "m", "elements": [] }]
}
```

`getElevationSchemes.php` returns:

```json
{ "schemeIds": [1] }
```

`getelevnbrhoods.php` returns an array of neighborhood summary objects.

`getinteriors.php` returns XML with `<interiors><room>...`.

## Rendering API

The frontend calls `//rendering.house/api/v1/fp/{client}/nbr/{neighborhood}/plan/{plan}/elev/{elevation}/fnum/{floor}?o=uri&w={width}` and expects a plain text image URI. The local repair routes this to a reconstructed placeholder URI.
