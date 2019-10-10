sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("ZKRY.Final_Task.controller.app", {
		onInit: function () {
			/*
			var that = this;
			var url = "http://localhost:1337/";
			var oModel = new sap.ui.model.odata.v4.ODataModel({
				groupId: "$direct",
				synchronizationMode: "None",
				serviceUrl: url,
				odataVersion: "4.0"
			});
			console.log(oModel);
			var oTable = that.byId("oDataTable");
			oTable.setModel(oModel);
			*/
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("app").attachMatched(this._onRouteMatched, this);
			this.readOData();
		},

		_onRouteMatched: function (oEvent) {
			this.readOData();
		},

		readOData: function() {
			var xhr = new XMLHttpRequest();
			var OModel = new JSONModel();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					var result = this.response;
					OModel.setData(JSON.parse(result));
					//console.log(result);
				}
			});
			xhr.open("GET", "http://localhost:1337/workers/?$format=json");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.send();
			this.getView().setModel(OModel, "odata");
		},

		onItemPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oItem = oEvent.getSource();
			oRouter.navTo("workerinfo", {
				workerId: oItem.getBindingContext("odata").getProperty("_id")
			});
			//console.log(oItem.getBindingContext("odata").getProperty("_id"));
		},
		
		onNavigate: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("btnToNew")) {
				oRouter.navTo("newWorker");
			}
		}
	});
});