sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("ZKRY.Final_Task.controller.newWorker", {
		onInit: function () {
			var OModel = new JSONModel();
			this.getView().setModel(OModel);
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app");
		},

		onFormSend: function () {
			var oModel = this.getView().getModel();
			var data = oModel.getJSON();
			var that = this;
			var xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					//MessageToast.show('JSON data that will be send: ' + data);
					that.onNavigate();
				}
			});
			xhr.open('POST', 'http://localhost:1337/workers');
			xhr.setRequestHeader('Content-Type', "application/json");
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.send(data);
		}
	});
});