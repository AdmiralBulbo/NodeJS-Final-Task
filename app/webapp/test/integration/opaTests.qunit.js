/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZKRY/Final_Task/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});