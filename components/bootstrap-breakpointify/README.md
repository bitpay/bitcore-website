# bootstrap-breakpointify
Add breakpoint suffixes to [Bootstrap v4's utility classes][utils].

For example, `.m-a-lg-gt-md`:
- applies large margin to all sides (`m-a-lg`)
- at breakpoints greater than medium (`gt-md`).

## Install

```bash
bower install bootstrap-breakpointify
```

Note: this library must be `@import`ed after bootstrap, as it requires [Bootstrap's responsive breakpoint mixins][mixins].

```scss
@import '../bower_components/bootstrap/scss/bootstrap';
@import '../bower_components/bootstrap-breakpointify/all';
```

## Usage
Breakpoint suffixes are appended to the end of the normal classes. See the [bootstrap docs][utils] for the full list. All suffixes begin with either `gt` ("greater than") or `lt` ("less than").

### "Greater-than" suffixes
"Greater-than" suffixes apply the class at the following [Bootstrap breakpoints][mixins].

suffix  | x-small | small | medium | large | x-large
:-----: | :-----: | :---: | :----: | :---: | :-----:
`gt-xs` |         | ✓     | ✓      | ✓     | ✓
`gt-sm` |         |       | ✓      | ✓     | ✓
`gt-md` |         |       |        | ✓     | ✓
`gt-lg` |         |       |        |       | ✓

### "Less-than" suffixes
"Less-than" suffixes apply the class at the following [Bootstrap breakpoints][mixins].

suffix  | x-small | small | medium | large | x-large
:-----: | :-----: | :---: | :----: | :---: | :-----:
`lt-sm` | ✓       |       |        |       |
`lt-md` | ✓       | ✓     |        |       |
`lt-lg` | ✓       | ✓     | ✓      |       |
`lt-xl` | ✓       | ✓     | ✓      | ✓     |

### Examples
- `m-a-0-gt-lg` – remove margin from all sides at breakpoints greater than Bootstrap's large (`lg`) breakpoint.
- `m-b-lg-gt-md` – apply large margin-bottom at breakpoints greater than Bootstrap's medium (`md`) breakpoint.
- `p-t-lt-md` – apply normal padding-top at breakpoints less than Bootstrap's medium (`md`) breakpoint.

## What about unused CSS classes?
You could use [UnCSS](https://github.com/giakki/uncss) to programmatically remove unused CSS, but it's likely not worth the savings.

Browser rendering performance is not impacted by unused CSS classes, and this entire library adds the equivalent of a small icon to your page weight. Ensure your stylesheets are served with gzip compression for best optimization.

[utils]: http://v4-alpha.getbootstrap.com/components/utilities/#spacing
[mixins]: http://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints
