const IGNORE = declare("Tags.IGNORE", {value: 1});
if (IGNORE.value !== undefined) {
    return;
}

declare("VirtualParameters.*", {value: Date.now()});tel