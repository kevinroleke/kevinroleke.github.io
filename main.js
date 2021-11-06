const devtools = {
	isOpen: false,
	orientation: undefined,
};

const threshold = 160;

const emitEvent = (isOpen, orientation) => {
	if (isOpen) {
        document.getElementsByClassName('wrap')[0].style.display = 'none';
        document.getElementsByClassName('secret')[0].style.display = 'block';
    } else {
        document.getElementsByClassName('wrap')[0].style.display = 'block';
        document.getElementsByClassName('secret')[0].style.display = 'none';
    }
};

const main = ({emitEvents = true} = {}) => {
	const widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold;
	const heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold;
	const orientation = widthThreshold ? 'vertical' : 'horizontal';

	if (
		!(heightThreshold && widthThreshold)
		&& ((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
	) {
		if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
			emitEvent(true, orientation);
		}

		devtools.isOpen = true;
		devtools.orientation = orientation;
	} else {
		if (devtools.isOpen && emitEvents) {
			emitEvent(false, undefined);
		}

		devtools.isOpen = false;
		devtools.orientation = undefined;
	}
};

main({emitEvents: false});
setInterval(main, 500);