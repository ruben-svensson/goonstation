!(function () {
	var e,
		t = {
			93968: function (e, t) {
				"use strict";
				(t.__esModule = !0), (t.modifier = t.element = t.block = void 0);
				t.block = function (e, t) {
					return e + "-" + t;
				};
				t.element = function (e, t) {
					return e + "__" + t;
				};
				t.modifier = function (e, t) {
					return e + "--" + t;
				};
			},
			60121: function (e, t, n) {
				"use strict";
				var o = n(39812);
				n(405),
					n(92959),
					n(58594),
					n(21300),
					n(16657),
					n(49081),
					n(30890),
					n(11516);
				var r,
					a,
					c = n(84877),
					i = (n(25059), n(18874)),
					l = n(25697),
					d = n(75682),
					u = n(69913),
					m = n(74360);
				c.perf.mark(
					"inception",
					null == (r = window.performance) || null == (a = r.timing)
						? void 0
						: a.navigationStart
				),
					c.perf.mark("init");
				var s = (0, u.configureStore)(),
					p = (0, d.createRenderer)(function () {
						var e = (0, n(73218).getRoutedComponent)(s);
						return (0,
						o.createComponentVNode)(2, u.StoreProvider, { store: s, children: (0, o.createComponentVNode)(2, e) });
					});
				!(function h() {
					if ("loading" !== document.readyState) {
						for (
							(0, m.setupGlobalEvents)(),
								(0, i.setupHotKeys)(),
								(0, l.captureExternalLinks)(),
								s.subscribe(p),
								window.update = function (e) {
									return s.dispatch(Byond.parseJson(e));
								};
							;

						) {
							var e = window.__updateQueue__.shift();
							if (!e) break;
							window.update(e);
						}
						0;
					} else document.addEventListener("DOMContentLoaded", h);
				})();
			},
			26363: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AIMap = void 0);
				var o = n(39812),
					r = (n(71494), n(74814)),
					a = n(85952);
				t.AIMap = function (e, t) {
					return (0, o.createComponentVNode)(2, a.Window, {
						width: 610,
						height: 640,
						title: "AI station map",
						children: (0, o.createComponentVNode)(2, a.Window.Content, {
							children: (0, o.createComponentVNode)(2, r.ByondUi, {
								params: { type: "map", id: "ai_map" },
								style: { width: "600px", height: "600px" },
							}),
						}),
					});
				};
			},
			44045: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AIRack = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.AIRack = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data,
						d = l.lawTitles,
						u = l.lawText,
						m = l.welded,
						s = l.screwed;
					return (0, o.createComponentVNode)(2, c.Window, {
						resizable: !0,
						title: "AI Law Rack",
						width: 600,
						height: 800,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, a.Section, {
								children: (0, o.createComponentVNode)(2, a.Box, {
									children: d.map(function (e, t) {
										return (0, o.createComponentVNode)(
											2,
											a.Collapsible,
											{
												title: e ? d[t] : "Empty",
												open: !!e,
												children: [
													(0, o.createComponentVNode)(2, a.BlockQuote, {
														preserveWhitespace: !0,
														children: e ? u[t] : "<Empty Slot>",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														icon: e ? "circle" : "circle-o",
														content: e ? "Remove" : "Empty",
														onClick: function () {
															return i("rack", { rack_index: t + 1 });
														},
														disabled: m[t] || s[t],
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														icon: m[t] ? "circle" : "circle-o",
														content: m[t] ? "Welded" : "Not Welded",
														onClick: function () {
															return i("weld", { rack_index: t + 1 });
														},
														color: m[t] ? "red" : "green",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														icon: s[t] ? "circle" : "circle-o",
														content: s[t] ? "Screwed In" : "Not Screwed In",
														onClick: function () {
															return i("screw", { rack_index: t + 1 });
														},
														color: s[t] ? "red" : "green",
													}),
												],
											},
											t
										);
									}),
								}),
							}),
						}),
					});
				};
			},
			56294: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.AccessPanel = t.Airlock = t.uiCurrentUserPermissions = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(58083),
					c = n(74814),
					i = n(85952),
					l = function (e) {
						var t = e.panelOpen,
							n = e.userStates;
						return {
							airlock: n.isBorg || n.isAi,
							accessPanel:
								(n.isBorg && n.distance <= 1 && t) ||
								(t && !n.isBorg && !n.isAi),
						};
					};
				t.uiCurrentUserPermissions = l;
				t.Airlock = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						a = l(n);
					return (0, o.createComponentVNode)(2, i.Window, {
						theme: "ntos",
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								!a.airlock &&
									!a.accessPanel &&
									(0, o.createComponentVNode)(2, c.Modal, {
										textAlign: "center",
										fontSize: "24px",
										children: (0, o.createComponentVNode)(2, c.Box, {
											width: 25,
											height: 5,
											align: "center",
											children: "Access Panel is Closed",
										}),
									}),
								(!!a.airlock &&
									!!a.accessPanel &&
									(0, o.createComponentVNode)(2, d)) ||
									(!!a.airlock && (0, o.createComponentVNode)(2, u)) ||
									(!!a.accessPanel && (0, o.createComponentVNode)(2, m)),
							],
						}),
					});
				};
				var d = function (e, t) {
						var n = (0, r.useBackend)(t).data,
							l = n.name,
							d = n.canAiControl,
							u = n.hackMessage,
							m = n.canAiHack,
							V = n.noPower,
							f = (0, r.useLocalState)(t, "tabIndex", 1),
							g = f[0],
							b = f[1];
						return (0, o.createComponentVNode)(2, i.Window, {
							width: 354,
							height: 495,
							title: "Airlock - " + (0, a.truncate)(l, 19),
							children: (0, o.createComponentVNode)(2, i.Window.Content, {
								children: [
									(0, o.createComponentVNode)(2, c.Tabs, {
										children: [
											(0, o.createComponentVNode)(2, c.Tabs.Tab, {
												selected: 1 === g,
												onClick: function () {
													b(1);
												},
												children: "Airlock Controls",
											}),
											(0, o.createComponentVNode)(2, c.Tabs.Tab, {
												selected: 2 === g,
												onClick: function () {
													b(2);
												},
												children: "Access Panel",
											}),
										],
									}),
									1 === g &&
										(0, o.createFragment)(
											[
												(0, o.createComponentVNode)(2, c.Section, {
													fitted: !0,
													backgroundColor: "transparent",
													children: [
														(!d || !!V) &&
															(0, o.createComponentVNode)(2, c.Modal, {
																textAlign: "center",
																fontSize: "24px",
																children: (0, o.createComponentVNode)(
																	2,
																	c.Box,
																	{
																		width: 20,
																		height: 5,
																		algin: "center",
																		children: u || "Airlock Controls Disabled",
																	}
																),
															}),
														(0, o.createComponentVNode)(2, s),
														(0, o.createComponentVNode)(2, p),
														(0, o.createComponentVNode)(2, h),
													],
												}),
												!!m && (0, o.createComponentVNode)(2, C),
											],
											0
										),
									2 === g && (0, o.createComponentVNode)(2, N),
								],
							}),
						});
					},
					u = function (e, t) {
						var n = (0, r.useBackend)(t).data,
							l = n.name,
							d = n.canAiControl,
							u = n.hackMessage,
							m = n.canAiHack,
							N = n.noPower;
						return (0, o.createComponentVNode)(2, i.Window, {
							width: 315,
							height: 380,
							title: "Airlock - " + (0, a.truncate)(l, 19),
							children: (0, o.createComponentVNode)(2, i.Window.Content, {
								children: [
									(!d || !!N) &&
										(0, o.createComponentVNode)(2, c.Modal, {
											textAlign: "center",
											fontSize: "26px",
											children: [
												(0, o.createComponentVNode)(2, c.Box, {
													width: 20,
													height: 5,
													algin: "center",
													children: u || "Airlock Controls Disabled",
												}),
												!!m && (0, o.createComponentVNode)(2, C),
											],
										}),
									(0, o.createComponentVNode)(2, s),
									(0, o.createComponentVNode)(2, p),
									(0, o.createComponentVNode)(2, h),
								],
							}),
						});
					},
					m = function (e, t) {
						var n = (0, r.useBackend)(t).data.name;
						return (0, o.createComponentVNode)(2, i.Window, {
							width: 354,
							height: 465,
							title: "Airlock - " + (0, a.truncate)(n, 19),
							children: (0, o.createComponentVNode)(2, i.Window.Content, {
								children: (0, o.createComponentVNode)(2, N),
							}),
						});
					},
					s = function (e, t) {
						var n = (0, r.useBackend)(t),
							a = n.act,
							i = n.data,
							l = i.mainTimeLeft,
							d = i.backupTimeLeft,
							u = i.wires,
							m = i.netId,
							s = i.accessCode,
							p = { width: 6.7, textAlign: "center" };
						return (0, o.createComponentVNode)(2, c.Section, {
							title: "Power Status",
							children: [
								(0, o.createComponentVNode)(2, c.Box, {
									children: [
										"Access sensor reports the net identifer is:",
										" ",
										(0, o.createComponentVNode)(2, c.Box, {
											inline: !0,
											italic: !0,
											children: m,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, c.Box, {
									children: [
										"Net access code:",
										" ",
										(0, o.createComponentVNode)(2, c.Box, {
											inline: !0,
											italic: !0,
											children: s,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, c.Divider),
								(0, o.createComponentVNode)(2, c.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Main",
											color: l ? "bad" : "good",
											buttons: (0, o.normalizeProps)(
												(0, o.createComponentVNode)(
													2,
													c.Button,
													Object.assign({}, p, {
														color: "bad",
														icon: "plug",
														disabled: !!l,
														onClick: function () {
															return a("disruptMain");
														},
														children: "Disrupt",
													})
												)
											),
											children: [
												l ? "Offline" : "Online",
												" ",
												u.main_1 && u.main_2
													? l > 0 && "[" + l + "s]"
													: "[Wires cut!]",
											],
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Backup",
											color: d ? "bad" : "good",
											buttons: (0, o.normalizeProps)(
												(0, o.createComponentVNode)(
													2,
													c.Button,
													Object.assign({}, p, {
														mt: 0.5,
														color: "bad",
														icon: "plug",
														disabled: !!d,
														onClick: function () {
															return a("disruptBackup");
														},
														children: "Disrupt",
													})
												)
											),
											children: [
												d ? "Offline" : "Online",
												" ",
												u.backup_1 && u.backup_2
													? d > 0 && "[" + d + "s]"
													: "[Wires cut!]",
											],
										}),
									],
								}),
							],
						});
					},
					p = function (e, t) {
						var n = (0, r.useBackend)(t),
							a = n.act,
							i = n.data,
							l = i.mainTimeLeft,
							d = i.backupTimeLeft,
							u = i.wires,
							m = i.idScanner,
							s = i.boltsAreUp,
							p = i.opened,
							h = i.welded,
							C = { width: 6.7, textAlign: "center" };
						return (0, o.createComponentVNode)(2, c.Section, {
							title: "Access and Door Control",
							pt: 1,
							children: (0, o.createComponentVNode)(2, c.LabeledList, {
								children: [
									(0, o.createComponentVNode)(2, c.LabeledList.Item, {
										label: "ID Scan",
										color: "bad",
										buttons: (0, o.normalizeProps)(
											(0, o.createComponentVNode)(
												2,
												c.Button,
												Object.assign({}, C, {
													color: m ? "good" : "bad",
													icon: m ? "power-off" : "times",
													disabled: !u.idScanner || (l && d),
													onClick: function () {
														return a("idScanToggle");
													},
													children: m ? "Enabled" : "Disabled",
												})
											)
										),
										children: !u.idScanner && "[Wires cut!]",
									}),
									(0, o.createComponentVNode)(2, c.LabeledList.Item, {
										label: "Door Bolts",
										color: "bad",
										buttons: (0, o.normalizeProps)(
											(0, o.createComponentVNode)(
												2,
												c.Button,
												Object.assign({ mt: 0.5 }, C, {
													color: s ? "good" : "bad",
													icon: s ? "lock" : "unlock",
													disabled: !u.bolts || (l && d),
													onClick: function () {
														return a("boltToggle");
													},
													children: s ? "Raised" : "Lowered",
												})
											)
										),
										children: !u.bolts && "[Wires cut!]",
									}),
									(0, o.createComponentVNode)(2, c.LabeledList.Item, {
										label: "Door Control",
										color: "bad",
										buttons: (0, o.normalizeProps)(
											(0, o.createComponentVNode)(
												2,
												c.Button,
												Object.assign({}, C, {
													mt: 0.5,
													color: p ? "bad" : "good",
													icon: p ? "sign-out-alt" : "sign-in-alt",
													disabled: !s || h || (l && d),
													onClick: function () {
														return a("openClose");
													},
													children: p ? "Open" : "Closed",
												})
											)
										),
										children:
											!(s && !h) &&
											(0, o.createVNode)(
												1,
												"span",
												null,
												[
													(0, o.createTextVNode)("["),
													!s && "Bolted",
													!s && h && " & ",
													h && "Welded",
													(0, o.createTextVNode)("!]"),
												],
												0
											),
									}),
								],
							}),
						});
					},
					h = function (e, t) {
						var n = (0, r.useBackend)(t),
							a = n.act,
							i = n.data,
							l = i.mainTimeLeft,
							d = i.backupTimeLeft,
							u = i.wires,
							m = i.shockTimeLeft;
						return (0, o.createComponentVNode)(2, c.NoticeBox, {
							backgroundColor: "#601B1B",
							children: (0, o.createComponentVNode)(2, c.LabeledList, {
								children: [
									(0, o.createComponentVNode)(2, c.LabeledList.Item, {
										labelColor: "white",
										color: m ? "average" : "good",
										label: "Electrify",
										children: [
											m ? "Electrified" : "Safe",
											" ",
											(u.shock ? m > 0 && "[" + m + "s]" : "[Wires cut!]") ||
												(-1 === m && "[Permanent]"),
										],
									}),
									(0, o.createComponentVNode)(2, c.LabeledList.Item, {
										color: m ? "Bad" : "Average",
										children: (0, o.createComponentVNode)(2, c.Box, {
											pl: m ? 18 : 0,
											pt: 0.5,
											children: [
												!m &&
													(0, o.createComponentVNode)(2, c.Button.Confirm, {
														width: 9,
														p: 0.5,
														align: "center",
														color: "average",
														content: "Temporary",
														confirmContent: "Are you sure?",
														icon: "bolt",
														disabled: !u.shock || (l && d),
														onClick: function () {
															return a("shockTemp");
														},
													}),
												(0, o.createComponentVNode)(2, c.Button.Confirm, {
													width: 9,
													p: 0.5,
													align: "center",
													color: m ? "good" : "bad",
													icon: "bolt",
													confirmContent: "Are you sure?",
													content: m ? "Restore" : "Permanent",
													disabled: !u.shock || (l && d),
													onClick: m
														? function () {
																return a("shockRestore");
														  }
														: function () {
																return a("shockPerm");
														  },
												}),
											],
										}),
									}),
								],
							}),
						});
					},
					C = function (e, t) {
						var n = (0, r.useBackend)(t),
							a = n.act,
							i = n.data,
							l = i.aiHacking,
							d = i.hackingProgression;
						return (0, o.createComponentVNode)(2, c.Box, {
							fitted: !0,
							py: 0.5,
							pt: 2,
							align: "center",
							children: [
								!l &&
									(0, o.createComponentVNode)(2, c.Button, {
										className: "Airlock-hack-button",
										fontSize: "29px",
										backgroundColor: "#00FF00",
										disabled: l,
										textColor: "black",
										textAlign: "center",
										width: 16,
										onClick: function () {
											return a("hackAirlock");
										},
										children: "HACK",
									}),
								!!l &&
									(0, o.createComponentVNode)(2, c.ProgressBar, {
										ranges: {
											good: [6, Infinity],
											average: [2, 5],
											bad: [-Infinity, 1],
										},
										minValue: 0,
										maxValue: 6,
										value: d,
									}),
							],
						});
					},
					N = function (e, t) {
						var n = (0, r.useBackend)(t),
							a = n.act,
							i = n.data,
							l = i.signalers,
							d = i.wireColors,
							u = i.wireStates,
							m = i.netId,
							s = i.powerIsOn,
							p = i.boltsAreUp,
							h = i.canAiControl,
							C = i.aiControlVar,
							N = i.safety,
							V = i.panelOpen,
							f = i.accessCode,
							g = function (e, t) {
								a(t, { wireColorIndex: e });
							},
							b = Object.keys(d);
						return (0, o.createComponentVNode)(2, c.Section, {
							title: "Access Panel",
							children: [
								!V &&
									(0, o.createComponentVNode)(2, c.Modal, {
										textAlign: "center",
										fontSize: "24px",
										children: "Access Panel is Closed",
									}),
								(0, o.createComponentVNode)(2, c.Box, {
									children: [
										"An identifier is engraved under the airlock's card sensors:",
										" ",
										(0, o.createComponentVNode)(2, c.Box, {
											inline: !0,
											italic: !0,
											children: m,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, c.Box, {
									children: [
										"A display shows net access code:",
										" ",
										(0, o.createComponentVNode)(2, c.Box, {
											inline: !0,
											italic: !0,
											children: f,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, c.Divider),
								(0, o.createComponentVNode)(2, c.LabeledList, {
									children: b.map(function (e, t) {
										return (0, o.createComponentVNode)(
											2,
											c.LabeledList.Item,
											{
												label: e + " wire",
												labelColor: e.toLowerCase(),
												children: u[t]
													? (0, o.createComponentVNode)(2, c.Button, {
															color: "green",
															height: 1.8,
															onClick: function () {
																return g(t, "mend");
															},
															children: "Mend",
													  })
													: (0, o.createComponentVNode)(2, c.Box, {
															height: 1.8,
															children: [
																(0, o.createComponentVNode)(2, c.Button, {
																	icon: "cut",
																	onClick: function () {
																		return g(t, "cut");
																	},
																	children: "Cut",
																}),
																(0, o.createComponentVNode)(2, c.Button, {
																	icon: "bolt",
																	onClick: function () {
																		return g(t, "pulse");
																	},
																	children: "Pulse",
																}),
																(0, o.createComponentVNode)(2, c.Button, {
																	icon: "broadcast-tower",
																	width: 10.5,
																	className: "AccessPanel-wires-btn",
																	selected: l[t],
																	onClick: function () {
																		return g(t, "signaler");
																	},
																	children: l[t]
																		? "Detach Signaler"
																		: "Attach Signaler",
																}),
															],
													  }),
											},
											e
										);
									}),
								}),
								(0, o.createComponentVNode)(2, c.Divider),
								(0, o.createComponentVNode)(2, c.Flex, {
									direction: "row",
									children: [
										(0, o.createComponentVNode)(2, c.Flex.Item, {
											children: (0, o.createComponentVNode)(2, c.LabeledList, {
												children: [
													(0, o.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Door bolts",
														color: p ? "green" : "red",
														children: p ? "Disengaged" : "Engaged",
													}),
													(0, o.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Test light",
														color: s ? "green" : "red",
														children: s ? "Active" : "Inactive",
													}),
												],
											}),
										}),
										(0, o.createComponentVNode)(2, c.Flex.Item, {
											children: (0, o.createComponentVNode)(2, c.LabeledList, {
												children: [
													(0, o.createComponentVNode)(2, c.LabeledList.Item, {
														label: "AI control",
														color: h ? (2 === C ? "orange" : "green") : "red",
														children: h ? "Enabled" : "Disabled",
													}),
													(0, o.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Safety light",
														color: N ? "green" : "red",
														children: N ? "Active" : "Inactive",
													}),
												],
											}),
										}),
									],
								}),
							],
						});
					};
				t.AccessPanel = N;
			},
			31010: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AlertModal = void 0);
				var o = n(39812),
					r = n(65923),
					a = n(71494),
					c = n(29708),
					i = n(74814),
					l = n(85952);
				t.AlertModal = function (e, t) {
					var n = (0, a.useBackend)(t),
						u = n.act,
						m = n.data,
						s = m.autofocus,
						p = m.items,
						h = void 0 === p ? [] : p,
						C = m.message,
						N = void 0 === C ? "" : C,
						V = m.timeout,
						f = m.title,
						g = (0, a.useLocalState)(t, "selected", 0),
						b = g[0],
						v = g[1],
						k = 115 + (N.length > 30 ? Math.ceil(N.length / 4) : 0),
						x = 325 + (h.length > 2 ? 55 : 0),
						w = function (e) {
							0 === b && -1 === e
								? v(h.length - 1)
								: b === h.length - 1 && 1 === e
								? v(0)
								: v(b + e);
						};
					return (0, o.createComponentVNode)(2, l.Window, {
						height: k,
						title: f,
						width: x,
						children: [
							!!V && (0, o.createComponentVNode)(2, r.Loader, { value: V }),
							(0, o.createComponentVNode)(2, l.Window.Content, {
								onKeyDown: function (e) {
									var t = window.event ? e.which : e.keyCode;
									t === c.KEY_SPACE || t === c.KEY_ENTER
										? u("choose", { choice: h[b] })
										: t === c.KEY_ESCAPE
										? u("cancel")
										: t === c.KEY_LEFT
										? (e.preventDefault(), w(-1))
										: (t !== c.KEY_TAB && t !== c.KEY_RIGHT) ||
										  (e.preventDefault(), w(1));
								},
								children: (0, o.createComponentVNode)(2, i.Section, {
									fill: !0,
									children: (0, o.createComponentVNode)(2, i.Stack, {
										fill: !0,
										vertical: !0,
										children: [
											(0, o.createComponentVNode)(2, i.Stack.Item, {
												grow: !0,
												m: 1,
												children: (0, o.createComponentVNode)(2, i.Box, {
													color: "label",
													overflow: "hidden",
													children: N,
												}),
											}),
											(0, o.createComponentVNode)(2, i.Stack.Item, {
												children: [
													!!s && (0, o.createComponentVNode)(2, i.Autofocus),
													(0, o.createComponentVNode)(2, d, { selected: b }),
												],
											}),
										],
									}),
								}),
							}),
						],
					});
				};
				var d = function (e, t) {
						var n = (0, a.useBackend)(t).data.items,
							r = void 0 === n ? [] : n,
							c = e.selected;
						return (0, o.createComponentVNode)(2, i.Flex, {
							align: "center",
							direction: "row",
							fill: !0,
							justify: "space-around",
							wrap: !0,
							children:
								null == r
									? void 0
									: r.map(function (e, t) {
											return (0,
											o.createComponentVNode)(2, i.Flex.Item, { children: (0, o.createComponentVNode)(2, u, { button: e, id: t.toString(), selected: c === t }) }, t);
									  }),
						});
					},
					u = function (e, t) {
						var n = (0, a.useBackend)(t),
							r = n.act,
							c = (n.data, e.button),
							l = e.selected,
							d = c.length > 7 ? c.length : 7;
						return (0, o.createComponentVNode)(2, i.Button, {
							onClick: function () {
								return r("choose", { choice: c });
							},
							m: 0.5,
							pl: 2,
							pr: 2,
							pt: 0,
							selected: l,
							textAlign: "center",
							width: d,
							children: c,
						});
					};
			},
			39475: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AccessPanel = void 0);
				var o = n(39812),
					r = (n(85952), n(71494)),
					a = n(74814),
					c = n(99123);
				t.AccessPanel = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = (n.act, n.data),
						l = i.net_id,
						d = i.locked,
						u = i.shorted,
						m = i.aidisabled;
					return (0, o.createComponentVNode)(2, a.Section, {
						title: "Access Panel",
						children: [
							(0, o.createComponentVNode)(2, a.BlockQuote, {
								children: (0, o.createVNode)(
									1,
									"b",
									null,
									[
										(0, o.createTextVNode)(
											"An identifier is engraved above the APC"
										),
										(0, o.createTextVNode)("'"),
										(0, o.createTextVNode)("s wires: "),
										l,
									],
									0
								),
							}),
							(0, o.createComponentVNode)(2, a.Flex, {
								direction: "column",
								children: [
									(0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, c.Wire, {
												wire: c.WIRE_ORANGE,
											}),
											(0, o.createComponentVNode)(2, c.Wire, {
												wire: c.WIRE_DARK_RED,
											}),
											(0, o.createComponentVNode)(2, c.Wire, {
												wire: c.WIRE_WHITE,
											}),
											(0, o.createComponentVNode)(2, c.Wire, {
												wire: c.WIRE_YELLOW,
											}),
										],
									}),
									(0, o.createComponentVNode)(2, a.Divider),
									(0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Controls",
												children: (0, o.createVNode)(
													1,
													"font",
													null,
													d ? "Locked" : "Unlocked",
													0,
													{ color: d ? "green" : "red" }
												),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Circuitry",
												children: (0, o.createVNode)(
													1,
													"font",
													null,
													u ? "Shorted" : "Working",
													0,
													{ color: u ? "red" : "green" }
												),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "AI Control",
												children: (0, o.createVNode)(
													1,
													"font",
													null,
													m ? "Disabled" : "Enabled",
													0,
													{ color: m ? "red" : "green" }
												),
											}),
										],
									}),
								],
							}),
						],
					});
				};
			},
			62347: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.PowerChannelSection =
						t.POWER_CHANNEL_STATUS_AUTO_ON =
						t.POWER_CHANNEL_STATUS_ON =
						t.POWER_CHANNEL_STATUS_AUTO_OFF =
						t.POWER_CHANNEL_STATUS_OFF =
						t.POWER_CHANNEL_ENVIRONMENTAL =
						t.POWER_CHANNEL_LIGHTING =
						t.POWER_CHANNEL_EQUIPMENT =
							void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.POWER_CHANNEL_EQUIPMENT = 1;
				t.POWER_CHANNEL_LIGHTING = 2;
				t.POWER_CHANNEL_ENVIRONMENTAL = 3;
				t.POWER_CHANNEL_STATUS_OFF = 0;
				t.POWER_CHANNEL_STATUS_AUTO_OFF = 1;
				t.POWER_CHANNEL_STATUS_ON = 2;
				t.POWER_CHANNEL_STATUS_AUTO_ON = 3;
				t.PowerChannelSection = function (e, t) {
					var n = e.powerChannel,
						c = (0, r.useBackend)(t),
						i = c.act,
						l = c.data,
						d = l.locked,
						u = l.is_ai,
						m = l.is_silicon,
						s = l.can_access_remotely,
						p = l.aidisabled,
						h = l.equipment,
						C = l.lighting,
						N = l.environ,
						V = l.lastused_equip,
						f = l.lastused_light,
						g = l.lastused_environ,
						b = (function () {
							switch (n) {
								case 1:
									return "Equipment";
								case 2:
									return "Lighting";
								case 3:
									return "Environmental";
								default:
									return "Unknown";
							}
						})(),
						v = function (e) {
							switch (n) {
								case 1:
									i("onPowerChannelEquipmentStatusChange", { status: e });
									break;
								case 2:
									i("onPowerChannelLightingStatusChange", { status: e });
									break;
								case 3:
									i("onPowerChannelEnvironStatusChange", { status: e });
									break;
								default:
									return;
							}
						},
						k = function () {
							return u || m || s ? !p : !d;
						},
						x = function (e) {
							return (
								e ===
								(function () {
									switch (n) {
										case 1:
											return h;
										case 2:
											return C;
										case 3:
											return N;
									}
								})()
							);
						};
					return (0, o.createComponentVNode)(2, a.LabeledList.Item, {
						label: b,
						direction: "row",
						children: (0, o.createComponentVNode)(2, a.LabeledList, {
							children: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
								label:
									(function () {
										switch (n) {
											case 1:
												return V;
											case 2:
												return f;
											case 3:
												return g;
											default:
												return 0;
										}
									})() + " W",
								direction: "row",
								disabled: !k(),
								children: [
									(0, o.createComponentVNode)(2, a.Button, {
										content: "Off",
										disabled: !k() && !x(0),
										onClick: function () {
											v(0);
										},
										selected: x(0),
										align: "center",
									}),
									(0, o.createComponentVNode)(2, a.Button, {
										content: "On",
										disabled: !k() && !x(2),
										onClick: function () {
											v(2);
										},
										selected: x(2),
									}),
									(0, o.createComponentVNode)(2, a.Button, {
										content: "Auto",
										disabled: !k() && !(x(1) || x(3)),
										onClick: function () {
											v(3);
										},
										selected: x(1) || x(3),
									}),
								],
							}),
						}),
					});
				};
			},
			99123: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.Wire =
						t.WIRE_YELLOW =
						t.WIRE_WHITE =
						t.WIRE_DARK_RED =
						t.WIRE_ORANGE =
							void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.WIRE_ORANGE = 1;
				t.WIRE_DARK_RED = 2;
				t.WIRE_WHITE = 3;
				t.WIRE_YELLOW = 4;
				t.Wire = function (e, t) {
					var n = e.wire,
						c = (0, r.useBackend)(t),
						i = c.act,
						l = c.data,
						d = l.orange_cut,
						u = l.dark_red_cut,
						m = l.white_cut,
						s = l.yellow_cut,
						p = (function (e) {
							switch (e) {
								case 1:
									return "Orange";
								case 2:
									return "Dark red";
								case 3:
									return "White";
								case 4:
									return "Yellow";
								default:
									return "unknown";
							}
						})(n),
						h = function (e) {
							i("onMendWire", { wire: n });
						},
						C = function (e) {
							i("onCutWire", { wire: n });
						},
						N = function (e) {
							i("onPulseWire", { wire: n });
						},
						V = function (e) {
							i("onBiteWire", { wire: n });
						},
						f = function (e) {
							switch (e) {
								case 1:
									return d;
								case 2:
									return u;
								case 3:
									return m;
								case 4:
									return s;
							}
						};
					return (0, o.createComponentVNode)(
						2,
						a.LabeledList.Item,
						{
							label: p,
							labelColor: p.toLowerCase().replace(" ", ""),
							children: f(n)
								? (0, o.createComponentVNode)(2, a.Box, {
										height: 1.8,
										children: (0, o.createComponentVNode)(2, a.Button, {
											content: "Mend",
											onClick: h,
											selected: !0,
										}),
								  })
								: (0, o.createComponentVNode)(2, a.Box, {
										height: 1.8,
										children: [
											(0, o.createComponentVNode)(2, a.Button, {
												content: "Cut",
												icon: "cut",
												onClick: C,
											}),
											(0, o.createComponentVNode)(2, a.Button, {
												content: "Pulse",
												icon: "bolt",
												onClick: N,
											}),
											(0, o.createComponentVNode)(2, a.Button, {
												content: "Bite",
												icon: "tooth",
												onClick: V,
											}),
										],
								  }),
						},
						n
					);
				};
			},
			11147: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Apc = void 0);
				var o = n(39812),
					r = n(85952),
					a = n(71494),
					c = n(74814),
					i = n(39475),
					l = n(62347);
				t.Apc = function (e, t) {
					var n = (0, a.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.area_requires_power,
						s = u.area_name,
						p = u.cell_percent,
						h = u.cell_present,
						C = u.operating,
						N = u.charging,
						V = u.chargemode,
						f = u.chargecount,
						g = u.locked,
						b = u.coverlocked,
						v = u.aidisabled,
						k = u.lastused_total,
						x = u.main_status,
						w = u.wiresexposed,
						S = u.setup_networkapc,
						y = u.can_access_remotely,
						B = u.is_ai,
						I = u.is_silicon,
						T = u.host_id,
						L = function (e) {
							d("onOperatingChange", { operating: e });
						},
						_ = function (e) {
							d("onChargeModeChange", { chargemode: e });
						},
						P = function () {
							switch (x) {
								case 2:
									return (0, o.createVNode)(1, "font", null, "Good", 16, {
										color: "green",
									});
								case 1:
									return (0, o.createVNode)(1, "font", null, "Low", 16, {
										color: "yellow",
									});
								case 0:
									return (0, o.createVNode)(1, "font", null, "None", 16, {
										color: "red",
									});
							}
						},
						A = function () {
							switch (N) {
								case 0:
									return f ? "Performing self-test" : "Not charging";
								case 1:
									return "Fully Charged";
								default:
									return "Charging";
							}
						},
						M = function () {
							var e = b ? "Engaged" : "Disengaged";
							return R()
								? (0, o.createComponentVNode)(2, c.Button, {
										content: e,
										onClick: function () {
											!(function (e) {
												d("onCoverLockedChange", { coverlocked: e });
											})(!b);
										},
								  })
								: (0, o.createComponentVNode)(2, c.Box, { children: e });
						},
						R = function () {
							return B || I || y ? !v : !g;
						},
						D = function () {
							return S < 2 && !y;
						};
					return m
						? (0, o.createComponentVNode)(2, r.Window, {
								title: "Area Power Controller",
								width: 400,
								height: u.wiresexposed ? 680 : 420,
								children: (0, o.createComponentVNode)(2, r.Window.Content, {
									children: [
										(0, o.createComponentVNode)(2, c.Section, {
											title: s,
											children: [
												D()
													? (0, o.createComponentVNode)(2, c.Box, {
															align: "center",
															bold: !0,
															fill: !0,
															children: [
																"Swipe ID card to ",
																g ? "unlock" : "lock",
																" interface",
															],
													  })
													: null,
												D() ? (0, o.createComponentVNode)(2, c.Divider) : null,
												(0, o.createComponentVNode)(2, c.LabeledList, {
													children: [
														(0, o.createComponentVNode)(2, c.LabeledList.Item, {
															label: "Main Breaker",
															children: [
																(0, o.createComponentVNode)(2, c.Button, {
																	content: "Off",
																	disabled: !R() && C,
																	onClick: function () {
																		L(0);
																	},
																	selected: !C,
																}),
																(0, o.createComponentVNode)(2, c.Button, {
																	content: "On",
																	disabled: !R() && !C,
																	onClick: function () {
																		L(1);
																	},
																	selected: C,
																}),
															],
														}),
														h
															? (0, o.createFragment)(
																	[
																		(0, o.createComponentVNode)(
																			2,
																			c.LabeledList.Item,
																			{
																				label: "Charging",
																				direction: "row",
																				children: [
																					(0, o.createComponentVNode)(
																						2,
																						c.Button,
																						{
																							content: "Off",
																							onClick: function () {
																								_(0);
																							},
																							disabled: !R() && 0 !== V,
																							selected: 0 === V,
																						}
																					),
																					(0, o.createComponentVNode)(
																						2,
																						c.Button,
																						{
																							content: "Auto",
																							onClick: function () {
																								_(1);
																							},
																							disabled: !R() && 1 !== V,
																							selected: 1 === V,
																						}
																					),
																					(0, o.createVNode)(
																						1,
																						"font",
																						null,
																						["(", A(), ")"],
																						0
																					),
																				],
																			}
																		),
																		(0, o.createComponentVNode)(
																			2,
																			c.LabeledList.Item,
																			{
																				label: "Cell Power",
																				children: (0, o.createComponentVNode)(
																					2,
																					c.ProgressBar,
																					{
																						value: p,
																						minValue: 0,
																						maxValue: 100,
																						color:
																							p < 20
																								? "red"
																								: p < 50
																								? "yellow"
																								: "green",
																					}
																				),
																			}
																		),
																	],
																	4
															  )
															: (0, o.createComponentVNode)(
																	2,
																	c.LabeledList.Item,
																	{
																		label: "Cell Power",
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				c.ProgressBar,
																				{
																					value: p,
																					minValue: 0,
																					maxValue: 100,
																					color:
																						p < 20
																							? "red"
																							: p < 50
																							? "yellow"
																							: "green",
																				}
																			),
																			(0, o.createVNode)(
																				1,
																				"font",
																				null,
																				"Not Connected",
																				16,
																				{ color: "red" }
																			),
																		],
																	}
															  ),
														(0, o.createComponentVNode)(2, c.LabeledList.Item, {
															label: "External Power",
															children: (0, o.createComponentVNode)(2, c.Box, {
																children: P(),
															}),
														}),
														D()
															? null
															: (0, o.createComponentVNode)(
																	2,
																	c.LabeledList.Item,
																	{
																		label: "Host Connection",
																		children: (0, o.createComponentVNode)(
																			2,
																			c.Box,
																			{
																				children: (0, o.createVNode)(
																					1,
																					"font",
																					null,
																					T ? "OK" : "NONE",
																					0,
																					{ color: T ? "green" : "red" }
																				),
																			}
																		),
																	}
															  ),
													],
												}),
											],
										}),
										(0, o.createComponentVNode)(2, c.Section, {
											title: "PowerChannel",
											children: (0, o.createComponentVNode)(2, c.LabeledList, {
												children: [
													(0, o.createComponentVNode)(
														2,
														l.PowerChannelSection,
														{ powerChannel: l.POWER_CHANNEL_EQUIPMENT }
													),
													(0, o.createComponentVNode)(
														2,
														l.PowerChannelSection,
														{ powerChannel: l.POWER_CHANNEL_LIGHTING }
													),
													(0, o.createComponentVNode)(
														2,
														l.PowerChannelSection,
														{ powerChannel: l.POWER_CHANNEL_ENVIRONMENTAL }
													),
													(0, o.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Total Load",
														children: (0, o.createComponentVNode)(2, c.Box, {
															children: [k, " W"],
														}),
													}),
												],
											}),
										}),
										(0, o.createComponentVNode)(2, c.Section, {
											children: [
												(0, o.createComponentVNode)(2, c.Stack, {
													children: [
														(0, o.createComponentVNode)(2, c.Stack.Item, {
															align: "center",
															children: (0, o.createComponentVNode)(2, c.Box, {
																children: "Cover lock:",
															}),
														}),
														(0, o.createComponentVNode)(2, c.Stack.Item, {
															align: "center",
															children: M(),
														}),
													],
												}),
												y
													? (0, o.createComponentVNode)(2, c.Button, {
															content: "Overload lighting circuit",
															onClick: function () {
																d("onOverload", {});
															},
													  })
													: null,
											],
										}),
										w && !B
											? (0, o.createComponentVNode)(2, i.AccessPanel)
											: null,
									],
								}),
						  })
						: (0, o.createComponentVNode)(2, r.Window, {
								title: "Area Power Controller",
								width: 400,
								height: w ? 500 : 350,
								children: (0, o.createComponentVNode)(2, r.Window.Content, {
									children: [
										(0, o.createComponentVNode)(2, c.Section, {
											title: "Area Power Controller (" + s + ")",
											children: (0, o.createComponentVNode)(2, c.Box, {
												children: "This APC has no configurable settings.",
											}),
										}),
										w && !B
											? (0, o.createComponentVNode)(2, i.AccessPanel)
											: null,
									],
								}),
						  });
				};
			},
			74856: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ArtifactPaper = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.ArtifactPaper = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data,
						d = l.artifactName,
						u = l.artifactOrigin,
						m = l.artifactType,
						s = l.artifactTriggers,
						p = l.artifactFaults,
						h = l.artifactDetails,
						C = l.allArtifactOrigins,
						N = l.allArtifactTypes,
						V = l.allArtifactTriggers,
						f = l.hasPen;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Nanotrasen Alien Artifact Analysis Form",
						theme: "paper",
						width: 800,
						height: 835,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								children: [
									(0, o.createVNode)(1, "h3", null, "Artifact Name", 16),
									(0, o.createVNode)(
										1,
										"h4",
										null,
										"" === d ? "unknown" : d,
										0
									),
									(0, o.createVNode)(1, "h3", null, "Artifact Origin", 16),
									(0, o.createComponentVNode)(2, a.Flex, {
										direction: "column",
										wrap: "wrap",
										height: 3,
										children: C.map(function (e) {
											return (0, o.createComponentVNode)(
												2,
												a.Flex.Item,
												{
													onClick: function (t, n) {
														return i("origin", { newOrigin: e, hasPen: f });
													},
													children: [
														(0, o.createComponentVNode)(2, a.Button.Checkbox, {
															checked: u === e,
														}),
														(0, o.createVNode)(1, "a", null, e, 0),
													],
												},
												e.id
											);
										}),
									}),
									(0, o.createVNode)(1, "h3", null, "Artifact Type", 16),
									(0, o.createComponentVNode)(2, a.Flex, {
										direction: "column",
										wrap: "wrap",
										height: 25,
										justify: "space-evenly",
										children: N.map(function (e) {
											return (0, o.createComponentVNode)(
												2,
												a.Flex.Item,
												{
													className: "artifactType" + e[1],
													onClick: function (t, n) {
														return i("type", { newType: e[0], hasPen: f });
													},
													children: [
														(0, o.createComponentVNode)(2, a.Button.Checkbox, {
															checked: m === e[0],
														}),
														(0, o.createVNode)(1, "a", null, e[0], 0),
													],
												},
												e[0].id
											);
										}),
									}),
									(0, o.createVNode)(1, "h3", null, "Artifact Triggers", 16),
									(0, o.createComponentVNode)(2, a.Flex, {
										direction: "column",
										wrap: "wrap",
										height: 5,
										children: V.map(function (e) {
											return (0, o.createComponentVNode)(
												2,
												a.Flex.Item,
												{
													onClick: function (t, n) {
														return i("trigger", { newTriggers: e, hasPen: f });
													},
													children: [
														(0, o.createComponentVNode)(2, a.Button.Checkbox, {
															checked: s === e,
														}),
														(0, o.createVNode)(1, "a", null, e, 0),
													],
												},
												e.id
											);
										}),
									}),
									(0, o.createVNode)(1, "h3", null, "Artifact Faults", 16),
									(0, o.createComponentVNode)(2, a.TextArea, {
										value: p,
										fluid: !0,
										height: 5,
										onChange: function (e, t) {
											return i("fault", { newFaults: t, hasPen: f });
										},
									}),
									(0, o.createVNode)(
										1,
										"h3",
										null,
										"Additional Information",
										16
									),
									(0, o.createComponentVNode)(2, a.TextArea, {
										value: h,
										fluid: !0,
										height: 10,
										onChange: function (e, t) {
											return i("detail", { newDetail: t, hasPen: f });
										},
									}),
								],
							}),
						}),
					});
				};
			},
			42399: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AutoInjector = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(23827);
				t.AutoInjector = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.injectionAmount,
						m = d.reagentData,
						s = d.minimumTime,
						p = d.condition,
						h = d.conditionTreshold,
						C = d.conditionDamage,
						N = d.conditions;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 360,
						height: 520,
						theme: "neutral",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Contents",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										title: "Eject",
										icon: "eject",
										disabled: !m,
										onClick: function () {
											return l("remove_cont");
										},
										children: "Eject",
									}),
									children: m
										? (0, o.createFragment)(
												[
													(0, o.createComponentVNode)(2, i.ReagentGraph, {
														container: m,
													}),
													(0, o.createComponentVNode)(2, i.ReagentList, {
														container: m,
													}),
												],
												4
										  )
										: "Please attach a beaker",
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Condition",
									children: [
										(0, o.createComponentVNode)(2, a.Dropdown, {
											options: N,
											selected: p ? p.name : "None",
											onSelected: function (e) {
												return l("sel_cond", { condition: e });
											},
											noscroll: !0,
											width: "130px",
										}),
										h
											? (0, o.createFragment)(
													[
														C
															? (0, o.createComponentVNode)(2, a.Dropdown, {
																	options: ["brute", "burn", "toxin", "oxygen"],
																	selected: C.damagetype,
																	onSelected: function (e) {
																		return l("sel_damage_type", {
																			damagetype: e,
																		});
																	},
																	noscroll: !0,
																	width: "75px",
																	mt: "0.5rem",
															  })
															: null,
														(0, o.createComponentVNode)(2, a.Slider, {
															value: h.currentValue,
															format: function (e) {
																return e + h.suffix;
															},
															minValue: h.minValue,
															maxValue: h.maxValue,
															step: 1,
															onChange: function (e, t) {
																return l("changeConditionValue", {
																	conditionValue: t,
																});
															},
															mt: "0.5rem",
														}),
													],
													0
											  )
											: null,
										p
											? (0, o.createComponentVNode)(2, a.Box, {
													mt: "0.5rem",
													children: p.desc,
											  })
											: null,
									],
								}),
								m
									? (0, o.createComponentVNode)(2, a.Section, {
											title: "Injection Amount",
											children: (0, o.createComponentVNode)(2, a.Slider, {
												value: u,
												format: function (e) {
													return e + "u";
												},
												minValue: 1,
												maxValue: m.maxVolume,
												step: 1,
												onChange: function (e, t) {
													return l("changeAmount", { amount: t });
												},
											}),
									  })
									: null,
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Min. time between activations",
									children: (0, o.createComponentVNode)(2, a.Slider, {
										value: s,
										format: function (e) {
											return e + " seconds";
										},
										minValue: 3,
										maxValue: 300,
										step: 1,
										onChange: function (e, t) {
											return l("changeMintime", { mintime: t });
										},
									}),
								}),
							],
						}),
					});
				};
			},
			15748: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.BarcodeComputer = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = function (e, t) {
						var n = e.title,
							r = e.destinations,
							c = e.act,
							i = e.amount;
						return (0, o.createComponentVNode)(2, a.Section, {
							title: n,
							children: r.map(function (e) {
								var t = e.crate_tag,
									n = e.name;
								return (0, o.createComponentVNode)(
									2,
									a.Button,
									{
										width: "100%",
										align: "center",
										content: n || t,
										onClick: function () {
											return c("print", { crate_tag: t, amount: i });
										},
									},
									t
								);
							}),
						});
					},
					l = function (e, t) {
						if (e.card) {
							var n = e.card,
								r = e.act;
							return (0, o.createComponentVNode)(2, a.Button, {
								icon: "eject",
								content: n.name + " (" + n.role + ")",
								tooltip: "Clear scanned card",
								tooltipPosition: "bottom-end",
								onClick: function () {
									r("reset_id");
								},
							});
						}
					};
				t.BarcodeComputer = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.sections,
						s = u.card,
						p = (0, r.useLocalState)(t, "amount", 1),
						h = p[0],
						C = p[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Barcode computer",
						width: 600,
						height: 450,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.Stack, {
									children: [
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											grow: 1,
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Amount to print",
												fill: !0,
												children: (0, o.createComponentVNode)(2, a.Box, {
													align: "center",
													children: (0, o.createComponentVNode)(
														2,
														a.NumberInput,
														{
															value: h,
															minValue: 1,
															maxValue: 5,
															stepPixelSize: 15,
															unit: "Barcodes",
															onDrag: function (e, t) {
																return C(t);
															},
														}
													),
												}),
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											grow: 1,
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Scanned ID card",
												fill: !0,
												children: (0, o.createComponentVNode)(2, a.Box, {
													align: "center",
													children: [
														(0, o.createComponentVNode)(2, l, {
															card: s,
															act: d,
														}),
														(0, o.createVNode)(1, "br"),
														s ? "Account balance: $" + s.balance : null,
													],
												}),
											}),
										}),
									],
								}),
								(0, o.createVNode)(1, "br"),
								(0, o.createComponentVNode)(2, a.Stack, {
									children: m.map(function (e) {
										var t = e.title,
											n = e.destinations;
										return (0,
										o.createComponentVNode)(2, a.Stack.Item, { width: "33%", children: (0, o.createComponentVNode)(2, i, { title: t, destinations: n, act: d, amount: h }) }, t);
									}),
								}),
							],
						}),
					});
				};
			},
			93302: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.BugReportForm = t.InputTitle = t.Textarea = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(2882),
					i = n(85952),
					l = function (e, t) {
						return (0, o.createVNode)(128, "textarea", null, e.defaultText, 0, {
							rows: 4,
							style: {
								"overflow-y": "hidden",
								width: "100%",
								"background-color": "black",
								border: "solid 1px #6992c2",
								color: "white",
							},
							onInput: function (e) {
								(e.target.style.height = "auto"),
									(e.target.style.height = e.target.scrollHeight + "px");
							},
							id: e.id,
							placeholder: e.placeholder,
						});
					};
				t.Textarea = l;
				var d = function (e, t) {
					return (0, o.createVNode)(
						1,
						"h2",
						null,
						[
							e.children,
							e.required &&
								(0, o.createVNode)(1, "span", null, " *", 0, {
									style: { color: "red" },
								}),
						],
						0
					);
				};
				t.InputTitle = d;
				t.BugReportForm = function (e, t) {
					var n = (0, r.useBackend)(t),
						u = n.act,
						m = (n.data, (0, r.useLocalState)(t, "is_secret", !1)),
						s = m[0],
						p = m[1],
						h = (0, r.useLocalState)(t, "tag", "MINOR"),
						C = h[0],
						N = h[1];
					return (0, o.createComponentVNode)(2, i.Window, {
						title: "Bug Report Form",
						width: 600,
						height: 700,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								fill: !0,
								scrollable: !0,
								children: (0, o.createComponentVNode)(2, a.Flex, {
									direction: "column",
									height: "100%",
									children: [
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											style: { "text-align": "center" },
											children: (0, o.createVNode)(
												1,
												"a",
												null,
												"If you have a GitHub account click here instead",
												16,
												{
													href: "https://github.com/goonstation/goonstation/issues/new?assignees=&labels=&template=bug_report.yml",
													target: "_blank",
													rel: "noreferrer",
													style: { color: "#6992c2" },
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: [
												(0, o.createComponentVNode)(2, d, {
													required: !0,
													children: "Title",
												}),
												(0, o.createComponentVNode)(2, a.Input, {
													width: "100%",
													id: "title",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createVNode)(1, "h2", null, "Tags", 0),
												[
													[
														"Trivial",
														"TRIVIAL",
														"A bug that is extremely trivial, such as a spelling issue.",
													],
													[
														"Minor",
														"MINOR",
														"A bug that does not impact usage of a feature. These are often visual issues.",
													],
													[
														"Major",
														"MAJOR",
														"A bug that significantly impacts the usage of a feature.",
													],
													[
														"Critical",
														"CRITICAL",
														"A bug that significantly impacts the progression of the round.",
													],
												].map(function (e) {
													return (0, o.createComponentVNode)(
														2,
														c.ButtonCheckbox,
														{
															checked: e[1] === C,
															onClick: function () {
																return N(e[1]);
															},
															tooltip: e[2],
															tooltipPosition: "bottom",
															children: e[0],
														},
														e[1]
													);
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createComponentVNode)(2, d, {
													required: !0,
													children: "Description",
												}),
												"Give a short description of the bug",
												(0, o.createComponentVNode)(2, a.Input, {
													width: "100%",
													id: "description",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createComponentVNode)(2, d, {
													required: !0,
													children: "Steps To Reproduce",
												}),
												"Give a list of steps to reproduce this issue",
												(0, o.createComponentVNode)(2, l, {
													id: "steps",
													placeholder: "1.\n2.\n3.",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createComponentVNode)(2, d, {
													required: !0,
													children: "Expected Behavior",
												}),
												"Give a short description of what you expected to happen",
												(0, o.createComponentVNode)(2, a.Input, {
													width: "100%",
													id: "expected_behavior",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createVNode)(
													1,
													"h2",
													null,
													"Additional Information & Screenshots",
													0
												),
												"Add screenshots and any other information here",
												(0, o.createComponentVNode)(2, l, { id: "additional" }),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: [
												(0, o.createVNode)(
													1,
													"h2",
													null,
													"Is this bug an exploit or related to secret content?",
													0
												),
												(0, o.createComponentVNode)(2, c.ButtonCheckbox, {
													checked: s,
													onClick: function () {
														p(!s);
													},
													children: "Exploit / Secret",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											my: 2,
											children: (0, o.createComponentVNode)(2, a.Flex, {
												style: { "justify-content": "center" },
												children: [
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														mx: 1,
														children: (0, o.createVNode)(
															1,
															"div",
															"Button Button--color--default",
															"Submit",
															0,
															{
																onClick: function () {
																	var e = {};
																	(e.secret = s),
																		(e.tags = [C]),
																		(e.steps =
																			document.getElementById("steps").value),
																		(e.additional =
																			document.getElementById(
																				"additional"
																			).value),
																		(e.title = document
																			.getElementById("title")
																			.getElementsByTagName("input")[0].value),
																		(e.description = document
																			.getElementById("description")
																			.getElementsByTagName("input")[0].value),
																		(e.expected_behavior = document
																			.getElementById("expected_behavior")
																			.getElementsByTagName("input")[0].value),
																		e.title &&
																		e.description &&
																		e.expected_behavior &&
																		e.steps
																			? u("confirm", e)
																			: alert(
																					"Please fill out all required fields!"
																			  );
																},
															}
														),
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														mx: 1,
														children: (0, o.createVNode)(
															1,
															"div",
															"Button Button--color--default",
															"Cancel",
															0,
															{
																onClick: function () {
																	return u("cancel");
																},
															}
														),
													}),
												],
											}),
										}),
									],
								}),
							}),
						}),
					});
				};
			},
			26436: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.CharacterTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = function (e, t) {
						var n = e.id,
							c = e.color,
							i = e.style,
							l = (0, r.useBackend)(t),
							d = l.act;
						l.data;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.ColorButton, {
									color: c,
									onClick: function () {
										return d("update-detail-color", { id: n });
									},
								}),
								(0, o.createComponentVNode)(2, a.Button, {
									icon: "chevron-left",
									onClick: function () {
										return d("update-detail-style-cycle", {
											id: n,
											direction: -1,
										});
									},
								}),
								(0, o.createComponentVNode)(2, a.Button, {
									icon: "chevron-right",
									onClick: function () {
										return d("update-detail-style-cycle", {
											id: n,
											direction: 1,
										});
									},
								}),
								(0, o.createComponentVNode)(2, a.Button, {
									onClick: function () {
										return d("update-detail-style", { id: n });
									},
									children: i,
								}),
							],
							4
						);
					};
				t.CharacterTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data;
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, a.Section, {
								title: "Appearance",
								buttons: (0, o.createComponentVNode)(2, a.Button.Checkbox, {
									checked: l.randomAppearance,
									onClick: function () {
										return i("update-randomAppearance");
									},
									children: "Random appearance",
								}),
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Skin Tone",
											children: [
												(0, o.createComponentVNode)(2, a.ColorButton, {
													color: l.skinTone,
													onClick: function () {
														return i("update-skinTone");
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "angle-double-left",
													onClick: function () {
														return i("decrease-skinTone", { alot: 1 });
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "chevron-left",
													onClick: function () {
														return i("decrease-skinTone");
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "chevron-right",
													onClick: function () {
														return i("increase-skinTone");
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "angle-double-right",
													onClick: function () {
														return i("increase-skinTone", { alot: 1 });
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Eye Color",
											children: (0, o.createComponentVNode)(2, a.ColorButton, {
												color: l.eyeColor,
												onClick: function () {
													return i("update-eyeColor");
												},
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Top Detail",
											children: (0, o.createComponentVNode)(2, c, {
												id: "custom3",
												color: l.customColor3,
												style: l.customStyle3,
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Middle Detail",
											children: (0, o.createComponentVNode)(2, c, {
												id: "custom2",
												color: l.customColor2,
												style: l.customStyle2,
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Bottom Detail",
											children: (0, o.createComponentVNode)(2, c, {
												id: "custom1",
												color: l.customColor1,
												style: l.customStyle1,
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Special Style",
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: function () {
													return i("update-specialStyle");
												},
												children: l.specialStyle || "default",
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Underwear",
											children: (0, o.createComponentVNode)(2, c, {
												id: "underwear",
												color: l.underwearColor,
												style: l.underwearStyle,
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Divider),
									],
								}),
							}),
							(0, o.createComponentVNode)(2, a.Section, {
								title: "Sounds",
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Fart",
											children: [
												(0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														return i("update-fartsound");
													},
													children: l.fartsound,
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "volume-up",
													onClick: function () {
														return i("previewSound", { fartsound: 1 });
													},
													children: "Preview",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Scream",
											children: [
												(0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														return i("update-screamsound");
													},
													children: l.screamsound,
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "volume-up",
													onClick: function () {
														return i("previewSound", { screamsound: 1 });
													},
													children: "Preview",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Chat",
											children: [
												(0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														return i("update-chatsound");
													},
													children: l.chatsound,
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "volume-up",
													onClick: function () {
														return i("previewSound", { chatsound: 1 });
													},
													children: "Preview",
												}),
											],
										}),
									],
								}),
							}),
						],
						4
					);
				};
			},
			50669: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GameSettingsTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(55958);
				t.GameSettingsTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data;
					return (0, o.createComponentVNode)(2, a.Section, {
						children: (0, o.createComponentVNode)(2, a.LabeledList, {
							children: [
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Popup Font Size",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										onClick: function () {
											return i("update-fontSize", { reset: 1 });
										},
										children: "Reset",
									}),
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"Changes the font size used in popup windows. Only works when CHUI is disabled.",
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											onClick: function () {
												return i("update-fontSize");
											},
											children: l.fontSize ? l.fontSize + "%" : "Default",
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Messages",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"Toggles if certain messages are shown in the chat window by default. You can change these mid-round by using the Toggle OOC/LOOC commands under the Commands tab in the top right.",
										}),
										l.isMentor
											? (0, o.createComponentVNode)(2, a.Box, {
													mb: "5px",
													children: (0, o.createComponentVNode)(
														2,
														a.Button.Checkbox,
														{
															checked: l.seeMentorPms,
															onClick: function () {
																return i("update-seeMentorPms");
															},
															children: "Display Mentorhelp",
														}
													),
											  })
											: null,
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.listenOoc,
													onClick: function () {
														return i("update-listenOoc");
													},
													tooltip:
														"Out-of-Character chat. This mostly just shows up on the RP server and at the end of rounds.",
													children: "Display OOC chat",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.listenLooc,
													onClick: function () {
														return i("update-listenLooc");
													},
													tooltip:
														"Local Out-of-Character is OOC chat, but only appears for nearby players. This is basically only used on the RP server.",
													children: "Display LOOC chat",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: !l.flyingChatHidden,
													onClick: function () {
														return i("update-flyingChatHidden");
													},
													tooltip:
														"Chat messages will appear over characters as they're talking.",
													children: "See chat above people's heads",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.autoCapitalization,
													onClick: function () {
														return i("update-autoCapitalization");
													},
													tooltip:
														"Chat messages you send will be automatically capitalized.",
													children: "Auto-capitalize your messages",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.localDeadchat,
													onClick: function () {
														return i("update-localDeadchat");
													},
													tooltip:
														"You'll only hear chat messages from living people on your screen as a ghost.",
													children: "Local ghost hearing",
												}
											),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "HUD Theme",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: function () {
													return i("update-hudTheme");
												},
												children: "Change",
											}),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											children: (0, o.createComponentVNode)(2, a.Image, {
												pixelated: !0,
												src: "data:image/png;base64," + l.hudThemePreview,
												width: "32px",
												height: "32px",
											}),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Targeting Cursor",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: function () {
													return i("update-targetingCursor");
												},
												children: "Change",
											}),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											children: (0, o.createComponentVNode)(2, a.Image, {
												pixelated: !0,
												src:
													"data:image/png;base64," + l.targetingCursorPreview,
												width: "32px",
												height: "32px",
											}),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Tooltips",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"Tooltips can appear when hovering over items. These tooltips can provide bits of information about the item, such as attack strength, special moves, etc.",
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked:
														l.tooltipOption ===
														c.CharacterPreferencesTooltip.Always,
													onClick: function () {
														return i("update-tooltipOption", {
															value: c.CharacterPreferencesTooltip.Always,
														});
													},
													children: "Show Always",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked:
														l.tooltipOption ===
														c.CharacterPreferencesTooltip.Alt,
													onClick: function () {
														return i("update-tooltipOption", {
															value: c.CharacterPreferencesTooltip.Alt,
														});
													},
													children: "Show When ALT is held",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked:
														l.tooltipOption ===
														c.CharacterPreferencesTooltip.Never,
													onClick: function () {
														return i("update-tooltipOption", {
															value: c.CharacterPreferencesTooltip.Never,
														});
													},
													children: "Never Show",
												}
											),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "tgui",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"TGUI is the UI framework we use for some game windows, and it comes with options!",
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.tguiFancy,
													onClick: function () {
														return i("update-tguiFancy");
													},
													children:
														"Makes TGUI windows look better, at the cost of compatibility.",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.tguiLock,
													onClick: function () {
														return i("update-tguiLock");
													},
													children: "Locks TGUI windows to your main monitor.",
												}
											),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Popups",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"These options toggle the popups that appear when logging in and at the end of a round.",
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.viewChangelog,
													onClick: function () {
														return i("update-viewChangelog");
													},
													tooltip:
														"The changelog can be shown at any time by using the 'Changelog' command, under the Commands tab in the top right.",
													tooltipPosition: "top",
													children: "Auto-open changelog",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.viewScore,
													onClick: function () {
														return i("update-viewScore");
													},
													tooltip:
														"The end-of-round scoring shows various stats on how the round went. If this option is off, you won't be able to see it.",
													tooltipPosition: "top",
													children: "Auto-open end-of-round score",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.viewTickets,
													onClick: function () {
														return i("update-viewTickets");
													},
													tooltip:
														"The end-of-round ticketing summary shows the various tickets and fines that were handed out. If this option is off, you can still see them on Goonhub (goonhub.com).",
													tooltipPosition: "top",
													children: "Auto-open end-of-round ticket summary",
												}
											),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Controls",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											color: "label",
											children:
												"Various options for how you control your character and the game.",
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.useClickBuffer,
													onClick: function () {
														return i("update-useClickBuffer");
													},
													tooltip:
														"There is a cooldown after clicking on things in-game. When enabled, if you click something during this cooldown, the game will apply that click after the cooldown. Otherwise, the click is ignored.",
													tooltipPosition: "top",
													children: "Queue Combat Clicks",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.useWasd,
													onClick: function () {
														return i("update-useWasd");
													},
													tooltip:
														"Enabling this allows you to use WASD to move instead of the arrow keys, and enables a few other hotkeys.",
													tooltipPosition: "top",
													children: "Use WASD Mode",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mb: "5px",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.useAzerty,
													onClick: function () {
														return i("update-useAzerty");
													},
													tooltip:
														"If you have an AZERTY keyboard, enable this. Yep. This sure is a tooltip.",
													tooltipPosition: "top",
													children: "Use AZERTY Keyboard Layout",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											color: "label",
											children:
												"Familiar with /tg/station controls? You can enable/disable them under the Game/Interface menu in the top left.",
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.LabeledList.Item, {
									label: "Preferred Map",
									children: (0, o.createComponentVNode)(2, a.Button, {
										onClick: function () {
											return i("update-preferredMap");
										},
										children: l.preferredMap
											? l.preferredMap
											: (0, o.createComponentVNode)(2, a.Box, {
													italic: !0,
													children: "None",
											  }),
									}),
								}),
							],
						}),
					});
				};
			},
			94123: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GeneralTab = void 0);
				var o = n(39812),
					r = n(2497),
					a = n(71494),
					c = n(74814);
				t.GeneralTab = function (e, t) {
					var n,
						i = (0, a.useBackend)(t),
						l = i.act,
						d = i.data;
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, c.Section, {
								title: "Records",
								children: (0, o.createComponentVNode)(2, c.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Name",
											buttons: (0, o.createComponentVNode)(
												2,
												c.Button.Checkbox,
												{
													checked: d.randomName,
													onClick: function () {
														return l("update-randomName");
													},
													children: "Random",
												}
											),
											children: [
												(0, o.createComponentVNode)(2, c.Button, {
													onClick: function () {
														return l("update-nameFirst");
													},
													children: d.nameFirst,
												}),
												(0, o.createComponentVNode)(2, c.Button, {
													onClick: function () {
														return l("update-nameMiddle");
													},
													color: "" === d.nameMiddle ? "grey" : "default",
													children:
														"" !== d.nameMiddle
															? d.nameMiddle
															: (0, o.createComponentVNode)(2, c.Box, {
																	italic: !0,
																	children: "None",
															  }),
												}),
												(0, o.createComponentVNode)(2, c.Button, {
													onClick: function () {
														return l("update-nameLast");
													},
													children: d.nameLast,
												}),
											],
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Gender",
											children: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-gender");
												},
												children: d.gender,
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Pronouns",
											children: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-pronouns");
												},
												children: d.pronouns,
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Age",
											children: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-age");
												},
												children: d.age,
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Blood Type",
											children: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-bloodType");
												},
												children: d.bloodRandom
													? (0, o.createComponentVNode)(2, c.Box, {
															as: "span",
															italic: !0,
															children: "Random",
													  })
													: d.bloodType,
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Bank PIN",
											buttons: (0, o.createComponentVNode)(
												2,
												c.Button.Checkbox,
												{
													checked: !d.pin,
													onClick: function () {
														return l("update-pin", { random: !!d.pin });
													},
													children: "Random",
												}
											),
											children: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-pin");
												},
												children:
													null != (n = d.pin)
														? n
														: (0, o.createComponentVNode)(2, c.Box, {
																as: "span",
																italic: !0,
																children: "Random",
														  }),
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Flavor Text",
											buttons: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-flavorText");
												},
												icon: "wrench",
												children: "Edit",
											}),
											children: (0, o.createComponentVNode)(2, c.BlockQuote, {
												children: d.flavorText
													? (0, r.decodeHtmlEntities)(d.flavorText)
													: (0, o.createComponentVNode)(2, c.Box, {
															italic: !0,
															children: "None",
													  }),
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Security Note",
											buttons: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-securityNote");
												},
												icon: "wrench",
												children: "Edit",
											}),
											children: (0, o.createComponentVNode)(2, c.BlockQuote, {
												children: d.securityNote
													? (0, r.decodeHtmlEntities)(d.securityNote)
													: (0, o.createComponentVNode)(2, c.Box, {
															italic: !0,
															children: "None",
													  }),
											}),
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Medical Note",
											buttons: (0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return l("update-medicalNote");
												},
												icon: "wrench",
												children: "Edit",
											}),
											children: (0, o.createComponentVNode)(2, c.BlockQuote, {
												children: d.medicalNote
													? (0, r.decodeHtmlEntities)(d.medicalNote)
													: (0, o.createComponentVNode)(2, c.Box, {
															italic: !0,
															children: "None",
													  }),
											}),
										}),
									],
								}),
							}),
							(0, o.createComponentVNode)(2, c.Section, {
								title: "Other names",
								children: (0, o.createComponentVNode)(2, c.LabeledList, {
									children: (0, o.createComponentVNode)(2, c.LabeledList.Item, {
										label: "Preferred Cyborg Name",
										children: (0, o.createComponentVNode)(2, c.Button, {
											onClick: function () {
												return l("update-robotName");
											},
											color: d.robotName ? "default" : "grey",
											children: d.robotName
												? d.robotName
												: (0, o.createComponentVNode)(2, c.Box, {
														italic: !0,
														children: "None",
												  }),
										}),
									}),
								}),
							}),
							(0, o.createComponentVNode)(2, c.Section, {
								title: "PDA",
								children: (0, o.createComponentVNode)(2, c.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Ringtone",
											children: [
												(0, o.createComponentVNode)(2, c.Button, {
													onClick: function () {
														return l("update-pdaRingtone");
													},
													children: d.pdaRingtone,
												}),
												(0, o.createComponentVNode)(2, c.Button, {
													onClick: function () {
														return l("previewSound", { pdaRingtone: 1 });
													},
													icon: "volume-up",
													children: "Preview",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Background Color",
											children: (0, o.createComponentVNode)(2, c.ColorButton, {
												color: d.pdaColor,
												onClick: function () {
													return l("update-pdaColor");
												},
											}),
										}),
									],
								}),
							}),
						],
						4
					);
				};
			},
			6489: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.SavesTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.SavesTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data;
					return (0, o.createComponentVNode)(2, a.Section, {
						title: "Cloud Saves",
						children: l.cloudSaves
							? (0, o.createFragment)(
									[
										l.cloudSaves.map(function (e, t) {
											return (0,
											o.createFragment)([(0, o.createComponentVNode)(2, c, { name: e, index: t }), (0, o.createComponentVNode)(2, a.Divider)], 4, e);
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											mt: "5px",
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: function () {
													return i("cloud-new");
												},
												children: "Create new save",
											}),
										}),
									],
									0
							  )
							: (0, o.createComponentVNode)(2, a.Box, {
									italic: !0,
									color: "label",
									children: "Cloud saves could not be loaded.",
							  }),
					});
				};
				var c = function (e, t) {
					var n = e.name,
						c = e.index,
						i = (0, r.useBackend)(t).act;
					return (0, o.createComponentVNode)(2, a.LabeledList, {
						children: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
							label: "Cloud save " + (c + 1),
							buttons: (0, o.createFragment)(
								[
									(0, o.createComponentVNode)(2, a.Button, {
										onClick: function () {
											return i("cloud-load", { name: n });
										},
										children: "Load",
									}),
									(0, o.createTextVNode)(" -"),
									(0, o.createTextVNode)(" "),
									(0, o.createComponentVNode)(2, a.Button, {
										onClick: function () {
											return i("cloud-save", { name: n });
										},
										children: "Save",
									}),
									(0, o.createTextVNode)(" -"),
									(0, o.createTextVNode)(" "),
									(0, o.createComponentVNode)(2, a.Button.Confirm, {
										onClick: function () {
											return i("cloud-delete", { name: n });
										},
										content: "Delete",
									}),
								],
								0
							),
							children: n,
						}),
					});
				};
			},
			86890: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.TraitsTab = void 0);
				var o = n(39812),
					r = n(2497),
					a = n(71494),
					c = n(74814),
					i = n(2882);
				function l(e, t) {
					var n =
						("undefined" != typeof Symbol && e[Symbol.iterator]) ||
						e["@@iterator"];
					if (n) return (n = n.call(e)).next.bind(n);
					if (
						Array.isArray(e) ||
						(n = (function (e, t) {
							if (!e) return;
							if ("string" == typeof e) return d(e, t);
							var n = Object.prototype.toString.call(e).slice(8, -1);
							"Object" === n && e.constructor && (n = e.constructor.name);
							if ("Map" === n || "Set" === n) return Array.from(e);
							if (
								"Arguments" === n ||
								/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							)
								return d(e, t);
						})(e)) ||
						(t && e && "number" == typeof e.length)
					) {
						n && (e = n);
						var o = 0;
						return function () {
							return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				function d(e, t) {
					(null == t || t > e.length) && (t = e.length);
					for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
					return o;
				}
				var u = function (e, t) {
					return e.name.localeCompare(t.name, "en", { sensitivity: "base" });
				};
				t.TraitsTab = function (e, t) {
					for (
						var n,
							r = (0, a.useBackend)(t),
							d = r.act,
							s = r.data,
							p = (0, a.useLocalState)(t, "filter-available", !1),
							h = p[0],
							C = p[1],
							N = {},
							V = l(
								s.traitsAvailable.map(function (e) {
									return Object.assign({}, e, s.traitsData[e.id]);
								})
							);
						!(n = V()).done;

					)
						for (
							var f,
								g = n.value,
								b = l(
									g.category && g.category.length > 0
										? g.category
										: ["uncategorized"]
								);
							!(f = b()).done;

						) {
							var v = f.value;
							N[v] || (N[v] = []), N[v].push(g);
						}
					var k = Object.keys(N).sort();
					k.includes("uncategorized") &&
						(k = [].concat(
							k.filter(function (e) {
								return "uncategorized" !== e;
							}),
							["uncategorized"]
						));
					var x = s.traitsAvailable.filter(function (e) {
						return e.selected;
					}).length;
					return (0, o.createComponentVNode)(2, c.Section, {
						fill: !0,
						children: (0, o.createComponentVNode)(2, c.Stack, {
							vertical: !0,
							fill: !0,
							children: [
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									children: [
										(0, o.createComponentVNode)(2, c.Box, {
											children: [
												"Available points:",
												" ",
												(0, o.createComponentVNode)(2, c.Box, {
													as: "span",
													color: s.traitsPointsTotal > 0 ? "good" : "bad",
													children: s.traitsPointsTotal,
												}),
											],
										}),
										(0, o.createComponentVNode)(2, c.Divider),
									],
								}),
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									grow: !0,
									children: (0, o.createComponentVNode)(2, c.Stack, {
										fill: !0,
										children: [
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												grow: !0,
												basis: 0,
												children: (0, o.createComponentVNode)(2, c.Section, {
													title: "Available",
													fill: !0,
													scrollable: !0,
													buttons: (0, o.createComponentVNode)(
														2,
														i.ButtonCheckbox,
														{
															checked: h,
															onClick: function () {
																return C(!h);
															},
															children: "Filter available",
														}
													),
													children: k.map(function (e) {
														var t = N[e];
														return (0, o.createComponentVNode)(
															2,
															m,
															{
																category: e,
																traits: t
																	.filter(function (e) {
																		return !e.selected;
																	})
																	.filter(function (e) {
																		return !h || e.available;
																	})
																	.sort(u),
															},
															e
														);
													}),
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												children: (0, o.createComponentVNode)(2, c.Divider, {
													vertical: !0,
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												grow: !0,
												basis: 0,
												children: (0, o.createComponentVNode)(2, c.Section, {
													title: "Selected (" + x + "/" + s.traitsMax + ")",
													fill: !0,
													scrollable: !0,
													buttons: (0, o.createComponentVNode)(2, c.Button, {
														onClick: function () {
															return d("reset-traits");
														},
														children: "Reset traits",
													}),
													children: k.map(function (e) {
														var t = N[e];
														return (0, o.createComponentVNode)(
															2,
															m,
															{
																category: e,
																traits: t
																	.filter(function (e) {
																		return e.selected;
																	})
																	.sort(u),
															},
															e
														);
													}),
												}),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
				var m = function (e, t) {
						var n = e.category,
							a = e.traits;
						return 0 === a.length
							? null
							: (0, o.createComponentVNode)(2, c.Collapsible, {
									title: (0, r.toTitleCase)(n),
									open: !0,
									children: a.map(function (e, t) {
										return (0,
										o.createFragment)([0 !== t && (0, o.createComponentVNode)(2, c.Divider), (0, o.normalizeProps)((0, o.createComponentVNode)(2, s, Object.assign({}, e)))], 0, e.id);
									}),
							  });
					},
					s = function (e, t) {
						var n = (0, a.useBackend)(t).act,
							r = e.id,
							i = e.name,
							l = e.desc,
							d = e.points,
							u = e.selected,
							m = e.available,
							s = e.img;
						return (0, o.createComponentVNode)(2, c.Stack, {
							children: [
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									children: (0, o.createComponentVNode)(2, c.Image, {
										pixelated: !0,
										width: "32px",
										height: "32px",
										src: "data:image/png;base64," + s,
										backgroundColor: "transparent",
									}),
								}),
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									grow: 1,
									children: [
										(0, o.createComponentVNode)(2, c.Stack, {
											align: "center",
											mb: 1,
											children: [
												(0, o.createComponentVNode)(2, c.Stack.Item, {
													grow: !0,
													children: [
														i,
														" ",
														(0, o.createComponentVNode)(2, c.Box, {
															as: "span",
															color: d < 0 ? "bad" : d > 0 ? "good" : "label",
															children: ["(", d > 0 ? "+" : "", d, ")"],
														}),
													],
												}),
												(0, o.createComponentVNode)(2, c.Stack.Item, {
													children: (0, o.createComponentVNode)(2, c.Button, {
														disabled: !m,
														icon: u ? "minus" : "plus",
														onClick: function () {
															return n(u ? "unselect-trait" : "select-trait", {
																id: r,
															});
														},
														children: u ? "Remove" : "Add",
													}),
												}),
											],
										}),
										(0, o.createComponentVNode)(2, c.BlockQuote, {
											children: l,
										}),
									],
								}),
							],
						});
					};
			},
			91245: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.CharacterPreferences = void 0);
				var o = n(39812),
					r = n(29708),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = n(26436),
					d = n(50669),
					u = n(94123),
					m = n(6489),
					s = n(86890),
					p = n(55958),
					h = 0;
				t.CharacterPreferences = function (e, t) {
					var n = (0, a.useBackend)(t),
						N = n.act,
						V = n.data,
						f = (0, a.useLocalState)(
							t,
							"menu",
							p.CharacterPreferencesTabKeys.General
						),
						g = f[0],
						b = f[1];
					return (0, o.createComponentVNode)(2, i.Window, {
						width: 600,
						height: 750,
						title: "Character Setup",
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							onKeyDown: function (e) {
								if (
									!(
										(g !== p.CharacterPreferencesTabKeys.General &&
											g !== p.CharacterPreferencesTabKeys.Character) ||
										(e.keyCode !== r.KEY_LEFT && e.keyCode !== r.KEY_RIGHT)
									)
								) {
									if ((e.preventDefault(), h > performance.now())) return;
									h = performance.now() + 125;
									var t = "rotate-counter-clockwise";
									e.keyCode === r.KEY_RIGHT && (t = "rotate-clockwise"), N(t);
								}
							},
							children: (0, o.createComponentVNode)(2, c.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: (0, o.createComponentVNode)(2, C),
									}),
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: (0, o.createComponentVNode)(2, c.Tabs, {
											children: [
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													selected: g === p.CharacterPreferencesTabKeys.General,
													onClick: function () {
														return b(p.CharacterPreferencesTabKeys.General);
													},
													children: "General",
												}),
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													selected:
														g === p.CharacterPreferencesTabKeys.Character,
													onClick: function () {
														return b(p.CharacterPreferencesTabKeys.Character);
													},
													children: "Appearance",
												}),
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													onClick: function () {
														return N("open-occupation-window");
													},
													children: "Occupation",
												}),
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													selected: g === p.CharacterPreferencesTabKeys.Traits,
													onClick: function () {
														return b(p.CharacterPreferencesTabKeys.Traits);
													},
													children: "Traits",
												}),
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													selected:
														g === p.CharacterPreferencesTabKeys.GameSettings,
													onClick: function () {
														return b(
															p.CharacterPreferencesTabKeys.GameSettings
														);
													},
													children: "Game Settings",
												}),
												(0, o.createComponentVNode)(2, c.Tabs.Tab, {
													selected: g === p.CharacterPreferencesTabKeys.Saves,
													onClick: function () {
														return b(p.CharacterPreferencesTabKeys.Saves);
													},
													children: "Cloud Saves",
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										grow: "1",
										children: [
											(g === p.CharacterPreferencesTabKeys.General ||
												g === p.CharacterPreferencesTabKeys.Character) &&
												(0, o.createComponentVNode)(2, c.Stack, {
													fill: !0,
													children: [
														(0, o.createComponentVNode)(2, c.Stack.Item, {
															basis: 0,
															grow: "1",
															children: (0, o.createComponentVNode)(
																2,
																c.Section,
																{
																	scrollable: !0,
																	fill: !0,
																	children: [
																		g ===
																			p.CharacterPreferencesTabKeys.General &&
																			(0, o.createComponentVNode)(
																				2,
																				u.GeneralTab
																			),
																		g ===
																			p.CharacterPreferencesTabKeys.Character &&
																			(0, o.createComponentVNode)(
																				2,
																				l.CharacterTab
																			),
																	],
																}
															),
														}),
														(0, o.createComponentVNode)(2, c.Stack.Item, {
															children: (0, o.createComponentVNode)(
																2,
																c.Section,
																{
																	fill: !0,
																	children: [
																		(0, o.createComponentVNode)(2, c.ByondUi, {
																			params: { id: V.preview, type: "map" },
																			style: { width: "64px", height: "128px" },
																		}),
																		(0, o.createComponentVNode)(2, c.Box, {
																			textAlign: "center",
																			mt: "5px",
																			children: [
																				(0, o.createComponentVNode)(
																					2,
																					c.Button,
																					{
																						icon: "chevron-left",
																						onClick: function () {
																							return N(
																								"rotate-counter-clockwise"
																							);
																						},
																					}
																				),
																				(0, o.createComponentVNode)(
																					2,
																					c.Button,
																					{
																						icon: "chevron-right",
																						onClick: function () {
																							return N("rotate-clockwise");
																						},
																					}
																				),
																			],
																		}),
																	],
																}
															),
														}),
													],
												}),
											(g === p.CharacterPreferencesTabKeys.GameSettings ||
												g === p.CharacterPreferencesTabKeys.Saves) &&
												(0, o.createComponentVNode)(2, c.Section, {
													scrollable: !0,
													fill: !0,
													children: [
														g === p.CharacterPreferencesTabKeys.GameSettings &&
															(0, o.createComponentVNode)(2, d.GameSettingsTab),
														g === p.CharacterPreferencesTabKeys.Saves &&
															(0, o.createComponentVNode)(2, m.SavesTab),
													],
												}),
											g === p.CharacterPreferencesTabKeys.Traits &&
												(0, o.createComponentVNode)(2, s.TraitsTab),
										],
									}),
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: (0, o.createComponentVNode)(2, c.Section, {
											children: (0, o.createComponentVNode)(
												2,
												c.Button.Confirm,
												{
													content: "Reset All",
													onClick: function () {
														return N("reset");
													},
												}
											),
										}),
									}),
								],
							}),
						}),
					});
				};
				var C = function (e, t) {
						var n = (0, a.useBackend)(t),
							r = n.act,
							i = n.data,
							l = i.profiles.findIndex(function (e) {
								return e.active;
							});
						return (0, o.createComponentVNode)(2, c.Stack, {
							vertical: !0,
							children: [
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									children: (0, o.createComponentVNode)(2, c.Stack, {
										children: i.profiles.map(function (e, t) {
											return (0,
											o.createComponentVNode)(2, c.Stack.Item, { basis: 0, grow: 1, children: (0, o.createComponentVNode)(2, N, { profile: e, index: t }) }, t);
										}),
									}),
								}),
								(0, o.createComponentVNode)(2, c.Stack.Item, {
									children: (0, o.createComponentVNode)(2, c.Section, {
										children: (0, o.createComponentVNode)(2, c.LabeledList, {
											children: (0, o.createComponentVNode)(
												2,
												c.LabeledList.Item,
												{
													label: "Profile Name",
													buttons:
														l > -1
															? (0, o.createFragment)(
																	[
																		(0, o.createComponentVNode)(2, c.Button, {
																			onClick: function () {
																				return r("load", { index: l + 1 });
																			},
																			children: "Reload",
																		}),
																		" - ",
																		(0, o.createComponentVNode)(2, c.Button, {
																			onClick: function () {
																				return r("save", { index: l + 1 });
																			},
																			icon: i.profileModified
																				? "exclamation-triangle"
																				: undefined,
																			color: i.profileModified
																				? "danger"
																				: undefined,
																			tooltip: i.profileModified
																				? "You may have unsaved changes! Any unsaved changes will take effect for this round only."
																				: undefined,
																			tooltipPosition: "left",
																			children: "Save",
																		}),
																	],
																	0
															  )
															: null,
													children: (0, o.createComponentVNode)(2, c.Button, {
														onClick: function () {
															return r("update-profileName");
														},
														children: i.profileName
															? i.profileName
															: (0, o.createComponentVNode)(2, c.Box, {
																	italic: !0,
																	children: "None",
															  }),
													}),
												}
											),
										}),
									}),
								}),
							],
						});
					},
					N = function (e, t) {
						var n = e.index,
							r = e.profile,
							i = (0, a.useBackend)(t).act;
						return (0, o.createComponentVNode)(2, c.Section, {
							title: "Profile " + (n + 1),
							textAlign: "center",
							backgroundColor: r.active ? "rgba(0, 0, 0, 0.10)" : null,
							fill: !0,
							children: (0, o.createComponentVNode)(2, c.Stack, {
								vertical: !0,
								fill: !0,
								justify: "space-between",
								children: [
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: (0, o.createComponentVNode)(2, c.Box, {
											children: r.name
												? (0, o.createComponentVNode)(2, c.Box, {
														children: r.name,
												  })
												: (0, o.createComponentVNode)(2, c.Box, {
														italic: !0,
														color: "label",
														children: "Empty",
												  }),
										}),
									}),
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: [
											(0, o.createComponentVNode)(2, c.Button, {
												disabled: !r.name,
												onClick: function () {
													return i("load", { index: n + 1 });
												},
												children: "Load",
											}),
											" - ",
											(0, o.createComponentVNode)(2, c.Button, {
												onClick: function () {
													return i("save", { index: n + 1 });
												},
												children: "Save",
											}),
										],
									}),
								],
							}),
						});
					};
			},
			55958: function (e, t) {
				"use strict";
				var n, o;
				(t.__esModule = !0),
					(t.CharacterPreferencesTooltip = t.CharacterPreferencesTabKeys =
						void 0),
					(t.CharacterPreferencesTabKeys = n),
					(function (e) {
						(e[(e.Saves = 0)] = "Saves"),
							(e[(e.General = 1)] = "General"),
							(e[(e.Character = 2)] = "Character"),
							(e[(e.Traits = 3)] = "Traits"),
							(e[(e.GameSettings = 4)] = "GameSettings");
					})(n || (t.CharacterPreferencesTabKeys = n = {})),
					(t.CharacterPreferencesTooltip = o),
					(function (e) {
						(e[(e.Always = 1)] = "Always"),
							(e[(e.Never = 2)] = "Never"),
							(e[(e.Alt = 3)] = "Alt");
					})(o || (t.CharacterPreferencesTooltip = o = {}));
			},
			22223: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.ChemGroups =
						t.BeakerContentsGraph =
						t.Beaker =
						t.ReagentDispenser =
						t.ChemDispenser =
							void 0);
				var o,
					r = n(39812),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = 2,
					d = 3,
					u =
						(((o = {})[1] = { icon: "square", pr: 0.5 }),
						(o[l] = { icon: "tint", pr: 0.9 }),
						(o[d] = { icon: "wind", pr: 0.5 }),
						o);
				t.ChemDispenser = function (e, t) {
					var n = (0, a.useBackend)(t).data.beakerContents;
					return (0, r.createComponentVNode)(2, i.Window, {
						width: 570,
						height: 705,
						theme: "ntos",
						children: (0, r.createComponentVNode)(2, i.Window.Content, {
							scrollable: !0,
							children: (0, r.createComponentVNode)(2, c.Box, {
								children: [
									(0, r.createComponentVNode)(2, m),
									(0, r.createComponentVNode)(2, s),
									!!n.length && (0, r.createComponentVNode)(2, p),
									(0, r.createComponentVNode)(2, h),
								],
							}),
						}),
					});
				};
				var m = function (e, t) {
					var n = (0, a.useBackend)(t),
						o = n.act,
						i = n.data,
						l = i.beakerName,
						d = i.currentBeakerName,
						m = i.maximumBeakerVolume,
						s = i.beakerTotalVolume,
						p = (0, a.useSharedState)(t, "addAmount", 10),
						h = p[0],
						C = p[1],
						N = (0, a.useSharedState)(t, "iconToggle", !1),
						V = N[0],
						f = N[1],
						g = (0, a.useLocalState)(t, "hoverOver", ""),
						b = g[0],
						v = g[1],
						k = i.dispensableReagents || [];
					return (0, r.createComponentVNode)(2, c.Section, {
						fontSize: "12px",
						title: (0, r.createFragment)(
							[
								(0, r.createTextVNode)("Dispense"),
								(0, r.createComponentVNode)(2, c.Box, {
									as: "span",
									ml: 18,
									children: [
										"Icons:",
										(0, r.createComponentVNode)(2, c.Button, {
											width: 2,
											textAlign: "center",
											backgroundColor: "rgba(0, 0, 0, 0)",
											textColor: V
												? "rgba(255, 255, 255, 0.5)"
												: "rgba(255, 255, 255, 1)",
											onClick: function () {
												return f(!1);
											},
											children: (0, r.createComponentVNode)(2, c.Icon, {
												mr: 1,
												name: "circle",
											}),
										}),
										(0, r.createComponentVNode)(2, c.Button, {
											width: 2,
											backgroundColor: "rgba(0, 0, 0, 0)",
											textColor: V
												? "rgba(255, 255, 255, 1)"
												: "rgba(255, 255, 255, 0.5)",
											onClick: function () {
												return f(!0);
											},
											children: (0, r.createComponentVNode)(2, c.Icon, {
												name: "tint",
											}),
										}),
									],
								}),
							],
							4
						),
						buttons: (0, r.createComponentVNode)(2, c.Box, {
							children: [
								"Dispense Amount: ",
								(0, r.createComponentVNode)(2, c.NumberInput, {
									value: h,
									format: function (e) {
										return e + "u";
									},
									width: 4,
									minValue: 1,
									maxValue: 100,
									onDrag: function (e, t) {
										return C(t);
									},
								}),
							],
						}),
						children: [
							(0, r.createComponentVNode)(2, c.Section, {
								fitted: !0,
								backgroundColor: "rgba(0,0,0,0)",
								children: [
									(!m || m === s) &&
										(0, r.createComponentVNode)(2, c.Modal, {
											className: "chem-dispenser__labels",
											fontSize: "20px",
											mr: 2,
											p: 3,
											children: (0, r.createComponentVNode)(2, c.Box, {
												children:
													(!m && "No " + l + " Inserted") || d + " Full",
											}),
										}),
									k.map(function (e, t) {
										return (0, r.createComponentVNode)(
											2,
											c.Button,
											{
												className: "chem-dispenser__dispense-buttons",
												align: "left",
												width: "130px",
												onMouseEnter: function () {
													return v(e.id);
												},
												onMouseLeave: function () {
													return v("");
												},
												disabled: m === s,
												lineHeight: 1.75,
												onClick: function () {
													return o("dispense", { amount: h, reagentId: e.id });
												},
												children: [
													(0, r.createComponentVNode)(2, c.Icon, {
														color:
															"rgba(" +
															e.colorR +
															"," +
															e.colorG +
															", " +
															e.colorB +
															", 1)",
														name: V ? u[e.state].icon : "circle",
														pt: 1,
														style: { "text-shadow": "0 0 3px #000" },
													}),
													e.name,
												],
											},
											t
										);
									}),
								],
							}),
							(0, r.createComponentVNode)(2, c.Box, {
								italic: !0,
								pt: 0.5,
								children: [" ", "Reagent ID: " + b],
							}),
						],
					});
				};
				t.ReagentDispenser = m;
				var s = function (e, t) {
					var n = (0, a.useBackend)(t),
						o = n.act,
						i = n.data,
						l = i.beakerName,
						d = i.beakerTotalVolume,
						m = i.currentBeakerName,
						s = i.maximumBeakerVolume,
						p = (0, a.useSharedState)(t, "iconToggle", !1)[0],
						h = (0, a.useSharedState)(t, "removeAmount", 10),
						C = h[0],
						N = h[1],
						V = [C, 10, 5, 1],
						f = i.beakerContents || [];
					return (0, r.createComponentVNode)(2, c.Section, {
						fontSize: "12px",
						title: (0, r.createComponentVNode)(2, c.Button, {
							className: "chem-dispenser__buttons",
							icon: "eject",
							onClick: function () {
								return o("eject");
							},
							children: s
								? "Eject " + m + " (" + d + "/" + s + ")"
								: "Insert " + l,
						}),
						buttons: (0, r.createComponentVNode)(2, c.Box, {
							align: "left",
							as: "span",
							children: [
								"Remove Amount: ",
								(0, r.createComponentVNode)(2, c.NumberInput, {
									width: 4,
									format: function (e) {
										return e + "u";
									},
									value: C,
									minValue: 1,
									maxValue: 100,
									onDrag: function (e, t) {
										return N(t);
									},
								}),
							],
						}),
						children: [
							(0, r.createComponentVNode)(2, c.Table.Row, {
								children: [
									(0, r.createComponentVNode)(2, c.Table.Cell, {
										bold: !0,
										collapsing: !0,
										textAlign: "center",
									}),
									(0, r.createComponentVNode)(2, c.Table.Cell, {
										collapsing: !0,
									}),
								],
							}),
							(0, r.createComponentVNode)(2, c.Box, {
								color: "label",
								children: !f.length && "No Contents",
							}),
							f.map(function (e, t) {
								return (0, r.createComponentVNode)(
									2,
									c.Table.Row,
									{
										children: [
											(0, r.createComponentVNode)(2, c.Table.Cell, {
												collapsing: !0,
												textAlign: "left",
												children: [
													(0, r.createComponentVNode)(2, c.Icon, {
														pr: u[e.state].pr,
														style: { "text-shadow": "0 0 3px #000;" },
														color:
															"rgba(" +
															e.colorR +
															"," +
															e.colorG +
															", " +
															e.colorB +
															", 1)",
														name: p ? u[e.state].icon : "circle",
													}),
													"( " + e.volume + "u ) " + e.name,
												],
											}),
											(0, r.createComponentVNode)(2, c.Table.Cell, {
												collapsing: !0,
												textAlign: "left",
												children: (0, r.createComponentVNode)(2, c.Box, {
													mt: 0.5,
													children: [
														(0, r.createComponentVNode)(2, c.Button, {
															icon: "filter",
															onClick: function () {
																return o("isolate", { reagentId: e.id });
															},
															children: "Isolate",
														}),
														(0, r.createComponentVNode)(2, c.Button, {
															icon: "minus",
															onClick: function () {
																return o("all", { amount: C, reagentId: e.id });
															},
															children: "All",
														}),
														V.map(function (t, n) {
															return (0, r.createComponentVNode)(
																2,
																c.Button,
																{
																	icon: "minus",
																	onClick: function () {
																		return o("remove", {
																			amount: t,
																			reagentId: e.id,
																		});
																	},
																	children: t,
																},
																n
															);
														}),
													],
												}),
											}),
										],
									},
									t
								);
							}),
						],
					});
				};
				t.Beaker = s;
				var p = function (e, t) {
					var n = (0, a.useBackend)(t).data,
						o = (0, a.useSharedState)(t, "sort", 1),
						i = o[0],
						l = o[1],
						d = n.beakerContents,
						u = n.maximumBeakerVolume,
						m = n.beakerTotalVolume,
						s = n.finalColor || "",
						p = [
							{
								id: 0,
								icon: "sort-amount-down",
								contents: "",
								compareFunction: function (e, t) {
									return t.volume - e.volume;
								},
							},
							{
								id: 1,
								icon: "sort-amount-up",
								contents: "",
								compareFunction: function (e, t) {
									return e.volume - t.volume;
								},
							},
							{
								id: 2,
								contents: "Density",
								compareFunction: function (e, t) {
									return e.state - t.state;
								},
							},
							{
								id: 3,
								contents: "Order Added",
								compareFunction: function () {
									return 1;
								},
							},
						];
					return (0, r.createComponentVNode)(2, c.Section, {
						align: "center",
						p: 0.5,
						title: (0, r.createComponentVNode)(2, c.Tabs, {
							children: p.map(function (e, t) {
								return (0, r.createComponentVNode)(
									2,
									c.Tabs.Tab,
									{
										fontSize: "11px",
										textAlign: "center",
										align: "center",
										selected: i === e.id,
										onClick: function () {
											return l(e.id);
										},
										children: [
											e.icon &&
												(0, r.createComponentVNode)(2, c.Icon, {
													name: e.icon,
												}),
											e.contents,
										],
									},
									t
								);
							}),
						}),
						children: [
							(0, r.createComponentVNode)(2, c.Tooltip, {
								position: "top",
								content: "Current Mixture Color",
								children: (0, r.createComponentVNode)(2, c.Box, {
									position: "relative",
									py: 1.5,
									pl: 4,
									backgroundColor: s.substring(0, 7),
								}),
							}),
							d
								.slice()
								.sort(p[i].compareFunction)
								.map(function (e, t) {
									return (0,
									r.createComponentVNode)(2, c.Tooltip, { content: e.name + " ( " + e.volume + "u )", position: "top", children: (0, r.createComponentVNode)(2, c.Box, { position: "relative", as: "span", pl: ((e.volume / u) * 100) / 1.146, py: 1, backgroundColor: "rgba(" + e.colorR + "," + e.colorG + ", " + e.colorB + ", 1)" }) }, t);
								}),
							(0, r.createComponentVNode)(2, c.Tooltip, {
								content: "( " + (u - m) + "u )",
								position: "top",
								children: (0, r.createComponentVNode)(2, c.Box, {
									as: "span",
									position: "relative",
									pl: (((u - m) / u) * 100) / 1.146,
									py: 1,
									backgroundColor: "black",
								}),
							}),
						],
					});
				};
				t.BeakerContentsGraph = p;
				var h = function (e, t) {
					var n = (0, a.useBackend)(t),
						o = n.act,
						i = n.data,
						l = (0, a.useLocalState)(t, "groupName", ""),
						d = l[0],
						u = l[1],
						m = (0, a.useLocalState)(t, "reagents", ""),
						s = m[0],
						p = m[1],
						h = i.groupList,
						C = i.idCardName,
						N = i.idCardInserted;
					return (0, r.createFragment)(
						[
							(0, r.createComponentVNode)(2, c.Section, {
								title: "Reagent Groups",
								buttons: (0, r.createComponentVNode)(2, c.Box, {
									children: (0, r.createComponentVNode)(2, c.Button, {
										className: "chem-dispenser__buttons",
										icon: "eject",
										onClick: function () {
											return o("card");
										},
										children: N ? "Eject ID: " + C : "Insert ID",
									}),
								}),
								children: [
									(0, r.createComponentVNode)(2, c.Box, {
										children: [
											(0, r.createComponentVNode)(2, c.Box, {
												children: [
													(0, r.createComponentVNode)(2, c.Box, {
														pt: 1,
														pr: 7,
														as: "span",
														children: "Group Name:",
													}),
													(0, r.createComponentVNode)(2, c.Box, {
														pt: 1,
														as: "span",
														children: "Reagents:",
													}),
												],
											}),
											(0, r.createComponentVNode)(2, c.Input, {
												pl: 5,
												placeholder: "Name",
												value: d,
												onInput: function (e, t) {
													return u(t);
												},
											}),
											(0, r.createComponentVNode)(2, c.Box, {
												pt: 1,
												as: "span",
												children: (0, r.createComponentVNode)(2, c.Input, {
													pl: 5,
													placeholder: "Reagents",
													value: s,
													onInput: function (e, t) {
														return p(t);
													},
												}),
											}),
											(0, r.createComponentVNode)(2, c.Box, {
												as: "span",
												children: (0, r.createComponentVNode)(2, c.Button, {
													icon: "plus-circle",
													lineHeight: 1.75,
													onClick: function () {
														o("newGroup", { reagents: s, groupName: d }),
															u(""),
															p("");
													},
													children: "Add Group",
												}),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, c.Box, {
										pt: 0.5,
										children: "Reagents Format: water=1;sugar=1;",
									}),
								],
							}),
							!!h.length &&
								(0, r.createComponentVNode)(2, c.Section, {
									children: h.map(function (e, t) {
										return (0, r.createComponentVNode)(
											2,
											c.Box,
											{
												children: [
													(0, r.createComponentVNode)(
														2,
														c.Button,
														{
															icon: "tint",
															lineHeight: 1.75,
															onClick: function () {
																return o("groupDispense", {
																	selectedGroup: e.ref,
																});
															},
															children: e.name,
														},
														t
													),
													(0, r.createComponentVNode)(2, c.Button, {
														icon: "trash",
														lineHeight: 1.75,
														onClick: function () {
															return o("deleteGroup", { selectedGroup: e.ref });
														},
														children: "Delete",
													}),
													" " + e.info,
												],
											},
											t
										);
									}),
								}),
						],
						0
					);
				};
				t.ChemGroups = h;
			},
			96479: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ChemHeater = void 0);
				var o = n(39812),
					r = n(34380),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = n(46473),
					d = n(23827);
				t.ChemHeater = function (e, t) {
					var n = (0, a.useBackend)(t),
						r = n.act,
						d = n.data,
						m = d.containerData,
						s = d.isActive,
						p = d.targetTemperature;
					return (0, o.createComponentVNode)(2, i.Window, {
						title: "Reagent Heater/Cooler",
						width: 320,
						height: 385,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, u, {
									container: m,
									targetTemperature: p,
									active: s,
								}),
								(0, o.createComponentVNode)(2, c.Section, {
									title: "Temperature Control",
									children: (0, o.createComponentVNode)(2, c.Stack, {
										align: "center",
										children: [
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												children: (0, o.createComponentVNode)(2, c.Knob, {
													animated: !0,
													size: 2,
													value: p,
													minValue: 0,
													maxValue: 1e3,
													format: function (e) {
														return e + " K";
													},
													onDrag: function (e, t) {
														return r("adjustTemp", { temperature: t });
													},
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												grow: !0,
												basis: 0,
												overflow: "hidden",
												children: (0, o.createComponentVNode)(2, c.Box, {
													className: "ChemHeater__TemperatureNumber",
													nowrap: !0,
													p: 1,
													fontSize: 1.5,
													color: (0, l.getTemperatureColor)(p),
													backgroundColor: "black",
													children: [
														(0, o.createComponentVNode)(2, c.Box, {
															fontSize: 1,
															children: "Target",
														}),
														(0, o.createComponentVNode)(2, c.Icon, {
															name: (0, l.getTemperatureIcon)(p),
															pr: 0.5,
														}),
														(0, o.createComponentVNode)(2, c.AnimatedNumber, {
															value: p,
														}),
														" K",
													],
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												basis: 9.6,
												align: "center",
												children: (0, o.createComponentVNode)(2, c.Button, {
													icon: "power-off",
													disabled: !(null != m && m.totalVolume),
													color: s ? "red" : "green",
													fluid: !0,
													height: "100%",
													fontSize: 1.25,
													textAlign: "center",
													onClick: function () {
														return r(s ? "stop" : "start");
													},
													children: s ? "Deactivate" : "Activate",
												}),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
				var u = function (e, t) {
					var n,
						i = (0, a.useBackend)(t).act,
						u = e.active,
						m = void 0 !== u && u,
						s = e.targetTemperature,
						p = void 0 === s ? l.freezeTemperature : s,
						h = null != (n = e.container) ? n : d.NoContainer,
						C = m && !h.fake,
						N = h.temperature,
						V = h.totalVolume;
					return (0, o.createComponentVNode)(2, c.SectionEx, {
						capitalize: !0,
						title: h.name,
						buttons: (0, o.createComponentVNode)(2, c.Button, {
							icon: "eject",
							disabled: !e.container,
							onClick: function () {
								return i("eject");
							},
							children: "Eject",
						}),
						children: [
							(0, o.createComponentVNode)(2, d.ReagentGraph, { container: h }),
							(0, o.createComponentVNode)(2, d.ReagentList, { container: h }),
							(0, o.createComponentVNode)(2, c.Box, {
								className: (0, r.classes)([
									"ChemHeater__TemperatureBox",
									C &&
										"ChemHeater__TemperatureBox__" +
											(0, l.getTemperatureChangeName)(N, p),
								]),
								children:
									!V ||
									(0, o.createComponentVNode)(2, c.Box, {
										fontSize: 2,
										color: (0, l.getTemperatureColor)(N),
										className: "ChemHeater__TemperatureNumber",
										children: [
											(0, o.createComponentVNode)(2, c.Icon, {
												name: "long-arrow-alt-down",
												className: (0, r.classes)([
													"ChemHeater__TemperatureArrow",
													C &&
														"ChemHeater__TemperatureArrow__" +
															(0, l.getTemperatureChangeName)(N, p),
												]),
												pt: "2px",
												pr: 0.25,
												style: {
													transform: m
														? "scaleY(" + Math.sign(N - p) + ")"
														: "scaleY(0)",
												},
											}),
											(0, o.createComponentVNode)(2, c.Icon, {
												name: (0, l.getTemperatureIcon)(N),
												pr: 0.5,
											}),
											(0, o.createComponentVNode)(2, c.AnimatedNumber, {
												value: N,
											}),
											" K",
										],
									}),
							}),
							!e.container &&
								(0, o.createComponentVNode)(2, c.Dimmer, {
									children: (0, o.createComponentVNode)(2, c.Button, {
										icon: "eject",
										fontSize: 1.5,
										onClick: function () {
											return i("insert");
										},
										bold: !0,
										children: "Insert Beaker",
									}),
								}),
						],
					});
				};
			},
			36041: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ChemRequestReceiver = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(2497),
					l = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.name,
							l = e.id,
							d = e.reagent_name,
							u = e.reagent_color,
							m = e.volume,
							s = e.notes,
							p = e.area,
							h = e.state,
							C = e.interactable,
							N = e.age,
							V = "rgba(" + u[0] + "," + u[1] + ", " + u[2] + ", 1)";
						return (0, o.createComponentVNode)(2, a.Section, {
							children: (0, o.createComponentVNode)(2, a.Flex, {
								direction: "column",
								height: 10,
								children: [
									(0, o.createComponentVNode)(2, a.Flex.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, a.Stack, {
											vertical: !0,
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: [c, " requested"],
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													align: "center",
													children: (0, o.createComponentVNode)(2, a.Box, {
														width: 16,
														textAlign: "center",
														children: [
															(0, o.createComponentVNode)(2, a.Icon, {
																color: V,
																name: "circle",
																pt: 1,
																style: { "text-shadow": "0 0 3px #000" },
															}),
															" " + (0, i.capitalize)(d),
															" (",
															m,
															"u)",
														],
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: [
														"from ",
														p,
														" ",
														N,
														" ago. ",
														(0, o.createVNode)(1, "br"),
														" ",
														s && "Notes: " + s,
													],
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Flex.Item, {
										children: (0, o.createComponentVNode)(2, a.Box, {
											children: [
												"pending" === h &&
													(0, o.createFragment)(
														[
															(0, o.createComponentVNode)(2, a.Button, {
																disabled: !C,
																align: "center",
																width: "49.5%",
																color: "red",
																icon: "ban",
																onClick: function () {
																	n("deny", { id: l });
																},
																children: "Deny",
															}),
															(0, o.createComponentVNode)(2, a.Button, {
																disabled: !C,
																align: "center",
																width: "49.5%",
																icon: "check",
																onClick: function () {
																	n("fulfil", { id: l });
																},
																children: "Mark as fulfilled",
															}),
														],
														4
													),
												"pending" !== h &&
													(0, o.createComponentVNode)(2, a.Box, {
														align: "center",
														backgroundColor: "denied" === h ? "red" : "green",
														children: (0, i.capitalize)(h),
													}),
											],
										}),
									}),
								],
							}),
						});
					};
				t.ChemRequestReceiver = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = (n.act, n.data),
						d = (0, r.useLocalState)(t, "tabIndex", 1),
						u = d[0],
						m = d[1],
						s = i.requests,
						p = i.allowed,
						h = 0;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Chemical requests",
						width: 600,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.Tabs, {
									children: [
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: 1 === u,
											onClick: function () {
												return m(1);
											},
											children: "Pending",
										}),
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: 2 === u,
											onClick: function () {
												return m(2);
											},
											children: "History",
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Stack, {
									wrap: "wrap",
									children: s.map(function (e) {
										if (
											("pending" === e.state && 1 === u) ||
											("pending" !== e.state && 2 === u)
										)
											return (0, o.createComponentVNode)(
												2,
												a.Stack.Item,
												{
													py: 1,
													width: 23,
													ml: 0 == h++ ? 1 : undefined,
													children: (0, o.normalizeProps)(
														(0, o.createComponentVNode)(
															2,
															l,
															Object.assign({ interactable: p }, e)
														)
													),
												},
												e.id
											);
									}),
								}),
							],
						}),
					});
				};
			},
			1150: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ChemRequester = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(2497),
					l = n(65224),
					d = n(69742),
					u = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							a = e.chemicals,
							c = (0, r.useLocalState)(t, "searchText", ""),
							i = c[0],
							d = c[1],
							u = Object.keys(a).filter(function (e) {
								return e.includes(i);
							});
						return (0, o.createComponentVNode)(2, l.ListSearch, {
							autoFocus: !0,
							currentSearch: i,
							options: u,
							onSearch: d,
							onSelect: function (e) {
								n("set_reagent", { reagent_name: e, reagent_id: a[e] }), d("");
							},
						});
					};
				t.ChemRequester = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						m = n.data,
						s = m.chemicals,
						p = m.card,
						h = m.selected_reagent,
						C = m.volume,
						N = m.max_volume,
						V = m.notes,
						f = m.silicon_user,
						g = (0, r.useLocalState)(t, "notesText", ""),
						b = g[0],
						v = g[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Chemical request",
						width: 400,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							align: "center",
							children: [
								!!p &&
									(0, o.createComponentVNode)(2, a.Stack, {
										vertical: !0,
										children: [
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(2, d.IDCard, {
													card: p,
													onEject: function () {
														l("reset_id");
													},
												}),
											}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: [
													!h &&
														(0, o.createComponentVNode)(2, a.Section, {
															height: 36,
															fill: !0,
															scrollable: !0,
															children: (0, o.createComponentVNode)(2, u, {
																chemicals: s,
															}),
														}),
													!!h &&
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																l("set_reagent", { reagent: null });
															},
															children: (0, i.capitalize)(h),
														}),
												],
											}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(
													2,
													a.LabeledList,
													{
														children: [
															(0, o.createComponentVNode)(
																2,
																a.LabeledList.Item,
																{
																	label: "Amount",
																	children: (0, o.createComponentVNode)(
																		2,
																		a.NumberInput,
																		{
																			align: "left",
																			unit: "u",
																			minValue: 5,
																			step: 5,
																			maxValue: N,
																			value: C,
																			onChange: function (e, t) {
																				l("set_volume", { volume: t });
																			},
																		}
																	),
																}
															),
															(0, o.createComponentVNode)(
																2,
																a.LabeledList.Item,
																{
																	label: "Notes",
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Input,
																		{
																			width: "100%",
																			value: b,
																			maxLength: 65,
																			onInput: v,
																			onChange: function (e, t) {
																				l("set_notes", { notes: t });
																			},
																			children: V,
																		}
																	),
																}
															),
														],
													}
												),
											}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														l("submit"), v("");
													},
													children: "Submit request",
												}),
											}),
										],
									}),
								!p &&
									!f &&
									(0, o.createComponentVNode)(2, a.Section, {
										children: "Please swipe ID to place request.",
									}),
								!p &&
									!!f &&
									(0, o.createComponentVNode)(2, a.Section, {
										children: (0, o.createComponentVNode)(2, a.Button, {
											onClick: function () {
												return l("silicon_login");
											},
											children: "Login to place request.",
										}),
									}),
							],
						}),
					});
				};
			},
			98213: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.CloningConsole = t.shortenNumber = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(77366),
					l = n(41860);
				var d = ["", "k", "M", "B", "T"],
					u = function (e, t) {
						void 0 === t && (t = 0);
						var n = (Math.log10(Math.abs(e)) / 3) | 0;
						return n === t
							? e
							: "" + Math.round(e / Math.pow(10, 3 * n)) + d[n];
					};
				t.shortenNumber = u;
				var m = [
						"#17d568",
						"#2ecc71",
						"#e67e22",
						"#ed5100",
						"#e74c3c",
						"#ed2814",
					],
					s = "functions",
					p = "records",
					h = "pods",
					C = "danger",
					N = "info",
					V = "success",
					f = function (e) {
						var t = e.type,
							n = (function (e, t) {
								if (null == e) return {};
								var n,
									o,
									r = {},
									a = Object.keys(e);
								for (o = 0; o < a.length; o++)
									(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
								return r;
							})(e, ["type"]),
							r = Object.assign(
								{},
								t === C ? { danger: !0 } : {},
								t === N ? { info: !0 } : {},
								t === V ? { success: !0 } : {}
							);
						return (0, o.normalizeProps)(
							(0, o.createComponentVNode)(
								2,
								a.NoticeBox,
								Object.assign({}, r, n)
							)
						);
					};
				t.CloningConsole = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.data,
						l = n.act,
						d = i.balance,
						u = i.cloneHack,
						m = i.clonesForCash,
						C = i.cloningWithRecords,
						N = (0, r.useLocalState)(t, "deletionTarget", ""),
						V = N[0],
						f = N[1],
						x = (0, r.useSharedState)(t, "tab", p),
						w = x[0],
						S = x[1];
					return (
						C || w !== p || S(h),
						(0, o.createComponentVNode)(2, c.Window, {
							theme: u.some(Boolean) ? "syndicate" : "ntos",
							width: 540,
							height: 595,
							children: (0, o.createComponentVNode)(2, c.Window.Content, {
								children: [
									V &&
										(0, o.createComponentVNode)(2, a.Modal, {
											mx: 7,
											fontSize: "31px",
											children: [
												(0, o.createComponentVNode)(2, a.Flex, {
													align: "center",
													children: [
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															mr: 2,
															mt: 1,
															children: (0, o.createComponentVNode)(2, a.Icon, {
																name: "trash",
															}),
														}),
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															children: "Delete Record?",
														}),
													],
												}),
												(0, o.createComponentVNode)(2, a.Box, {
													mt: 2,
													textAlign: "center",
													fontSize: "24px",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															lineHeight: "40px",
															icon: "check",
															color: "good",
															onClick: function () {
																l("delete", { ckey: V }), f("");
															},
															children: "Yes",
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															width: 8,
															align: "center",
															mt: 2,
															ml: 5,
															lineHeight: "40px",
															icon: "times",
															color: "bad",
															onClick: function () {
																return f("");
															},
															children: "No",
														}),
													],
												}),
											],
										}),
									(0, o.createComponentVNode)(2, a.Stack, {
										vertical: !0,
										fill: !0,
										children: [
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(2, a.Section, {
													fitted: !0,
													children: (0, o.createComponentVNode)(2, a.Tabs, {
														children: [
															!!C &&
																(0, o.createComponentVNode)(2, a.Tabs.Tab, {
																	icon: "list",
																	selected: w === p,
																	onClick: function () {
																		return S(p);
																	},
																	children: "Records",
																}),
															(0, o.createComponentVNode)(2, a.Tabs.Tab, {
																icon: "box",
																selected: w === h,
																onClick: function () {
																	return S(h);
																},
																children: "Pods",
															}),
															(0, o.createComponentVNode)(2, a.Tabs.Tab, {
																icon: "wrench",
																selected: w === s,
																onClick: function () {
																	return S(s);
																},
																children: "Functions",
															}),
														],
													}),
												}),
											}),
											!!m &&
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: (0, o.createComponentVNode)(2, a.Section, {
														children: ["Current machine credit: ", d],
													}),
												}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(2, b),
											}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												grow: 1,
												children: [
													w === p && !!C && (0, o.createComponentVNode)(2, v),
													w === h && (0, o.createComponentVNode)(2, k),
													w === s && (0, o.createComponentVNode)(2, g),
												],
											}),
										],
									}),
								],
							}),
						})
					);
				};
				var g = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data,
							l = i.allowMindErasure,
							d = i.disk,
							u = i.diskReadOnly,
							m = i.geneticAnalysis,
							s = i.mindWipe,
							p = i.cloningWithRecords;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Advanced Genetic Analysis",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											children: [
												(0, o.createComponentVNode)(2, a.Box, {
													bold: !0,
													children: "Notice:",
												}),
												(0, o.createComponentVNode)(2, a.Box, {
													children:
														"Enabling this feature will prompt the attached clone pod to transfer active genetic mutations from the genetic record to the subject during cloning.",
												}),
												(0, o.createComponentVNode)(2, a.Box, {
													children:
														"The cloning process will be slightly slower as a result.",
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											pt: 2,
											children: (0, o.createComponentVNode)(2, a.Button, {
												textAlign: "center",
												width: 6.7,
												icon: m ? "toggle-on" : "toggle-off",
												color: m ? "good" : "bad",
												onClick: function () {
													return c("toggleGeneticAnalysis");
												},
												children: m ? "Enabled" : "Disabled",
											}),
										}),
									],
								}),
								!!l &&
									(0, o.createComponentVNode)(2, a.Section, {
										title: "Criminal Rehabilitation Controls",
										children: [
											(0, o.createComponentVNode)(2, a.Box, {
												children: [
													(0, o.createComponentVNode)(2, a.Box, {
														bold: !0,
														children: "Notice:",
													}),
													(0, o.createComponentVNode)(2, a.Box, {
														children:
															"Enabling this feature will enable an experimental criminal rehabilitation routine.",
													}),
													(0, o.createComponentVNode)(2, a.Box, {
														bold: !0,
														children:
															"Human use is specifically forbidden by the Space Geneva convention.",
													}),
												],
											}),
											(0, o.createComponentVNode)(2, a.Box, {
												pt: 2,
												children: (0, o.createComponentVNode)(2, a.Button, {
													textAlign: "center",
													width: 6.7,
													icon: s ? "toggle-on" : "toggle-off",
													color: s ? "good" : "bad",
													onClick: function () {
														return c("mindWipeToggle");
													},
													children: s ? "Enabled" : "Disabled",
												}),
											}),
										],
									}),
								!!d &&
									(0, o.createComponentVNode)(2, a.Section, {
										title: "Disk Controls",
										buttons: (0, o.createFragment)(
											[
												p
													? (0, o.createComponentVNode)(2, a.Button, {
															icon: "upload",
															color: "blue",
															onClick: function () {
																return c("load");
															},
															children: "Load from disk",
													  })
													: (0, o.createComponentVNode)(2, a.Button, {
															icon: "upload",
															color: "blue",
															onClick: function () {
																return c("loadAndClone");
															},
															children: "Clone from disk",
													  }),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "eject",
													color: "bad",
													onClick: function () {
														return c("eject");
													},
													children: "Eject Disk",
												}),
											],
											0
										),
										children: (0, o.createComponentVNode)(2, a.Box, {
											children: [
												(0, o.createComponentVNode)(2, a.Icon, {
													color: u ? "bad" : "good",
													name: "check",
												}),
												" ",
												u ? "Disk is read only." : "Disk is writeable.",
											],
										}),
									}),
							],
							0
						);
					},
					b = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data,
							l = i.scannerLocked,
							d = i.occupantScanned,
							u = i.scannerOccupied,
							m = i.scannerGone,
							s = i.cloningWithRecords,
							p = i.message || { text: "", status: "" };
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Status Messages",
									height: 7,
									children:
										p.text &&
										(0, o.createComponentVNode)(2, f, {
											type: p.status,
											textColor: "white",
											height: 3.17,
											align: "center",
											style: {
												"vertical-align": "middle",
												"horizontal-align": "middle",
											},
											children: (0, o.createComponentVNode)(2, a.Box, {
												style: {
													position: "relative",
													left: "50%",
													top: "50%",
													transform: "translate(-50%, -50%)",
												},
												children: p.text,
											}),
										}),
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Scanner Controls",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										width: 7,
										icon: l ? "unlock" : "lock-open",
										align: "center",
										color: l ? "bad" : "good",
										onClick: function () {
											return c("toggleLock");
										},
										children: l ? "Locked" : "Unlocked",
									}),
									children: [
										!!s &&
											(!!m || !!d || !u) &&
											(0, o.createComponentVNode)(2, a.Box, {
												children: [
													(0, o.createComponentVNode)(2, a.Icon, {
														color: m || !u ? "bad" : "good",
														name: m || !u ? "times" : "check",
													}),
													" ",
													!!m && "No scanner detected.",
													!m &&
														(u
															? "Occupant scanned."
															: "Scanner has no occupant."),
												],
											}),
										!m &&
											!d &&
											!!u &&
											!!s &&
											(0, o.createComponentVNode)(2, a.Button, {
												width: m ? 8 : 7,
												icon: "dna",
												align: "center",
												color: m ? "bad" : "good",
												disabled: d || m,
												onClick: function () {
													return c("scan");
												},
												children: "Scan",
											}),
										!m &&
											!!u &&
											!s &&
											(0, o.createComponentVNode)(2, a.Button, {
												icon: "dna",
												align: "center",
												color: "good",
												onClick: function () {
													return c("scanAndClone");
												},
												children: "Scan & Clone",
											}),
									],
								}),
							],
							4
						);
					},
					v = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							d = n.data,
							s = d.disk,
							p = d.diskReadOnly,
							h = d.allowedToDelete,
							C = d.meatLevels,
							N = d.cloneRecords || [],
							V = (0, r.useLocalState)(t, "deletionTarget", "")[1];
						return (0, o.createComponentVNode)(2, a.Flex, {
							direction: "column",
							height: "100%",
							children: [
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									children: (0, o.createComponentVNode)(2, a.Section, {
										mb: 0,
										title: "Records",
										style: {
											"border-bottom": "2px solid rgba(51, 51, 51, 0.4);",
										},
										children: (0, o.createComponentVNode)(2, a.Flex, {
											className: "cloning-console__flex__head",
											children: (0, o.createComponentVNode)(2, a.Flex.Item, {
												className: "cloning-console__head__row",
												mr: 2,
												children: [
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														className: "cloning-console__head__item",
														style: { width: "190px" },
														children: "Name",
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														className: "cloning-console__head__item",
														style: { width: "160px" },
														children: [
															(0, o.createComponentVNode)(2, a.Box, {
																children: "Damage",
															}),
															(0, o.createComponentVNode)(2, a.Box, {
																style: {
																	position: "absolute",
																	left: "50%",
																	top: "20%",
																	transform: "translate(-40%, 22px)",
																},
																fontSize: "9px",
																children: "OXY / TOX / BURN / BRUTE",
															}),
														],
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														className: "cloning-console__head__item",
														style: { width: "155px" },
														children: "Actions",
													}),
												],
											}),
										}),
									}),
								}),
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									grow: 1,
									children: (0, o.createComponentVNode)(2, a.Section, {
										scrollable: !0,
										fill: !0,
										children: (0, o.createComponentVNode)(2, a.Flex, {
											children: (0, o.createComponentVNode)(2, a.Flex.Item, {
												className: "cloning-console__flex__table",
												children: (0, o.createComponentVNode)(2, a.Flex.Item, {
													children: N.map(function (e) {
														return (0, o.createComponentVNode)(
															2,
															a.Flex.Item,
															{
																className: "cloning-console__body__row",
																children: [
																	(0, o.createComponentVNode)(2, a.Flex.Item, {
																		inline: !0,
																		className: "cloning-console__body__item",
																		style: { width: "190px" },
																		children: e.name,
																	}),
																	(0, o.createComponentVNode)(2, a.Flex.Item, {
																		className: "cloning-console__body__item",
																		style: { width: "160px" },
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				a.ColorBox,
																				{
																					mr: 1,
																					color:
																						((t = e.health.OXY),
																						(n = e.health.TOX),
																						(r = e.health.BURN),
																						(d = e.health.BRUTE),
																						(N = t + n + r + d),
																						(f = (0, l.clamp)(
																							Math.ceil(N / 25),
																							0,
																							5
																						)),
																						m[f]),
																				}
																			),
																			e.implant && e.health.OXY >= 0
																				? (0, o.createComponentVNode)(
																						2,
																						a.Box,
																						{
																							inline: !0,
																							children: [
																								(0, o.createComponentVNode)(
																									2,
																									i.HealthStat,
																									{
																										inline: !0,
																										align: "center",
																										type: "oxy",
																										width: 2,
																										children: u(e.health.OXY),
																									}
																								),
																								"/",
																								(0, o.createComponentVNode)(
																									2,
																									i.HealthStat,
																									{
																										inline: !0,
																										align: "center",
																										type: "toxin",
																										width: 2,
																										children: u(e.health.TOX),
																									}
																								),
																								"/",
																								(0, o.createComponentVNode)(
																									2,
																									i.HealthStat,
																									{
																										inline: !0,
																										align: "center",
																										type: "burn",
																										width: 2,
																										children: u(e.health.BURN),
																									}
																								),
																								"/",
																								(0, o.createComponentVNode)(
																									2,
																									i.HealthStat,
																									{
																										inline: !0,
																										align: "center",
																										type: "brute",
																										width: 2,
																										children: u(e.health.BRUTE),
																									}
																								),
																							],
																						}
																				  )
																				: "No Implant Detected",
																		],
																	}),
																	(0, o.createComponentVNode)(2, a.Flex.Item, {
																		align: "baseline",
																		className: "cloning-console__body__item",
																		style: { width: "155px" },
																		children: [
																			!!h &&
																				(0, o.createComponentVNode)(
																					2,
																					a.Button,
																					{
																						icon: "trash",
																						color: "bad",
																						onClick: function () {
																							return V(e.ckey);
																						},
																					}
																				),
																			!!s &&
																				(0, o.createComponentVNode)(
																					2,
																					a.Button,
																					{
																						icon: p || e.saved ? "" : "save",
																						color: "blue",
																						alignText: "center",
																						width: "22px",
																						disabled: e.saved || p,
																						onClick: function () {
																							return c("saveToDisk", {
																								ckey: e.ckey,
																							});
																						},
																						children: [
																							!p &&
																								!!e.saved &&
																								(0, o.createComponentVNode)(
																									2,
																									a.Icon,
																									{
																										color: "black",
																										name: "check",
																									}
																								),
																							!!p &&
																								(0, o.createComponentVNode)(
																									2,
																									a.Icon.Stack,
																									{
																										children: [
																											(0,
																											o.createComponentVNode)(
																												2,
																												a.Icon,
																												{
																													color: "black",
																													name: "pen",
																												}
																											),
																											(0,
																											o.createComponentVNode)(
																												2,
																												a.Icon,
																												{
																													color: "black",
																													name: "slash",
																												}
																											),
																										],
																									}
																								),
																						],
																					}
																				),
																			(0, o.createComponentVNode)(2, a.Button, {
																				icon: "dna",
																				color: "good",
																				disabled: !C.length,
																				onClick: function () {
																					return c("clone", { ckey: e.ckey });
																				},
																				children: "Clone",
																			}),
																		],
																	}),
																],
															},
															e.id
														);
														var t, n, r, d, N, f;
													}),
												}),
											}),
										}),
									}),
								}),
							],
						});
					},
					k = function (e, t) {
						var n = (0, r.useBackend)(t).data,
							c = n.completion,
							i = n.meatLevels,
							l = n.podNames;
						return i.length
							? i.map(function (e, t) {
									return (0,
									o.createComponentVNode)(2, a.Section, { title: l[t].replace(/cloning pod/, "Cloning Pod") + " Status", children: (0, o.createComponentVNode)(2, a.LabeledList, { children: [(0, o.createComponentVNode)(2, a.LabeledList.Item, { label: "Completion", children: (0, o.createComponentVNode)(2, a.ProgressBar, { value: c[t], maxValue: 100, minValue: 0, ranges: { good: [90, Infinity], average: [25,
																	90], bad: [-Infinity, 25] } }) }), (0, o.createComponentVNode)(2, a.LabeledList.Item, { label: "Bio-Matter", children: (0, o.createComponentVNode)(2, a.ProgressBar, { value: e, maxValue: 100, minValue: 0, ranges: { good: [50,
																	100], average: [25, 50], bad: [0, 25] } }) })] }) }, "pod" + t);
							  })
							: (0, o.createComponentVNode)(2, a.Section, {
									title: "Cloning Pod Status",
									children: (0, o.createComponentVNode)(2, a.Box, {
										children: [
											(0, o.createComponentVNode)(2, a.Icon, {
												color: "bad",
												name: "times",
											}),
											" No Pod Detected",
										],
									}),
							  });
					};
			},
			97757: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ComUplink = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(67113);
				t.ComUplink = function (e, t) {
					var n = (0, r.useBackend)(t).data;
					return (0, o.createComponentVNode)(2, c.Window, {
						theme: "syndicate",
						title: "Syndicate Commander Uplink",
						width: 500,
						height: 500,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.Stack, {
									className: "ComUplink",
								}),
								(0, o.createComponentVNode)(2, a.Stack.Item, {
									children: (0, o.createComponentVNode)(2, a.Section, {
										fill: !0,
										children: (0, o.createComponentVNode)(2, a.LabeledList, {
											children: (0, o.createComponentVNode)(
												2,
												a.LabeledList.Item,
												{
													label: "Points",
													children: (0, o.createComponentVNode)(
														2,
														a.Box,
														{
															inline: !0,
															bold: !0,
															color: "green",
															mr: "5px",
															className: "ComUplink__Points--commander",
															children: n.points,
														},
														n.points
													),
												}
											),
										}),
									}),
								}),
								(0, o.createComponentVNode)(2, a.Stack.Item, {
									grow: 1,
									children: [
										(0, o.createComponentVNode)(2, a.Section, {
											fill: !0,
											scrollable: !0,
											title: "Uplink Items",
										}),
										(0, o.createComponentVNode)(2, a.Collapsible, {
											className: "ComUplink__Category--Main",
											title: "Equipment",
											open: !0,
											color: "Main",
											children: (0, o.createComponentVNode)(2, a.Table, {
												children: n.stock
													.filter(function (e) {
														return "Main" === e.category;
													})
													.map(function (e) {
														return (0,
														o.createComponentVNode)(2, l, { stock: e }, e.name);
													}),
											}),
										}),
									],
								}),
							],
						}),
					});
				};
				var l = function (e, t) {
					var n = e.stock,
						c = (0, r.useBackend)(t),
						l = c.data,
						d = c.act;
					return (0, o.createComponentVNode)(2, a.Table.Row, {
						className: "ComUplink__Row",
						opacity: n.cost > l.points[n.category] ? 0.5 : 1,
						children: [
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								className: "ComUplink__Cell",
								py: "5px",
								children: [
									(0, o.createComponentVNode)(2, a.Box, {
										mb: "5px",
										bold: !0,
										children: n.name,
									}),
									(0, o.createComponentVNode)(2, a.Box, {
										children: n.description,
									}),
								],
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								className: "ComUplink__Cell",
								py: "5px",
								textAlign: "right",
								children: (0, o.createComponentVNode)(2, a.Button, {
									disabled: n.cost > l.points,
									onClick: function () {
										return d("redeem", { ref: n.ref });
									},
									children: [
										"Purchase ",
										n.cost,
										" ",
										(0, i.pluralize)("point", n.cost),
									],
								}),
							}),
						],
					});
				};
			},
			26211: function () {},
			1430: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ContributorRewards = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.ContributorRewards = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data,
						d = l.rewardTitles,
						u = l.rewardDescs;
					return (0, o.createComponentVNode)(2, c.Window, {
						resizable: !0,
						title: "Contributor Rewards",
						width: 350,
						height: 200,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								"Howdy, contributor! These rewards don't revert until you respawn somehow.",
								(0, o.createComponentVNode)(2, a.Section, {
									children: (0, o.createComponentVNode)(2, a.Box, {
										children: d.map(function (e, t) {
											return (0, o.createComponentVNode)(
												2,
												a.Collapsible,
												{
													title: d[t],
													open: !0,
													children: [
														u[t],
														(0, o.createComponentVNode)(2, a.Button, {
															ml: 1,
															icon: "check-circle",
															content: "Redeem",
															onClick: function () {
																return i("redeem", { reward_idx: t + 1 });
															},
														}),
													],
												},
												t
											);
										}),
									}),
								}),
							],
						}),
					});
				};
			},
			6499: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.EmptyPlaceholder = void 0);
				var o = n(39812),
					r = n(34380),
					a = (function (e) {
						if (e && e.__esModule) return e;
						if (null === e || ("object" != typeof e && "function" != typeof e))
							return { default: e };
						var t = c();
						if (t && t.has(e)) return t.get(e);
						var n = {},
							o = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var r in e)
							if (Object.prototype.hasOwnProperty.call(e, r)) {
								var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
								a && (a.get || a.set)
									? Object.defineProperty(n, r, a)
									: (n[r] = e[r]);
							}
						(n["default"] = e), t && t.set(e, n);
						return n;
					})(n(90769));
				function c() {
					if ("function" != typeof WeakMap) return null;
					var e = new WeakMap();
					return (
						(c = function () {
							return e;
						}),
						e
					);
				}
				var i = function (e) {
					var t = e.children,
						n = e.className,
						c = (0, r.classes)([a.EmptyPlaceholder, n]);
					return (0, o.createVNode)(1, "div", c, t, 0);
				};
				(t.EmptyPlaceholder = i), (i.defaultHooks = r.pureComponentHooks);
			},
			46839: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Module = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(33494),
					c = [
						{ id: "brobocop", name: "Brobocop" },
						{ id: "chemistry", name: "Chemistry" },
						{ id: "civilian", name: "Civilian" },
						{ id: "engineering", name: "Engineering" },
						{ id: "medical", name: "Medical" },
						{ id: "mining", name: "Mining" },
					];
				t.Module = function (e) {
					var t = e.onMoveToolDown,
						n = e.onMoveToolUp,
						i = e.onRemoveTool,
						l = e.onResetModule,
						d = e.tools;
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, r.Section, {
								title: "Preset",
								children: c.map(function (e) {
									var t = e.id,
										n = e.name;
									return (0, o.createComponentVNode)(
										2,
										r.Button,
										{
											onClick: function () {
												return l(t);
											},
											title: n,
											children: n,
										},
										t
									);
								}),
							}),
							(0, o.createComponentVNode)(2, r.Section, {
								title: "Tools",
								children: (0, o.createComponentVNode)(2, a.Tools, {
									onMoveToolDown: t,
									onMoveToolUp: n,
									onRemoveTool: i,
									tools: d,
								}),
							}),
						],
						4
					);
				};
			},
			33494: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Tools = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(6499),
					c = (function (e) {
						if (e && e.__esModule) return e;
						if (null === e || ("object" != typeof e && "function" != typeof e))
							return { default: e };
						var t = i();
						if (t && t.has(e)) return t.get(e);
						var n = {},
							o = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var r in e)
							if (Object.prototype.hasOwnProperty.call(e, r)) {
								var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
								a && (a.get || a.set)
									? Object.defineProperty(n, r, a)
									: (n[r] = e[r]);
							}
						(n["default"] = e), t && t.set(e, n);
						return n;
					})(n(90769));
				function i() {
					if ("function" != typeof WeakMap) return null;
					var e = new WeakMap();
					return (
						(i = function () {
							return e;
						}),
						e
					);
				}
				var l = function (e) {
					var t = e.children,
						n = e.onMoveToolDown,
						a = e.onMoveToolUp,
						i = e.onRemoveTool;
					return (0, o.createVNode)(
						1,
						"div",
						null,
						[
							(0, o.createComponentVNode)(2, r.Button, {
								icon: "arrow-up",
								onClick: a,
								title: "Move Up",
							}),
							(0, o.createComponentVNode)(2, r.Button, {
								icon: "arrow-down",
								onClick: n,
								title: "Move Down",
							}),
							(0, o.createComponentVNode)(2, r.Button, {
								icon: "trash",
								onClick: i,
								title: "Remove",
							}),
							(0, o.createVNode)(1, "span", c.ToolLabel, t, 0),
						],
						4
					);
				};
				t.Tools = function (e) {
					var t = e.onMoveToolDown,
						n = e.onMoveToolUp,
						r = e.onRemoveTool,
						c = e.tools,
						i = void 0 === c ? [] : c;
					return (0, o.createVNode)(
						1,
						"div",
						null,
						i.length > 0
							? i.map(function (e) {
									var a = e.name,
										c = e.ref;
									return (0, o.createComponentVNode)(
										2,
										l,
										{
											onMoveToolDown: function () {
												return t(c);
											},
											onMoveToolUp: function () {
												return n(c);
											},
											onRemoveTool: function () {
												return r(c);
											},
											children: a,
										},
										c
									);
							  })
							: (0, o.createComponentVNode)(2, a.EmptyPlaceholder, {
									children: "Module has no tools",
							  }),
						0
					);
				};
			},
			43173: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ModuleView = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(6499),
					c = n(46839);
				t.ModuleView = function (e) {
					var t = e.modules,
						n = (t = void 0 === t ? {} : t).available,
						i = void 0 === n ? [] : n,
						l = t.selected,
						d = e.onEjectModule,
						u = e.onMoveToolDown,
						m = e.onMoveToolUp,
						s = e.onRemoveTool,
						p = e.onResetModule,
						h = e.onSelectModule,
						C = l || {},
						N = C.ref,
						V = C.tools,
						f = void 0 === V ? [] : V;
					return i.length > 0
						? (0, o.createComponentVNode)(2, r.Flex, {
								children: [
									(0, o.createComponentVNode)(2, r.Flex.Item, {
										width: 18,
										mr: 1,
										children: (0, o.createComponentVNode)(2, r.Section, {
											title: "Modules",
											fitted: !0,
											children: (0, o.createComponentVNode)(2, r.Tabs, {
												vertical: !0,
												children: i.map(function (e) {
													var t = e.ref,
														n = e.name,
														a = (0, o.createComponentVNode)(2, r.Button, {
															icon: "eject",
															color: "transparent",
															onClick: function () {
																return d(t);
															},
															title: "Eject " + n,
														});
													return (0, o.createComponentVNode)(
														2,
														r.Tabs.Tab,
														{
															onClick: function () {
																return h(t);
															},
															rightSlot: a,
															selected: t === N,
															children: n,
														},
														t
													);
												}),
											}),
										}),
									}),
									(0, o.createComponentVNode)(2, r.Flex.Item, {
										grow: 1,
										basis: 0,
										children: N
											? (0, o.createComponentVNode)(2, c.Module, {
													onMoveToolDown: function (e) {
														return u(N, e);
													},
													onMoveToolUp: function (e) {
														return m(N, e);
													},
													onRemoveTool: function (e) {
														return s(N, e);
													},
													onResetModule: function (e) {
														return p(N, e);
													},
													tools: f,
											  })
											: (0, o.createComponentVNode)(2, r.Section, {
													children: (0, o.createComponentVNode)(
														2,
														a.EmptyPlaceholder,
														{ children: "No module selected" }
													),
											  }),
									}),
								],
						  })
						: (0, o.createComponentVNode)(2, r.Section, {
								children: (0, o.createComponentVNode)(2, a.EmptyPlaceholder, {
									children: "No modules inserted",
								}),
						  });
				};
			},
			92833: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.selectModule =
						t.resetModule =
						t.removeTool =
						t.moveTool =
						t.ejectModule =
							void 0);
				var o = n(46866),
					r = function (e) {
						return function (t, n) {
							return t(e, n);
						};
					},
					a = r(o.Action.EjectModule);
				t.ejectModule = a;
				var c = r(o.Action.MoveTool);
				t.moveTool = c;
				var i = r(o.Action.RemoveTool);
				t.removeTool = i;
				var l = r(o.Action.ResetModule);
				t.resetModule = l;
				var d = r(o.Action.SelectModule);
				t.selectModule = d;
			},
			56995: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.CyborgModuleRewriter = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(85952),
					c = n(43173),
					i = n(92833),
					l = (function (e) {
						if (e && e.__esModule) return e;
						if (null === e || ("object" != typeof e && "function" != typeof e))
							return { default: e };
						var t = u();
						if (t && t.has(e)) return t.get(e);
						var n = {},
							o = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var r in e)
							if (Object.prototype.hasOwnProperty.call(e, r)) {
								var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
								a && (a.get || a.set)
									? Object.defineProperty(n, r, a)
									: (n[r] = e[r]);
							}
						(n["default"] = e), t && t.set(e, n);
						return n;
					})(n(90769)),
					d = n(46866);
				function u() {
					if ("function" != typeof WeakMap) return null;
					var e = new WeakMap();
					return (
						(u = function () {
							return e;
						}),
						e
					);
				}
				t.CyborgModuleRewriter = function (e, t) {
					var n = (0, r.useBackend)(t),
						u = n.act,
						m = n.data.modules;
					return (0, o.createComponentVNode)(2, a.Window, {
						width: 670,
						height: 640,
						children: (0, o.createComponentVNode)(2, a.Window.Content, {
							className: l.Block,
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, c.ModuleView, {
								modules: m,
								onEjectModule: function (e) {
									return (0, i.ejectModule)(u, { moduleRef: e });
								},
								onMoveToolDown: function (e, t) {
									return (0, i.moveTool)(u, {
										dir: d.Direction.Down,
										moduleRef: e,
										toolRef: t,
									});
								},
								onMoveToolUp: function (e, t) {
									return (0, i.moveTool)(u, {
										dir: d.Direction.Up,
										moduleRef: e,
										toolRef: t,
									});
								},
								onRemoveTool: function (e, t) {
									return (0, i.removeTool)(u, { moduleRef: e, toolRef: t });
								},
								onResetModule: function (e, t) {
									return (0, i.resetModule)(u, { moduleId: t, moduleRef: e });
								},
								onSelectModule: function (e) {
									return (0, i.selectModule)(u, { moduleRef: e });
								},
							}),
						}),
					});
				};
			},
			90769: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.EmptyPlaceholder = t.ToolLabel = t.ModuleView = t.Block = void 0);
				var o = n(93968),
					r = "cyborg-module-rewriter-interface";
				t.Block = r;
				var a = (0, o.block)(r, "module-view");
				t.ModuleView = a;
				var c = (0, o.element)(a, "tool-label");
				t.ToolLabel = c;
				var i = (0, o.block)(r, "empty-placeholder");
				t.EmptyPlaceholder = i;
			},
			46866: function (e, t) {
				"use strict";
				var n, o;
				(t.__esModule = !0),
					(t.Direction = t.Action = void 0),
					(t.Action = n),
					(function (e) {
						(e.EjectModule = "module-eject"),
							(e.MoveTool = "tool-move"),
							(e.RemoveTool = "tool-remove"),
							(e.ResetModule = "module-reset"),
							(e.SelectModule = "module-select");
					})(n || (t.Action = n = {})),
					(t.Direction = o),
					(function (e) {
						(e.Up = "up"), (e.Down = "down");
					})(o || (t.Direction = o = {}));
			},
			40555: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.DJPanel = void 0);
				var o = n(39812),
					r = n(41860),
					a = n(58083),
					c = n(71494),
					i = n(74814),
					l = n(85952);
				t.DJPanel = function (e, t) {
					var n = (0, c.useBackend)(t),
						r = n.act,
						u = n.data,
						m = u.loadedSound,
						p = u.adminChannel,
						h = u.preloadedSounds;
					return (0, o.createComponentVNode)(2, l.Window, {
						width: 430,
						height: 306,
						title: "DJ Panel",
						children: (0, o.createComponentVNode)(2, l.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, i.Section, {
									children: [
										(0, o.createComponentVNode)(2, i.Box, {
											children: [
												(0, o.createVNode)(
													1,
													"strong",
													null,
													"Active Soundfile: ",
													16
												),
												(0, o.createComponentVNode)(2, i.Button, {
													icon: m ? "file-audio" : "upload",
													selected: !m,
													content: m ? (0, a.truncate)(m, 38) : "Upload",
													tooltip: m,
													onClick: function () {
														return r("set-file");
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, i.Divider),
										(0, o.createComponentVNode)(2, s),
									],
								}),
								(0, o.createComponentVNode)(2, i.Section, {
									children: (0, o.createComponentVNode)(2, i.Box, {
										children: [
											(0, o.createComponentVNode)(2, i.Button, {
												icon: "music",
												selected: m,
												disabled: !m,
												content: "Play Music",
												onClick: function () {
													return r("play-music");
												},
											}),
											(0, o.createComponentVNode)(2, i.Button, {
												icon: "volume-up",
												selected: m,
												disabled: !m,
												content: "Play Sound",
												onClick: function () {
													return r("play-sound");
												},
											}),
											(0, o.createComponentVNode)(2, i.Button, {
												icon: "record-vinyl",
												selected: m,
												disabled: !m,
												content: "Play Ambience",
												onClick: function () {
													return r("play-ambience");
												},
											}),
											(0, o.createComponentVNode)(2, i.Box, {
												as: "span",
												color: "grey",
												textAlign: "right",
												pl: 1,
												children: [
													(0, o.createComponentVNode)(2, i.Icon, {
														name: "satellite",
													}),
													" Channel: ",
													(0, o.createVNode)(1, "em", null, 1024 - p, 0),
												],
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, i.Section, {
									children: [
										(0, o.createComponentVNode)(2, i.Box, {
											children: [
												(0, o.createComponentVNode)(2, i.Button, {
													content: "Play Remote",
													onClick: function () {
														return r("play-remote");
													},
												}),
												(0, o.createComponentVNode)(2, i.Button, {
													disabled: !m,
													content: "Play To Player",
													onClick: function () {
														return r("play-player");
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, i.Box, {
											children: [
												(0, o.createComponentVNode)(2, i.Button, {
													disabled: !m,
													content: "Preload Sound",
													onClick: function () {
														return r("preload-sound");
													},
												}),
												(0, o.createComponentVNode)(2, i.Button, {
													disabled: !Object.keys(h).length,
													content: "Play Preloaded Sound",
													onClick: function () {
														return r("play-preloaded");
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, i.Box, {
											children: [
												(0, o.createComponentVNode)(2, i.Button, {
													color: "yellow",
													content: "Toggle DJ Announcements",
													onClick: function () {
														return r("toggle-announce");
													},
												}),
												(0, o.createComponentVNode)(2, i.Button, {
													color: "yellow",
													content: "Toggle DJ For Player",
													onClick: function () {
														return r("toggle-player-dj");
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, i.Box, {
											children: [
												(0, o.createComponentVNode)(2, i.Button, {
													icon: "stop",
													color: "red",
													content: "Stop Last Sound",
													onClick: function () {
														return r("stop-sound");
													},
												}),
												(0, o.createComponentVNode)(2, i.Button, {
													icon: "broadcast-tower",
													color: "red",
													content: "Stop The Radio For Everyone",
													onClick: function () {
														return r("stop-radio");
													},
												}),
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, d),
							],
						}),
					});
				};
				var d = function (e, t) {
						if ((0, c.useBackend)(t).data.announceMode)
							return (0, o.createComponentVNode)(2, i.NoticeBox, {
								info: !0,
								children: "Announce Mode Enabled",
							});
					},
					u = function (e) {
						return (0, r.toFixed)(2 * e) + "%";
					},
					m = function (e) {
						return (0, r.toFixed)(100 * e) + "%";
					},
					s = function (e, t) {
						var n = (0, c.useBackend)(t),
							r = n.act,
							a = n.data,
							l = a.loadedSound,
							d = a.volume,
							s = a.frequency,
							p = function (e, t) {
								return r("set-volume", { volume: t });
							},
							h = function (e, t) {
								return r("set-freq", { frequency: t });
							};
						return (0, o.createComponentVNode)(2, i.Box, {
							children: (0, o.createComponentVNode)(2, i.LabeledControls, {
								children: [
									(0, o.createComponentVNode)(2, i.LabeledControls.Item, {
										label: "Volume",
										children: (0, o.createComponentVNode)(2, i.NumberInput, {
											animated: !0,
											value: d,
											minValue: 0,
											maxValue: 100,
											format: u,
											onDrag: p,
										}),
									}),
									(0, o.createComponentVNode)(2, i.LabeledControls.Item, {
										children: [
											(0, o.createComponentVNode)(2, i.Knob, {
												minValue: 0,
												maxValue: 100,
												ranges: {
													primary: [20, 80],
													average: [10, 90],
													bad: [0, 100],
												},
												value: d,
												format: u,
												onDrag: p,
											}),
											(0, o.createComponentVNode)(2, i.Button, {
												icon: "sync-alt",
												top: "0.3em",
												content: "Reset",
												onClick: function (e, t) {
													return r("set-volume", { volume: "reset" });
												},
											}),
										],
									}),
									(0, o.createComponentVNode)(2, i.LabeledControls.Item, {
										label: "Frequency",
										children: (0, o.createComponentVNode)(2, i.NumberInput, {
											animated: !0,
											value: s,
											step: 0.1,
											minValue: -100,
											maxValue: 100,
											format: m,
											onDrag: h,
										}),
									}),
									(0, o.createComponentVNode)(2, i.LabeledControls.Item, {
										children: [
											(0, o.createComponentVNode)(2, i.Knob, {
												disabled: !l,
												minValue: -100,
												maxValue: 100,
												step: 0.1,
												stepPixelSize: 0.1,
												ranges: {
													primary: [-40, 40],
													average: [-70, 70],
													bad: [-100, 100],
												},
												value: s,
												format: m,
												onDrag: h,
											}),
											(0, o.createComponentVNode)(2, i.Button, {
												icon: "sync-alt",
												top: "0.3em",
												content: "Reset",
												onClick: function (e, t) {
													return r("set-freq", { frequency: "reset" });
												},
											}),
										],
									}),
								],
							}),
						});
					};
			},
			94055: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.DisposalChute = void 0);
				var o,
					r = n(39812),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = n(65224),
					d = n(37316),
					u =
						(((o = {})[d.DisposalChuteState.Off] = {
							pumpColor: "bad",
							pumpText: "Inactive",
						}),
						(o[d.DisposalChuteState.Charging] = {
							pumpColor: "average",
							pumpText: "Pressurizing",
						}),
						(o[d.DisposalChuteState.Charged] = {
							pumpColor: "good",
							pumpText: "Ready",
						}),
						o);
				t.DisposalChute = function (e, t) {
					var n = (0, a.useBackend)(t),
						o = n.act,
						l = n.data,
						d = l.name,
						s = l.destinations,
						p = void 0 === s ? null : s,
						h = l.destinationTag,
						C = l.flush,
						N = l.mode,
						V = l.pressure,
						f = u[N],
						g = f.pumpColor,
						b = f.pumpText;
					return (0, r.createComponentVNode)(2, i.Window, {
						title: d,
						width: 355,
						height: p ? 350 : 140,
						children: (0, r.createComponentVNode)(2, i.Window.Content, {
							className: "disposal-chute-interface",
							scrollable: !!p,
							children: [
								(0, r.createComponentVNode)(2, c.Stack, {
									vertical: !0,
									children: [
										(0, r.createComponentVNode)(2, c.Stack.Item, {
											children: (0, r.createComponentVNode)(2, c.LabeledList, {
												children: (0, r.createComponentVNode)(
													2,
													c.LabeledList.Item,
													{ label: "Current Pressure" }
												),
											}),
										}),
										(0, r.createComponentVNode)(2, c.Stack.Item, {
											children: (0, r.createComponentVNode)(2, c.ProgressBar, {
												ranges: {
													good: [1, Infinity],
													average: [0.75, 1],
													bad: [-Infinity, 0.75],
												},
												value: V,
											}),
										}),
									],
								}),
								(0, r.createComponentVNode)(2, c.Divider),
								(0, r.createComponentVNode)(2, c.LabeledList, {
									children: [
										(0, r.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Air Pump",
											buttons: (0, r.createComponentVNode)(2, c.Button, {
												icon: "power-off",
												content: N ? "Enabled" : "Disabled",
												color: N ? "green" : "red",
												onClick: function () {
													return o("togglePump");
												},
											}),
											children: (0, r.createComponentVNode)(2, c.Box, {
												color: g,
												children: b,
											}),
										}),
										(0, r.createComponentVNode)(2, c.LabeledList.Item, {
											label: "Chute Handle",
											buttons: (0, r.createComponentVNode)(2, c.Button, {
												icon: p ? "envelope" : "trash-alt",
												content: C ? "Flushing" : "Flush",
												color: C ? "" : "red",
												onClick: function () {
													return o("toggleHandle");
												},
											}),
											children: (0, r.createComponentVNode)(2, c.Button, {
												content: "Eject Contents",
												icon: "eject",
												onClick: function () {
													return o("eject");
												},
											}),
										}),
									],
								}),
								!!p &&
									(0, r.createFragment)(
										[
											(0, r.createComponentVNode)(2, c.Divider),
											(0, r.createComponentVNode)(2, c.Stack, {
												vertical: !0,
												children: [
													(0, r.createComponentVNode)(2, c.Stack.Item, {
														children: (0, r.createComponentVNode)(
															2,
															c.LabeledList,
															{
																children: (0, r.createComponentVNode)(
																	2,
																	c.LabeledList.Item,
																	{
																		label: "Destination",
																		buttons: (0, r.createComponentVNode)(
																			2,
																			c.Button,
																			{
																				icon: "search",
																				content: "Rescan",
																				onClick: function () {
																					return o("rescanDest");
																				},
																			}
																		),
																		children: h,
																	}
																),
															}
														),
													}),
													(0, r.createComponentVNode)(2, c.Stack.Item, {
														children: (0, r.createComponentVNode)(2, m, {
															destinations: p,
															destinationTag: h,
														}),
													}),
												],
											}),
										],
										4
									),
							],
						}),
					});
				};
				var m = function (e, t) {
					var n = e.destinations,
						o = void 0 === n ? [] : n,
						c = e.destinationTag,
						i = void 0 === c ? null : c,
						d = (0, a.useBackend)(t).act,
						u = (0, a.useLocalState)(t, "searchText", ""),
						m = u[0],
						s = u[1],
						p = o.filter(function (e) {
							return e.includes(m);
						});
					return (0, r.createComponentVNode)(2, l.ListSearch, {
						autoFocus: !0,
						currentSearch: m,
						onSearch: s,
						onSelect: function (e) {
							return d("select-destination", { destination: e });
						},
						options: p,
						selectedOption: i,
					});
				};
			},
			37316: function (e, t) {
				"use strict";
				var n;
				(t.__esModule = !0),
					(t.DisposalChuteState = void 0),
					(t.DisposalChuteState = n),
					(function (e) {
						(e[(e.Off = 0)] = "Off"),
							(e[(e.Charging = 1)] = "Charging"),
							(e[(e.Charged = 2)] = "Charged");
					})(n || (t.DisposalChuteState = n = {}));
			},
			57013: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.DoorTimer = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952);
				t.DoorTimer = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data;
					return (0, o.createComponentVNode)(2, i.Window, {
						width: 260,
						height: d.flasher ? 279 : 207,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								justify: "stretch",
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, a.Section, {
											title: "Timer",
											fill: !0,
											children: (0, o.createComponentVNode)(
												2,
												a.LabeledControls,
												{
													justify: "start",
													children: [
														(0, o.createComponentVNode)(
															2,
															a.LabeledControls.Item,
															{
																label: "Time",
																children: (0, o.createComponentVNode)(
																	2,
																	a.Stack,
																	{
																		align: "center",
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: (0, o.createComponentVNode)(
																						2,
																						a.Knob,
																						{
																							animated: !0,
																							minValue: 0,
																							maxValue: d.maxTime,
																							value: d.time,
																							format: function (e) {
																								return (0, c.formatTime)(
																									10 * e
																								);
																							},
																							onDrag: function (e, t) {
																								return l("set-time", {
																									time: t,
																								});
																							},
																							onChange: function (e, t) {
																								return l("set-time", {
																									time: t,
																									finish: !0,
																								});
																							},
																						}
																					),
																				}
																			),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: (0, o.createComponentVNode)(
																						2,
																						a.TimeDisplay,
																						{
																							value: 10 * d.time,
																							timing: d.timing,
																							format: c.formatTime,
																						}
																					),
																				}
																			),
																		],
																	}
																),
															}
														),
														(0, o.createComponentVNode)(
															2,
															a.LabeledControls.Item,
															{
																children: (0, o.createComponentVNode)(
																	2,
																	a.Button,
																	{
																		onClick: function () {
																			return l("toggle-timing");
																		},
																		children: d.timing ? "Stop" : "Start",
																	}
																),
															}
														),
													],
												}
											),
										}),
									}),
									!!d.flusher &&
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Floor Flusher",
												fill: !0,
												children: (0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														return l("toggle-flusher");
													},
													backgroundColor: d.opening ? "orange" : undefined,
													children: d.opening
														? d.flusheropen
															? "Opening..."
															: "Closing..."
														: d.flusheropen
														? "Close Flusher"
														: "Open Flusher",
												}),
											}),
										}),
									!!d.flasher &&
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Flasher",
												fill: !0,
												children: (0, o.createComponentVNode)(2, a.Button, {
													onClick: function () {
														return l("activate-flasher");
													},
													backgroundColor: d.recharging ? "orange" : undefined,
													children: [
														"Flash Cell ",
														!!d.recharging && "(Recharging)",
													],
												}),
											}),
										}),
								],
							}),
						}),
					});
				};
			},
			70156: function () {},
			47239: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.EngineStats = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(58083),
					l = function (e) {
						if (0 === (null != e ? e : []).length) return null;
						for (
							var t = Object.keys(e[0]),
								n = t.reduce(function (e, t) {
									return (e[t] = []), e;
								}, {}),
								o = 0;
							o < e.length;
							o++
						)
							for (var r = e[o], a = 0; a < t.length; a++) {
								var c,
									i = t[a];
								n[i].push([o, null != (c = r[i]) ? c : 0]);
							}
						return n;
					},
					d = function (e) {
						var t = 0;
						for (var n in e) {
							var o = e[n][1];
							o > t && (t = o);
						}
						return t;
					},
					u = function (e) {
						return Object.entries(e).map(function (e, t) {
							var n = e[0],
								r = e[1];
							return (0,
							o.createComponentVNode)(2, a.Stack.Item, { mt: 0.5, ml: 0 === t ? 1 : undefined, children: [(0, o.createComponentVNode)(2, a.Box, { children: [n.split("|")[0], ":\xa0", 0 === r[r.length - 1][1] ? "No Data" : (0, i.formatSiUnit)(r[r.length - 1][1], 0, n.split("|")[1])] }), (0, o.createComponentVNode)(2, a.Chart.Line, { height: "3.5em", width: "20em", data: r, rangeX: [0, r.length - 1], rangeY: [0, d(r)], strokeColor: "\trgba(55,170,25, 1)", fillColor: "rgba(55,170,25, 0.25)" })] }, n);
						});
					};
				t.EngineStats = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						d = n.data,
						m = d.turnedOn,
						s = d.tegData,
						p = d.chamberData,
						h = l(s),
						C = l(p);
					return (0, o.createComponentVNode)(2, c.Window, {
						height: "560",
						width: "760",
						theme: "retro-dark",
						title: "Engine Statistics",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children:
								m && h && C
									? (0, o.createComponentVNode)(2, a.Box, {
											children: [
												(0, o.createComponentVNode)(2, a.Section, {
													title: (0, o.createComponentVNode)(2, a.Box, {
														children: [
															"TEG Data",
															(0, o.createComponentVNode)(2, a.Button, {
																tooltip: "Power",
																icon: "power-off",
																color: "caution",
																position: "absolute",
																right: 0.25,
																top: 0.25,
																onClick: function () {
																	return i("toggle-power");
																},
															}),
														],
													}),
													children: (0, o.createComponentVNode)(2, a.Stack, {
														wrap: "wrap",
														justify: "space-around",
														ml: -1,
														children: u(h),
													}),
												}),
												(0, o.createComponentVNode)(2, a.Section, {
													title: "Combustion Chamber Data",
													children: (0, o.createComponentVNode)(2, a.Stack, {
														wrap: "wrap",
														justify: "space-around",
														ml: -1,
														children: u(C),
													}),
												}),
											],
									  })
									: (0, o.createComponentVNode)(2, a.Modal, {
											textAlign: "center",
											width: 20,
											height: 5,
											fontSize: 2,
											fontFamily: "Courier",
											children: [
												"POWER ON",
												(0, o.createComponentVNode)(2, a.Button, {
													tooltip: "Power",
													icon: "power-off",
													selected: m,
													color: "caution",
													ml: 3,
													onClick: function () {
														return i("toggle-power");
													},
												}),
											],
									  }),
						}),
					});
				};
			},
			43540: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Filteriffic = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(64499),
					l = n(41860),
					d = n(41860);
				var u = function (e, t) {
						var n = e.value,
							c = e.name,
							i = e.filterName,
							l = (0, r.useBackend)(t).act;
						return (0, o.createComponentVNode)(2, a.NumberInput, {
							value: n,
							minValue: -500,
							maxValue: 500,
							stepPixelSize: 5,
							width: "39px",
							onDrag: function (e, t) {
								var n;
								return l("modify_filter_value", {
									name: i,
									new_data: ((n = {}), (n[c] = t), n),
								});
							},
						});
					},
					m = function (e, t) {
						var n = e.value,
							c = e.name,
							i = e.filterName,
							u = (0, r.useBackend)(t).act,
							m = (0, r.useLocalState)(t, i + "-" + c, 0.01),
							s = m[0],
							p = m[1];
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.NumberInput, {
									value: n,
									minValue: -500,
									maxValue: 500,
									stepPixelSize: 4,
									step: s,
									format: function (e) {
										return (0, l.toFixed)(e, (0, d.numberOfDecimalDigits)(s));
									},
									width: "80px",
									onDrag: function (e, t) {
										var n;
										return u("transition_filter_value", {
											name: i,
											new_data: ((n = {}), (n[c] = t), n),
										});
									},
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									ml: 2,
									mr: 1,
									children: "Step:",
								}),
								(0, o.createComponentVNode)(2, a.NumberInput, {
									value: s,
									step: 0.001,
									format: function (e) {
										return (0, l.toFixed)(e, 4);
									},
									width: "70px",
									onChange: function (e, t) {
										return p(t);
									},
								}),
							],
							4
						);
					},
					s = function (e, t) {
						var n = e.value,
							c = e.name,
							i = e.filterName,
							l = (0, r.useBackend)(t).act;
						return (0, o.createComponentVNode)(2, a.Input, {
							value: n,
							width: "250px",
							onInput: function (e, t) {
								var n;
								return l("modify_filter_value", {
									name: i,
									new_data: ((n = {}), (n[c] = t), n),
								});
							},
						});
					},
					p = function (e, t) {
						var n = e.value,
							c = e.filterName,
							i = e.name,
							l = (0, r.useBackend)(t).act;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Button, {
									icon: "pencil-alt",
									onClick: function () {
										return l("modify_color_value", { name: c });
									},
								}),
								(0, o.createComponentVNode)(2, a.ColorBox, {
									color: n,
									mr: 0.5,
								}),
								(0, o.createComponentVNode)(2, a.Input, {
									value: n,
									width: "90px",
									onInput: function (e, t) {
										var n;
										return l("transition_filter_value", {
											name: c,
											new_data: ((n = {}), (n[i] = t), n),
										});
									},
								}),
							],
							4
						);
					},
					h = function (e, t) {
						var n = e.value,
							c = e.filterName,
							i = (0, r.useBackend)(t).act;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Button, {
									icon: "pencil-alt",
									onClick: function () {
										return i("modify_icon_value", { name: c });
									},
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									ml: 1,
									children: n,
								}),
							],
							4
						);
					},
					C = function (e, t) {
						var n = e.name,
							c = e.value,
							l = e.filterName,
							d = e.filterType,
							u = (0, r.useBackend)(t),
							m = u.act,
							s = u.data.filter_info[d].flags;
						return (0, i.map)(function (e, t) {
							return (0, o.createComponentVNode)(2, a.Button.Checkbox, {
								checked: c & e,
								content: t,
								onClick: function () {
									var t;
									return m("modify_filter_value", {
										name: l,
										new_data: ((t = {}), (t[n] = c ^ e), t),
									});
								},
							});
						})(s);
					},
					N = function (e, t) {
						var n = e.name,
							c = e.value,
							l = e.filterName,
							d = e.filterType,
							u = (0, r.useBackend)(t),
							m = u.act,
							s = u.data.filter_info[d].space;
						return (0, i.map)(function (e, t) {
							return (0, o.createComponentVNode)(2, a.Button.Checkbox, {
								checked: c === e,
								content: t,
								onClick: function () {
									var t;
									return m("modify_filter_value", {
										name: l,
										new_data: ((t = {}), (t[n] = e), t),
									});
								},
							});
						})(s);
					},
					V = function (e, t) {
						var n = e.name,
							r = (e.value, e.hasValue),
							c =
								(e.filterName,
								{
									int: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, u, Object.assign({}, e))
									),
									float: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, m, Object.assign({}, e))
									),
									string: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, s, Object.assign({}, e))
									),
									color: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, p, Object.assign({}, e))
									),
									icon: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, h, Object.assign({}, e))
									),
									flags: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, C, Object.assign({}, e))
									),
									space: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, N, Object.assign({}, e))
									),
								});
						return (0, o.createComponentVNode)(2, a.LabeledList.Item, {
							label: n,
							children: [
								c[
									{
										x: "float",
										y: "float",
										icon: "icon",
										render_source: "string",
										flags: "flags",
										size: "float",
										color: "color",
										offset: "float",
										radius: "float",
										space: "space",
										falloff: "float",
										density: "int",
										threshold: "float",
										factor: "float",
										repeat: "int",
									}[n]
								] || "Not Found (This is an error)",
								" ",
								!r &&
									(0, o.createComponentVNode)(2, a.Box, {
										inline: !0,
										color: "average",
										children: "(Default)",
									}),
							],
						});
					},
					f = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data,
							l = e.name,
							d = e.filterDataEntry,
							u = d.type,
							m = d.priority,
							s = (function (e, t) {
								if (null == e) return {};
								var n,
									o,
									r = {},
									a = Object.keys(e);
								for (o = 0; o < a.length; o++)
									(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
								return r;
							})(d, ["type", "priority"]),
							p = i.filter_info,
							h = Object.keys(p[u].defaults);
						return (0, o.createComponentVNode)(2, a.Collapsible, {
							title: l + " (" + u + ")",
							buttons: (0, o.createFragment)(
								[
									(0, o.createComponentVNode)(2, a.NumberInput, {
										value: m,
										stepPixelSize: 10,
										width: "60px",
										onChange: function (e, t) {
											return c("change_priority", { name: l, new_priority: t });
										},
									}),
									(0, o.createComponentVNode)(2, a.Button.Input, {
										content: "Rename",
										placeholder: l,
										onCommit: function (e, t) {
											return c("rename_filter", { name: l, new_name: t });
										},
										width: "90px",
									}),
									(0, o.createComponentVNode)(2, a.Button.Confirm, {
										icon: "minus",
										onClick: function () {
											return c("remove_filter", { name: l });
										},
									}),
								],
								4
							),
							children: (0, o.createComponentVNode)(2, a.Section, {
								level: 2,
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: h.map(function (e) {
										var t = p[u].defaults,
											n = s[e] || t[e],
											r = n !== t[e];
										return (0,
										o.createComponentVNode)(2, V, { filterName: l, filterType: u, name: e, value: n, hasValue: r }, e);
									}),
								}),
							}),
						});
					};
				t.Filteriffic = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.target_name || "Unknown Object",
						m = d.target_filter_data || {},
						s = m !== {},
						p = d.filter_info,
						h = (0, r.useLocalState)(t, "massApplyPath", ""),
						C = h[0],
						N = h[1],
						V = (0, r.useLocalState)(t, "hidden", !1),
						g = V[0],
						b = V[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 500,
						height: 500,
						title: "Filteriffic",
						resizable: !0,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.NoticeBox, {
									danger: !0,
									children:
										"DO NOT MESS WITH EXISTING FILTERS IF YOU DO NOT KNOW THE CONSEQUENCES. YOU HAVE BEEN WARNED.",
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: g
										? (0, o.createFragment)(
												[
													(0, o.createComponentVNode)(2, a.Box, {
														mr: 0.5,
														inline: !0,
														children: "MASS EDIT:",
													}),
													(0, o.createComponentVNode)(2, a.Input, {
														value: C,
														width: "100px",
														onInput: function (e, t) {
															return N(t);
														},
													}),
													(0, o.createComponentVNode)(2, a.Button.Confirm, {
														content: "Apply",
														confirmContent: "ARE YOU SURE?",
														onClick: function () {
															return l("mass_apply", { path: C });
														},
													}),
												],
												4
										  )
										: (0, o.createComponentVNode)(2, a.Box, {
												inline: !0,
												onDblClick: function () {
													return b(!0);
												},
												children: u,
										  }),
									buttons: (0, o.createComponentVNode)(2, a.Dropdown, {
										icon: "plus",
										displayText: "Add Filter",
										nochevron: !0,
										options: Object.keys(p),
										onSelected: function (e) {
											return l("add_filter", {
												name: "default",
												priority: 10,
												type: e,
											});
										},
									}),
									children: s
										? (0, i.map)(function (e, t) {
												return (0,
												o.createComponentVNode)(2, f, { filterDataEntry: e, name: t }, t);
										  })(m)
										: (0, o.createComponentVNode)(2, a.Box, {
												children: "No filters",
										  }),
								}),
							],
						}),
					});
				};
			},
			74036: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.FlockPanel = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.partitions;
						return (0, o.createComponentVNode)(2, a.Stack, {
							vertical: !0,
							children: c.map(function (e) {
								return (0, o.createComponentVNode)(
									2,
									a.Stack.Item,
									{
										children: (0, o.createComponentVNode)(2, a.Stack, {
											align: "center",
											height: "100%",
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													width: "20%",
													height: "100%",
													children: (0, o.createComponentVNode)(2, a.Section, {
														align: "center",
														height: "100%",
														children: e.name,
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													height: "100%",
													grow: 1,
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children:
															e.host &&
															(0, o.createComponentVNode)(2, a.Stack, {
																children: [
																	(0, o.createComponentVNode)(2, a.Stack.Item, {
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Icon,
																			{ name: "wifi", size: 3 }
																		),
																	}),
																	(0, o.createComponentVNode)(2, a.Stack.Item, {
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Stack,
																			{
																				vertical: !0,
																				align: "center",
																				children: [
																					(0, o.createComponentVNode)(
																						2,
																						a.Stack.Item,
																						{ children: e.host }
																					),
																					(0, o.createComponentVNode)(
																						2,
																						a.Stack.Item,
																						{
																							children: [
																								e.health,
																								(0, o.createComponentVNode)(
																									2,
																									a.Icon,
																									{ name: "heart" }
																								),
																							],
																						}
																					),
																				],
																			}
																		),
																	}),
																],
															}),
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													height: "100%",
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children: (0, o.createComponentVNode)(2, a.Stack, {
															children: [
																e.host &&
																	(0, o.createComponentVNode)(2, a.Stack.Item, {
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				onClick: function () {
																					return n("eject_trace", {
																						origin: e.ref,
																					});
																				},
																				children: "Eject",
																			}
																		),
																	}),
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			onClick: function () {
																				return n("delete_trace", {
																					origin: e.ref,
																				});
																			},
																			children: "Remove sentience",
																		}
																	),
																}),
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			onClick: function () {
																				return n("jump_to", { origin: e.ref });
																			},
																			children: "Jump",
																		}
																	),
																}),
															],
														}),
													}),
												}),
											],
										}),
									},
									e.ref
								);
							}),
						});
					},
					l = {
						thinking: "brain",
						shooting: "bolt",
						rummaging: "dumpster",
						wandering: "route",
						building: "hammer",
						nesting: "hammer",
						harvesting: "cogs",
						controlled: "wifi",
						replicating: "egg",
						rallying: "map-marker",
						"opening container": "box-open",
						butchering: "recycle",
						repairing: "tools",
						capturing: "bars",
						depositing: "border-style",
						observing: "eye",
						deconstructing: "trash",
						hibernating: "stop-circle",
					},
					d = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.drones,
							i = e.sortBy;
						return (0, o.createComponentVNode)(2, a.Stack, {
							vertical: !0,
							children: c
								.sort(function (e, t) {
									return (function (e, t, n) {
										return isNaN(e[n]) || isNaN(t[n])
											? ("" + e[n]).localeCompare(t[n])
											: t[n] - e[n];
									})(e, t, i);
								})
								.map(function (e) {
									return (0, o.createComponentVNode)(
										2,
										a.Stack.Item,
										{
											children: (0, o.createComponentVNode)(2, a.Stack, {
												children: [
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														width: "20%",
														children: (0, o.createComponentVNode)(
															2,
															a.Section,
															{
																height: "100%",
																children: (0, o.createComponentVNode)(
																	2,
																	a.Stack,
																	{
																		vertical: !0,
																		align: "center",
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{ children: e.name }
																			),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: [
																						e.health,
																						(0, o.createComponentVNode)(
																							2,
																							a.Icon,
																							{ name: "heart" }
																						),
																						" ",
																						e.resources,
																						(0, o.createComponentVNode)(
																							2,
																							a.Icon,
																							{ name: "cog" }
																						),
																					],
																				}
																			),
																		],
																	}
																),
															}
														),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														grow: 1,
														children: (0, o.createComponentVNode)(
															2,
															a.Section,
															{
																height: "100%",
																children: (0, o.createComponentVNode)(
																	2,
																	a.Stack,
																	{
																		align: "center",
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					width: "50px",
																					children: (0, o.createComponentVNode)(
																						2,
																						a.Box,
																						{
																							align: "center",
																							children:
																								((r = e.task),
																								(c = l[r]),
																								c
																									? (0, o.createComponentVNode)(
																											2,
																											a.Icon,
																											{ size: 3, name: c }
																									  )
																									: ""),
																						}
																					),
																				}
																			),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: [
																						(0, o.createVNode)(
																							1,
																							"b",
																							null,
																							e.area,
																							0
																						),
																						" ",
																						(0, o.createVNode)(1, "br"),
																						" ",
																						e.task &&
																							((t = e.task),
																							t.charAt(0).toUpperCase() +
																								t.slice(1)),
																					],
																				}
																			),
																		],
																	}
																),
															}
														),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(
															2,
															a.Section,
															{
																height: "100%",
																children: (0, o.createComponentVNode)(
																	2,
																	a.Stack,
																	{
																		children: [
																			"controlled" === e.task &&
																				(0, o.createComponentVNode)(
																					2,
																					a.Stack.Item,
																					{
																						children: (0,
																						o.createComponentVNode)(
																							2,
																							a.Button,
																							{
																								onClick: function () {
																									return n("eject_trace", {
																										origin: e.controller_ref,
																									});
																								},
																								children: "Eject Trace",
																							}
																						),
																					}
																				),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: (0, o.createComponentVNode)(
																						2,
																						a.Button,
																						{
																							onClick: function () {
																								return n("rally", {
																									origin: e.ref,
																								});
																							},
																							children: "Rally",
																						}
																					),
																				}
																			),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: (0, o.createComponentVNode)(
																						2,
																						a.Button,
																						{
																							onClick: function () {
																								return n("jump_to", {
																									origin: e.ref,
																								});
																							},
																							children: "Jump",
																						}
																					),
																				}
																			),
																		],
																	}
																),
															}
														),
													}),
												],
											}),
										},
										e.ref
									);
									var t, r, c;
								}),
						});
					},
					u = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.structures;
						return (0, o.createComponentVNode)(2, a.Stack, {
							vertical: !0,
							children: c.map(function (e) {
								return (0, o.createComponentVNode)(
									2,
									a.Stack.Item,
									{
										children: (0, o.createComponentVNode)(2, a.Stack, {
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													width: "30%",
													children: (0, o.createComponentVNode)(2, a.Tooltip, {
														position: "bottom",
														content: e.desc,
														children: (0, o.createComponentVNode)(
															2,
															a.Section,
															{
																position: "relative",
																children: (0, o.createComponentVNode)(
																	2,
																	a.Stack,
																	{
																		vertical: !0,
																		align: "center",
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{ children: e.name }
																			),
																			(0, o.createComponentVNode)(
																				2,
																				a.Stack.Item,
																				{
																					children: [
																						e.health,
																						" ",
																						(0, o.createComponentVNode)(
																							2,
																							a.Icon,
																							{ name: "heart" }
																						),
																					],
																				}
																			),
																		],
																	}
																),
															}
														),
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													grow: 1,
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children:
															e.compute > 0 && "Compute provided: " + e.compute,
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children: (0, o.createComponentVNode)(2, a.Stack, {
															children: [
																"Construction Tealprint" === e.name &&
																	(0, o.createComponentVNode)(2, a.Stack.Item, {
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				onClick: function () {
																					return n("cancel_tealprint", {
																						origin: e.ref,
																					});
																				},
																				children: "Cancel",
																			}
																		),
																	}),
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			onClick: function () {
																				return n("jump_to", { origin: e.ref });
																			},
																			children: "Jump",
																		}
																	),
																}),
															],
														}),
													}),
												}),
											],
										}),
									},
									e.ref
								);
							}),
						});
					},
					m = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.enemies;
						return (0, o.createComponentVNode)(2, a.Stack, {
							vertical: !0,
							children: c.map(function (e) {
								return (0, o.createComponentVNode)(
									2,
									a.Stack.Item,
									{
										children: (0, o.createComponentVNode)(2, a.Stack, {
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													width: "30%",
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children: e.name,
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													grow: 1,
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children: (0, o.createComponentVNode)(2, a.Stack, {
															children: (0, o.createComponentVNode)(
																2,
																a.Stack.Item,
																{
																	grow: 1,
																	children: (0, o.createVNode)(
																		1,
																		"b",
																		null,
																		e.area,
																		0
																	),
																}
															),
														}),
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: (0, o.createComponentVNode)(2, a.Section, {
														height: "100%",
														children: (0, o.createComponentVNode)(2, a.Stack, {
															children: [
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			icon: "times",
																			onClick: function () {
																				return n("remove_enemy", {
																					origin: e.ref,
																				});
																			},
																			children: "Remove",
																		}
																	),
																}),
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			onClick: function () {
																				return n("jump_to", { origin: e.ref });
																			},
																			children: "Jump",
																		}
																	),
																}),
															],
														}),
													}),
												}),
											],
										}),
									},
									e.ref
								);
							}),
						});
					};
				t.FlockPanel = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.data,
						s = n.act,
						p = (0, r.useLocalState)(t, "sortBy", "resources"),
						h = p[0],
						C = p[1],
						N = l.vitals,
						V = l.partitions,
						f = l.drones,
						g = l.structures,
						b = l.enemies,
						v = l.category_lengths,
						k = l.category;
					return (0, o.createComponentVNode)(2, c.Window, {
						theme: "flock",
						title: "Flockmind " + N.name,
						width: 600,
						height: 450,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.Tabs, {
									children: [
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: "drones" === k,
											onClick: function () {
												s("change_tab", { tab: "drones" });
											},
											children: ["Drones ", "(" + v.drones + ")"],
										}),
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: "traces" === k,
											onClick: function () {
												s("change_tab", { tab: "traces" });
											},
											children: ["Partitions ", "(" + v.traces + ")"],
										}),
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: "structures" === k,
											onClick: function () {
												s("change_tab", { tab: "structures" });
											},
											children: ["Structures ", "(" + v.structures + ")"],
										}),
										(0, o.createComponentVNode)(2, a.Tabs.Tab, {
											selected: "enemies" === k,
											onClick: function () {
												s("change_tab", { tab: "enemies" });
											},
											children: ["Enemies ", "(" + v.enemies + ")"],
										}),
									],
								}),
								"drones" === k &&
									(0, o.createComponentVNode)(2, a.Box, {
										children: [
											(0, o.createComponentVNode)(2, a.Dropdown, {
												options: ["name", "health", "resources", "area"],
												selected: "resources",
												onSelected: function (e) {
													return C(e);
												},
											}),
											(0, o.createComponentVNode)(2, d, {
												drones: f,
												sortBy: h,
											}),
										],
									}),
								"traces" === k &&
									(0, o.createComponentVNode)(2, i, { partitions: V }),
								"structures" === k &&
									(0, o.createComponentVNode)(2, u, { structures: g }),
								"enemies" === k &&
									(0, o.createComponentVNode)(2, m, { enemies: b }),
							],
						}),
					});
				};
			},
			56964: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Freezer = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(46473),
					c = n(74814),
					i = n(85952),
					l = n(58083);
				t.Freezer = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.target_temperature,
						s = u.active,
						p = u.air_temperature,
						h = u.air_pressure;
					return (0, o.createComponentVNode)(2, i.Window, {
						title: "Freezer",
						width: 320,
						height: 215,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, c.Section, {
									title: "Temperature Control",
									children: (0, o.createComponentVNode)(2, c.Stack, {
										align: "center",
										children: [
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												children: (0, o.createComponentVNode)(2, c.Knob, {
													animated: !0,
													size: 2,
													value: m,
													minValue: 73.15,
													maxValue: 293.15,
													format: function (e) {
														return e + " K";
													},
													onDrag: function (e, t) {
														return d("set_target_temperature", { value: t });
													},
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												grow: !0,
												basis: 0,
												overflow: "hidden",
												children: (0, o.createComponentVNode)(2, c.Box, {
													className: "ChemHeater__TemperatureNumber",
													nowrap: !0,
													p: 1,
													fontSize: 1.5,
													color: (0, a.getTemperatureColor)(m),
													backgroundColor: "black",
													children: [
														(0, o.createComponentVNode)(2, c.Box, {
															fontSize: 1,
															children: "Target",
														}),
														(0, o.createComponentVNode)(2, c.Icon, {
															name: (0, a.getTemperatureIcon)(m),
															pr: 0.5,
														}),
														(0, o.createComponentVNode)(2, c.AnimatedNumber, {
															value: m,
														}),
														" K",
													],
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												basis: 9.6,
												align: "center",
												children: (0, o.createComponentVNode)(2, c.Button, {
													icon: "power-off",
													color: 0 === s ? "red" : "green",
													fluid: !0,
													height: "100%",
													fontSize: 1.25,
													textAlign: "center",
													onClick: function () {
														return d("active_toggle");
													},
													children: 0 === s ? "Deactivate" : "Activate",
												}),
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, c.Section, {
									children: (0, o.createComponentVNode)(2, c.Stack, {
										align: "center",
										children: [
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												children: (0, o.createComponentVNode)(2, c.Box, {
													className: "ChemHeater__TemperatureNumber",
													nowrap: !0,
													p: 1,
													width: "50%",
													fontSize: 1.3,
													color: (0, a.getTemperatureColor)(p),
													children: [
														(0, o.createComponentVNode)(2, c.Box, {
															fontSize: 1,
															children: "Current Temperature",
														}),
														(0, o.createComponentVNode)(2, c.Icon, {
															name: (0, a.getTemperatureIcon)(p),
															pr: 0.5,
														}),
														(0, o.createComponentVNode)(2, c.AnimatedNumber, {
															value: p,
														}),
														" K",
													],
												}),
											}),
											(0, o.createComponentVNode)(2, c.Stack.Item, {
												children: (0, o.createComponentVNode)(2, c.Box, {
													nowrap: !0,
													p: 1,
													width: "50%",
													fontSize: 1.3,
													children: [
														(0, o.createComponentVNode)(2, c.Box, {
															fontSize: 1,
															children: "Current Pressure",
														}),
														(0, o.createComponentVNode)(2, c.AnimatedNumber, {
															value: (0, l.formatPressure)(h),
														}),
													],
												}),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
			},
			48265: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Detonator = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(37383);
				t.Detonator = function (e) {
					var t = e.detonator,
						n = e.detonatorAttachments,
						a = e.onToggleAnchor,
						l = e.onToggleSafety,
						d = e.onWireInteract,
						u = e.onPrimeDetonator,
						m = e.onTriggerActivate,
						s = e.onSetTimer;
					return (0, o.createComponentVNode)(2, r.Section, {
						title: "Detonator",
						children: [
							(0, o.createComponentVNode)(2, c, {
								detonator: t,
								onWireInteract: d,
								onSetTimer: s,
							}),
							(0, o.createComponentVNode)(2, r.Divider),
							(0, o.createComponentVNode)(2, i, {
								detonator: t,
								detonatorAttachments: n,
								onToggleAnchor: a,
								onToggleSafety: l,
								onPrimeDetonator: u,
								onTriggerActivate: m,
							}),
						],
					});
				};
				var c = function (e) {
						var t = e.detonator,
							n = (t = void 0 === t ? {} : t).wireNames,
							c = t.wireStatus,
							i = t.time,
							l = t.isPrimed,
							d = e.onWireInteract,
							u = e.onSetTimer;
						return (0, o.createComponentVNode)(2, r.Flex, {
							children: [
								(0, o.createComponentVNode)(2, r.Flex.Item, {
									children: (0, o.createComponentVNode)(2, r.LabeledList, {
										children: n.map(function (e, t) {
											return (0, o.createComponentVNode)(
												2,
												r.LabeledList.Item,
												{
													label: e,
													children: (0, o.createComponentVNode)(2, r.Box, {
														height: 1.7,
														children:
															c && c[t]
																? (0, o.createFragment)(
																		[
																			(0, o.createComponentVNode)(2, r.Button, {
																				icon: "cut",
																				content: "Cut",
																				onClick: function () {
																					return d("cut", t);
																				},
																			}),
																			(0, o.createComponentVNode)(2, r.Button, {
																				icon: "bolt",
																				content: "Pulse",
																				onClick: function () {
																					return d("pulse", t);
																				},
																			}),
																		],
																		4
																  )
																: (0, o.createComponentVNode)(2, r.Box, {
																		color: "average",
																		minHeight: 1.4,
																		children: "Cut",
																  }),
													}),
												},
												e + t
											);
										}),
									}),
								}),
								(0, o.createComponentVNode)(2, r.Flex.Item, {
									mr: 2,
									mt: 2,
									children: (0, o.createComponentVNode)(2, r.Flex, {
										direction: "column",
										align: "center",
										children: [
											(0, o.createComponentVNode)(2, r.Flex.Item, {
												children: (0, o.createComponentVNode)(
													2,
													a.DetonatorTimer,
													{ time: i, isPrimed: l }
												),
											}),
											(0, o.createComponentVNode)(2, r.Flex.Item, {
												children: [
													(0, o.createComponentVNode)(2, r.Button, {
														mt: 1,
														disabled: l,
														icon: "fast-backward",
														onClick: function () {
															return u(i - 300);
														},
													}),
													(0, o.createComponentVNode)(2, r.Button, {
														mt: 1,
														disabled: l,
														icon: "backward",
														onClick: function () {
															return u(i - 10);
														},
													}),
													(0, o.createComponentVNode)(2, r.Button, {
														mt: 1,
														disabled: l,
														icon: "forward",
														onClick: function () {
															return u(i + 10);
														},
													}),
													(0, o.createComponentVNode)(2, r.Button, {
														mt: 1,
														disabled: l,
														icon: "fast-forward",
														onClick: function () {
															return u(i + 300);
														},
													}),
												],
											}),
										],
									}),
								}),
							],
						});
					},
					i = function (e) {
						var t = e.detonator,
							n = (t = void 0 === t ? {} : t).isAnchored,
							a = t.trigger,
							c = t.safetyIsOn,
							i = t.isPrimed,
							l = e.detonatorAttachments,
							d = e.onToggleAnchor,
							u = e.onToggleSafety,
							m = e.onPrimeDetonator,
							s = e.onTriggerActivate;
						return (0, o.createComponentVNode)(2, r.LabeledList, {
							children: [
								(0, o.createComponentVNode)(2, r.LabeledList.Item, {
									className: "gas-canister-detonator-utility__list-item",
									label: "Anchor Status",
									children: n
										? "Anchored. There are no controls for undoing this."
										: (0, o.createComponentVNode)(2, r.Button, {
												icon: "anchor",
												content: "Anchor",
												onClick: d,
										  }),
								}),
								(0, o.createComponentVNode)(2, r.LabeledList.Item, {
									className: "gas-canister-detonator-utility__list-item",
									label: "Trigger",
									children: a
										? (0, o.createComponentVNode)(2, r.Button, {
												onClick: s,
												children: a,
										  })
										: "There is no trigger attached.",
								}),
								(0, o.createComponentVNode)(2, r.LabeledList.Item, {
									className: "gas-canister-detonator-utility__list-item",
									label: "Safety",
									children: c
										? (0, o.createComponentVNode)(2, r.Button, {
												color: "average",
												icon: "power-off",
												content: "Turn Off",
												onClick: u,
										  })
										: (0, o.createComponentVNode)(2, r.Box, {
												color: "average",
												children: "Off",
										  }),
								}),
								(0, o.createComponentVNode)(2, r.LabeledList.Item, {
									className: "gas-canister-detonator-utility__list-item",
									label: "Arming",
									children: c
										? "The safety is on, therefore, you cannot prime the bomb."
										: i
										? (0, o.createComponentVNode)(2, r.Box, {
												bold: !0,
												color: "red",
												children: "PRIMED",
										  })
										: (0, o.createComponentVNode)(2, r.Button, {
												color: "danger",
												icon: "bomb",
												content: "Prime",
												onClick: m,
										  }),
								}),
								(0, o.createComponentVNode)(2, r.LabeledList.Item, {
									label: "Attachments",
									className: "gas-canister-detonator-utility__list-item",
									children:
										l && l.length > 0
											? l.map(function (e, t) {
													return (0,
													o.createComponentVNode)(2, r.Box, { className: "gas-canister-detonator-utility__attachment-item", children: l[t] }, e + t);
											  })
											: "There are no additional attachments to the detonator.",
								}),
							],
						});
					};
			},
			37383: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.DetonatorTimer = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(58083);
				t.DetonatorTimer = function (e) {
					var t = e.time,
						n = e.isPrimed,
						c = e.warningThreshold,
						i = void 0 === c ? 300 : c,
						l = e.dangerThreshold,
						d = void 0 === l ? 100 : l,
						u = e.explosionMessage,
						m = void 0 === u ? "BO:OM" : u,
						s = "green";
					return (
						t <= d ? (s = "red") : t <= i && (s = "orange"),
						(0, o.createComponentVNode)(2, r.Box, {
							p: 1,
							textAlign: "center",
							backgroundColor: "black",
							color: s,
							maxWidth: "90px",
							width: "90px",
							fontSize: "20px",
							children: (0, o.createComponentVNode)(2, r.TimeDisplay, {
								value: t,
								timing: n,
								format: function (e) {
									return (0, a.formatTime)(e, m);
								},
							}),
						})
					);
				};
			},
			73981: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GasCanister = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(34227),
					l = n(988),
					d = n(52472),
					u = n(48265);
				function m(e, t) {
					return (m =
						Object.setPrototypeOf ||
						function (e, t) {
							return (e.__proto__ = t), e;
						})(e, t);
				}
				t.GasCanister = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						m = n.data,
						p = m.connected,
						h = m.holding,
						C = m.hasValve,
						N = m.valveIsOpen,
						V = m.pressure,
						f = m.maxPressure,
						g = m.releasePressure,
						b = m.minRelease,
						v = m.maxRelease,
						k = m.detonator,
						x = m.detonatorAttachments,
						w = m.hasPaper,
						S = !!k;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: S ? (w ? 880 : 470) : 305,
						height: S ? 685 : 340,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Flex, {
								children: [
									(0, o.createComponentVNode)(2, a.Flex.Item, {
										width: "480px",
										children: [
											(0, o.createComponentVNode)(2, i.PortableBasicInfo, {
												connected: p,
												pressure: V,
												maxPressure: f,
												children: [
													(0, o.createComponentVNode)(2, a.Divider),
													C
														? (0, o.createComponentVNode)(2, l.ReleaseValve, {
																valveIsOpen: N,
																releasePressure: g,
																minRelease: b,
																maxRelease: v,
																onToggleValve: function () {
																	d("toggle-valve");
																},
																onSetPressure: function (e) {
																	d("set-pressure", { releasePressure: e });
																},
														  })
														: (0, o.createComponentVNode)(2, a.Box, {
																color: "average",
																children: "The release valve is missing.",
														  }),
												],
											}),
											k
												? (0, o.createComponentVNode)(2, u.Detonator, {
														detonator: k,
														detonatorAttachments: x,
														onToggleAnchor: function () {
															d("anchor");
														},
														onToggleSafety: function () {
															d("safety");
														},
														onWireInteract: function (e, t) {
															d("wire-interact", { index: t, toolAction: e });
														},
														onPrimeDetonator: function () {
															d("prime");
														},
														onTriggerActivate: function () {
															d("trigger");
														},
														onSetTimer: function (e) {
															d("timer", { newTime: e });
														},
												  })
												: (0, o.createComponentVNode)(
														2,
														i.PortableHoldingTank,
														{
															holding: h,
															onEjectTank: function () {
																d("eject-tank");
															},
														}
												  ),
										],
									}),
									!!w &&
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											width: "410px",
											children: (0, o.createComponentVNode)(2, s),
										}),
								],
							}),
						}),
					});
				};
				var s = (function (e) {
					var t, n;
					function c(t, n) {
						var o;
						return (
							((o = e.call(this, t) || this).el =
								document.createElement("div")),
							o
						);
					}
					return (
						(n = e),
						((t = c).prototype = Object.create(n.prototype)),
						(t.prototype.constructor = t),
						m(t, n),
						(c.prototype.render = function () {
							var e = (0, r.useBackend)(this.context).data.paperData,
								t = e.text,
								n = e.stamps;
							return (0, o.createComponentVNode)(2, a.Section, {
								scrollable: !0,
								width: "400px",
								height: "518px",
								backgroundColor: "white",
								style: { "overflow-wrap": "break-word" },
								children: (0, o.createComponentVNode)(2, d.PaperSheetView, {
									value: t || "",
									stamps: n,
									readOnly: !0,
								}),
							});
						}),
						c
					);
				})(o.Component);
			},
			84183: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GasTankInfo = t.GasTank = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(58083),
					l = n(988);
				t.GasTank = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						u = n.data,
						m = u.pressure,
						s = u.maxPressure,
						p = u.valveIsOpen,
						h = u.releasePressure,
						C = u.maxRelease;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 400,
						height: 220,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Status",
									children: (0, o.createComponentVNode)(2, d, {
										pressure: m,
										maxPressure: s,
									}),
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									children: (0, o.createComponentVNode)(2, l.ReleaseValve, {
										valveIsOpen: p,
										releasePressure: h,
										maxRelease: C,
										onToggleValve: function () {
											i("toggle-valve");
										},
										onSetPressure: function (e) {
											i("set-pressure", { releasePressure: e });
										},
									}),
								}),
							],
						}),
					});
				};
				var d = function (e) {
					var t = e.pressure,
						n = e.maxPressure;
					return (0, o.createComponentVNode)(2, a.LabeledList, {
						children: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
							label: "Pressure",
							children: (0, o.createComponentVNode)(2, a.RoundGauge, {
								size: 1.75,
								value: t,
								minValue: 0,
								maxValue: n,
								alertAfter: 0.7 * n,
								ranges: {
									good: [0, 0.7 * n],
									average: [0.7 * n, 0.85 * n],
									bad: [0.85 * n, n],
								},
								format: i.formatPressure,
							}),
						}),
					});
				};
				t.GasTankInfo = d;
			},
			93823: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GeneTek = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(10307),
					l = function (e) {
						return e > 0 ? (e / 10).toFixed(0) + "s" : "Ready";
					};
				t.GeneTek = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.data,
						u = n.act,
						m = (0, r.useSharedState)(t, "menu", "research"),
						s = m[0],
						p = m[1],
						h = (0, r.useSharedState)(t, "buymats", null),
						C = h[0],
						N = h[1],
						V = (0, r.useSharedState)(t, "iscombining", !1)[0],
						f = d.materialCur,
						g = d.materialMax,
						b = d.currentResearch,
						v = d.equipmentCooldown,
						k = d.subject,
						x = d.costPerMaterial,
						w = d.budget,
						S = d.record,
						y = d.scannerAlert,
						B = d.scannerError,
						I = d.allowed,
						T = k || {},
						L = T.name,
						_ = T.stat,
						P = T.health,
						A = T.stability,
						M = Math.min(g - f, Math.floor(w / x));
					return (0, o.createComponentVNode)(2, c.Window, {
						theme: I ? "genetek" : "genetek-disabled",
						width: 730,
						height: 415,
						children: (0, o.createComponentVNode)(2, a.Flex, {
							height: "100%",
							children: [
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									width: "245px",
									height: "100%",
									style: { padding: "5px 5px 5px 5px" },
									children: (0, o.createComponentVNode)(2, a.Flex, {
										direction: "column",
										height: "100%",
										children: [
											!I &&
												(0, o.createFragment)(
													[
														(0, o.createVNode)(
															1,
															"div",
															null,
															"Insufficient access to interact.",
															16,
															{
																style: {
																	color: "#ff3333",
																	"text-align": "center",
																},
															}
														),
														(0, o.createComponentVNode)(2, a.Divider),
													],
													4
												),
											(0, o.createComponentVNode)(2, a.Flex, {
												children: [
													(0, o.createComponentVNode)(2, a.ProgressBar, {
														value: f,
														maxValue: g,
														mb: 1,
														children: [
															(0, o.createComponentVNode)(2, a.Box, {
																position: "absolute",
																bold: !0,
																children: "Materials",
															}),
															f,
															" / ",
															g,
														],
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														grow: 0,
														shrink: 0,
														ml: 1,
														children: (0, o.createComponentVNode)(2, a.Button, {
															circular: !0,
															compact: !0,
															icon: "dollar-sign",
															disabled: M <= 0,
															onClick: function () {
																return N(1);
															},
														}),
													}),
												],
											}),
											k &&
												(0, o.createComponentVNode)(2, a.LabeledList, {
													children: [
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															label: "Occupant",
															children: L,
														}),
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															label: "Health",
															children: (0, o.createComponentVNode)(
																2,
																a.ProgressBar,
																{
																	ranges: {
																		bad: [-Infinity, 0.15],
																		average: [0.15, 0.75],
																		good: [0.75, Infinity],
																	},
																	value: P,
																	children:
																		_ < 2
																			? P <= 0
																				? (0, o.createComponentVNode)(
																						2,
																						a.Box,
																						{
																							color: "bad",
																							children: [
																								(0, o.createComponentVNode)(
																									2,
																									a.Icon,
																									{
																										name: "exclamation-triangle",
																									}
																								),
																								" Critical",
																							],
																						}
																				  )
																				: (100 * P).toFixed(0) + "%"
																			: (0, o.createComponentVNode)(2, a.Box, {
																					children: [
																						(0, o.createComponentVNode)(
																							2,
																							a.Icon,
																							{ name: "skull" }
																						),
																						" Deceased",
																					],
																			  }),
																}
															),
														}),
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															label: "Stability",
															children: (0, o.createComponentVNode)(
																2,
																a.ProgressBar,
																{
																	ranges: {
																		bad: [-Infinity, 15],
																		average: [15, 75],
																		good: [75, Infinity],
																	},
																	value: A,
																	maxValue: 100,
																}
															),
														}),
													],
												}),
											(0, o.createComponentVNode)(2, a.Divider),
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												grow: 1,
												style: { overflow: "hidden" },
												children: b.map(function (e) {
													return (0,
													o.createComponentVNode)(2, a.ProgressBar, { value: e.total - e.current, maxValue: e.total, mb: 1, children: [(0, o.createComponentVNode)(2, a.Box, { position: "absolute", children: e.name }), (0, o.createComponentVNode)(2, a.TimeDisplay, { timing: !0, value: e.current, format: l })] }, e.ref);
												}),
											}),
											!!y &&
												(0, o.createComponentVNode)(2, a.NoticeBox, {
													info: !B,
													danger: !!B,
													children: y,
												}),
											(0, o.createComponentVNode)(2, a.Divider),
											(0, o.createComponentVNode)(2, a.LabeledList, {
												children: v.map(function (e) {
													return (0,
													o.createComponentVNode)(2, a.LabeledList.Item, { label: e.label, children: e.cooldown < 0 ? "Ready" : (0, o.createComponentVNode)(2, a.TimeDisplay, { timing: !0, value: e.cooldown, format: l }) }, e.label);
												}),
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, c.Window.Content, {
									scrollable: !0,
									children: (0, o.createComponentVNode)(2, a.Flex.Item, {
										children: (0, o.createComponentVNode)(2, a.Box, {
											ml: "250px",
											children: [
												(0, o.createComponentVNode)(2, a.Tabs, {
													children: [
														(0, o.createComponentVNode)(2, a.Tabs.Tab, {
															icon: "flask",
															selected: "research" === s,
															onClick: function () {
																return p("research");
															},
															children: "Research",
														}),
														(0, o.createComponentVNode)(2, a.Tabs.Tab, {
															icon: "radiation",
															selected: "mutations" === s,
															onClick: function () {
																return p("mutations");
															},
															children: "Mutations",
														}),
														(0, o.createComponentVNode)(2, a.Tabs.Tab, {
															icon: "server",
															selected:
																"storage" === s || (!S && "record" === s),
															onClick: function () {
																return p("storage");
															},
															children: "Storage",
														}),
														!!S &&
															(0, o.createComponentVNode)(2, a.Tabs.Tab, {
																icon: "save",
																selected: "record" === s,
																onClick: function () {
																	return p("record");
																},
																rightSlot:
																	"record" === s &&
																	(0, o.createComponentVNode)(2, a.Button, {
																		circular: !0,
																		compact: !0,
																		color: "transparent",
																		icon: "times",
																		onClick: function () {
																			return u("clearrecord");
																		},
																	}),
																children: "Record",
															}),
														k &&
															(0, o.createComponentVNode)(2, a.Tabs.Tab, {
																icon: "dna",
																selected: "scanner" === s,
																onClick: function () {
																	return p("scanner");
																},
																children: "Scanner",
															}),
													],
												}),
												null !== C &&
													(0, o.createComponentVNode)(2, i.BuyMaterialsModal, {
														maxAmount: M,
													}),
												!!V &&
													(0, o.createComponentVNode)(2, i.CombineGenesModal),
												"research" === s &&
													(0, o.createComponentVNode)(2, i.ResearchTab, {
														maxBuyMats: M,
														setBuyMats: N,
													}),
												"mutations" === s &&
													(0, o.createComponentVNode)(2, i.MutationsTab),
												"storage" === s &&
													(0, o.createComponentVNode)(2, i.StorageTab),
												"record" === s &&
													(S
														? (0, o.createComponentVNode)(2, i.RecordTab)
														: (0, o.createComponentVNode)(2, i.StorageTab)),
												"scanner" === s &&
													(0, o.createComponentVNode)(2, i.ScannerTab),
											],
										}),
									}),
								}),
							],
						}),
					});
				};
			},
			40909: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.AppearanceEditor = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.AppearanceEditor = function (e, t) {
					var n = (0, r.useBackend)(t).act,
						i = e.preview,
						l = e.hairStyles,
						d = e.skin,
						u = e.eyes,
						m = e.color1,
						s = e.color2,
						p = e.color3,
						h = e.style1,
						C = e.style2,
						N = e.style3,
						V = e.fixColors,
						f = e.hasEyes,
						g = e.hasSkin,
						b = e.hasHair,
						v = e.channels;
					return (0, o.createComponentVNode)(2, a.Section, {
						title: "Appearance Editor",
						buttons: (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Button, {
									onClick: function () {
										return n("editappearance", { apply: !0 });
									},
									icon: "user",
									color: "good",
									children: "Apply Changes",
								}),
								(0, o.createComponentVNode)(2, a.Button, {
									onClick: function () {
										return n("editappearance", { cancel: !0 });
									},
									icon: "times",
									color: "bad",
								}),
							],
							4
						),
						children: (0, o.createComponentVNode)(2, a.Flex, {
							children: [
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									shrink: "1",
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											!!g &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Skin Tone",
													children: (0, o.createComponentVNode)(2, c, {
														color: d,
														onChange: function (e) {
															return n("editappearance", { skin: e });
														},
													}),
												}),
											!!f &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Eye Color",
													children: (0, o.createComponentVNode)(2, c, {
														color: u,
														onChange: function (e) {
															return n("editappearance", { eyes: e });
														},
													}),
												}),
											!((!g && !f) || !v[0]) &&
												(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											!!v[0] &&
												!!b &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[0],
													children: (0, o.createComponentVNode)(2, a.Dropdown, {
														width: 20,
														selected: h,
														onSelected: function (e) {
															return n("editappearance", { style1: e });
														},
														options: l,
													}),
												}),
											!!v[0] &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[0].replace(/ Detail$/, "") + " Color",
													children: (0, o.createComponentVNode)(2, c, {
														color: m,
														onChange: function (e) {
															return n("editappearance", { color1: e });
														},
														fix: V,
													}),
												}),
											!!v[1] &&
												(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											!!v[1] &&
												!!b &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[1],
													children: (0, o.createComponentVNode)(2, a.Dropdown, {
														width: 20,
														selected: C,
														onSelected: function (e) {
															return n("editappearance", { style2: e });
														},
														options: l,
													}),
												}),
											!!v[1] &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[1].replace(/ Detail$/, "") + " Color",
													children: (0, o.createComponentVNode)(2, c, {
														color: s,
														onChange: function (e) {
															return n("editappearance", { color2: e });
														},
														fix: V,
													}),
												}),
											!!v[2] &&
												(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											!!v[2] &&
												!!b &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[2],
													children: (0, o.createComponentVNode)(2, a.Dropdown, {
														width: 20,
														selected: N,
														onSelected: function (e) {
															return n("editappearance", { style3: e });
														},
														options: l,
													}),
												}),
											!!v[2] &&
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: v[2].replace(/ Detail$/, "") + " Color",
													children: (0, o.createComponentVNode)(2, c, {
														color: p,
														onChange: function (e) {
															return n("editappearance", { color3: e });
														},
														fix: V,
													}),
												}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									basis: "80px",
									shrink: "0",
									children: (0, o.createComponentVNode)(2, a.ByondUi, {
										params: { id: i, type: "map" },
										style: { width: "80px", height: "160px" },
									}),
								}),
							],
						}),
					});
				};
				var c = function (e, t) {
					var n = e.color,
						r = e.onChange,
						c = e.fix,
						i = parseInt(n.substr(1, 2), 16),
						l = parseInt(n.substr(3, 2), 16),
						d = parseInt(n.substr(5, 2), 16),
						u = function (e, t, n) {
							r &&
								r(
									"#" +
										e.toString(16).padStart(2, "0") +
										t.toString(16).padStart(2, "0") +
										n.toString(16).padStart(2, "0")
								);
						};
					return (0, o.createComponentVNode)(2, a.Box, {
						children: [
							(0, o.createComponentVNode)(2, a.ColorBox, { color: n }),
							(0, o.createComponentVNode)(2, a.Knob, {
								inline: !0,
								ml: 1,
								minValue: c ? 50 : 0,
								maxValue: c ? 190 : 255,
								value: i,
								color: "red",
								onChange: function (e, t) {
									return u(t, l, d);
								},
							}),
							(0, o.createComponentVNode)(2, a.Knob, {
								inline: !0,
								ml: 1,
								minValue: c ? 50 : 0,
								maxValue: c ? 190 : 255,
								value: l,
								color: "green",
								onChange: function (e, t) {
									return u(i, t, d);
								},
							}),
							(0, o.createComponentVNode)(2, a.Knob, {
								inline: !0,
								ml: 1,
								minValue: c ? 50 : 0,
								maxValue: c ? 190 : 255,
								value: d,
								color: "blue",
								onChange: function (e, t) {
									return u(i, l, t);
								},
							}),
						],
					});
				};
			},
			66673: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.GeneList =
						t.Description =
						t.BioEffect =
						t.onCooldown =
						t.haveDevice =
						t.ResearchLevel =
							void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(4285),
					i = n(41941),
					l = n(24451);
				function d(e, t) {
					var n =
						("undefined" != typeof Symbol && e[Symbol.iterator]) ||
						e["@@iterator"];
					if (n) return (n = n.call(e)).next.bind(n);
					if (
						Array.isArray(e) ||
						(n = (function (e, t) {
							if (!e) return;
							if ("string" == typeof e) return u(e, t);
							var n = Object.prototype.toString.call(e).slice(8, -1);
							"Object" === n && e.constructor && (n = e.constructor.name);
							if ("Map" === n || "Set" === n) return Array.from(e);
							if (
								"Arguments" === n ||
								/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							)
								return u(e, t);
						})(e)) ||
						(t && e && "number" == typeof e.length)
					) {
						n && (e = n);
						var o = 0;
						return function () {
							return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				function u(e, t) {
					(null == t || t > e.length) && (t = e.length);
					for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
					return o;
				}
				var m = { None: 0, InProgress: 1, Done: 2, Activated: 3 };
				t.ResearchLevel = m;
				var s = function (e, t) {
					for (var n, o = d(e); !(n = o()).done; ) {
						var r = n.value,
							a = r.label;
						r.cooldown;
						if (a === t) return !0;
					}
					return !1;
				};
				t.haveDevice = s;
				var p = function (e, t) {
					for (var n, o = d(e); !(n = o()).done; ) {
						var r = n.value,
							a = r.label,
							c = r.cooldown;
						if (a === t) return c > 0;
					}
					return !0;
				};
				t.onCooldown = p;
				var h = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.data,
						u = n.act,
						m = (0, r.useSharedState)(t, "booth", null),
						h = m[0],
						N = m[1],
						V = d.materialCur,
						f = d.researchCost,
						g = d.equipmentCooldown,
						b = d.saveSlots,
						v = d.savedMutations,
						k = d.subject,
						x = d.boothCost,
						w = d.injectorCost,
						S = d.precisionEmitter,
						y = d.toSplice,
						B = e.gene,
						I = e.showSequence,
						T = e.isSample,
						L = e.isPotential,
						_ = e.isActive,
						P = e.isStorage,
						A = B.ref,
						M = B.name,
						R = B.desc,
						D = B.icon,
						F = B.research,
						O = B.canResearch,
						E = B.canInject,
						j = B.canScramble,
						W = B.canReclaim,
						G = B.spliceError,
						z = B.dna,
						H = z.every(function (e) {
							return !e.style;
						}),
						U = z.every(function (e) {
							return !e.style || "locked" === e.marker;
						}),
						K = _ || P;
					return (0, o.createComponentVNode)(2, a.Section, {
						title: M,
						buttons: (0, o.createComponentVNode)(2, l.GeneIcon, {
							name: D,
							size: 1.5,
						}),
						children: [
							h &&
								h.ref === A &&
								(0, o.createComponentVNode)(2, a.Modal, {
									full: !0,
									children: (0, o.createComponentVNode)(2, a.Section, {
										width: 35,
										title: M,
										style: { margin: "-10px", "margin-right": "2px" },
										buttons: (0, o.createComponentVNode)(2, l.GeneIcon, {
											name: D,
											size: 4,
											style: { "margin-top": "-2px", "margin-right": "-4px" },
										}),
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList, {
												children: [
													(0, o.createComponentVNode)(2, a.LabeledList.Item, {
														label: "Price",
														children: (0, o.createComponentVNode)(
															2,
															a.NumberInput,
															{
																minValue: 0,
																maxValue: 999999,
																width: 5,
																value: h.price,
																onChange: function (e, t) {
																	return N({
																		ref: h.ref,
																		price: t,
																		desc: h.desc,
																	});
																},
															}
														),
													}),
													(0, o.createComponentVNode)(2, a.LabeledList.Item, {
														label: "Description",
														children: (0, o.createComponentVNode)(2, a.Input, {
															width: 25,
															value: h.desc,
															onChange: function (e, t) {
																return N({
																	ref: h.ref,
																	price: h.price,
																	desc: t,
																});
															},
														}),
													}),
												],
											}),
											(0, o.createComponentVNode)(2, a.Box, {
												inline: !0,
												width: "50%",
												textAlign: "center",
												mt: 2,
												children: (0, o.createComponentVNode)(2, a.Button, {
													icon: "person-booth",
													color: "good",
													disabled: x > V,
													onClick: function () {
														return u("booth", h);
													},
													children: "Send to Booth",
												}),
											}),
											(0, o.createComponentVNode)(2, a.Box, {
												inline: !0,
												width: "50%",
												textAlign: "center",
												children: (0, o.createComponentVNode)(2, a.Button, {
													icon: "times",
													color: "bad",
													onClick: function () {
														return N(null);
													},
													children: "Cancel",
												}),
											}),
										],
									}),
								}),
							(0, o.createComponentVNode)(2, c.UnlockModal),
							(0, o.createComponentVNode)(2, a.Box, {
								textAlign: "right",
								children: [
									(0, o.createComponentVNode)(2, a.Box, {
										mr: 1,
										style: { float: "left" },
										children: [
											(0, o.createComponentVNode)(2, a.Icon, {
												color:
													F >= 3
														? "good"
														: F >= 2
														? "teal"
														: F >= 1
														? "average"
														: "bad",
												name: F >= 2 ? "flask" : F >= 1 ? "hourglass" : "times",
											}),
											F >= 2
												? " Researched"
												: F >= 1
												? " In Progress"
												: " Not Researched",
										],
									}),
									!_ &&
										!!O &&
										0 === F &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "flask",
											disabled: f > V,
											onClick: function () {
												return u("researchmut", { ref: A, sample: !!T });
											},
											color: "teal",
											children: "Research",
										}),
									L &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "check",
											disabled: !H,
											onClick: function () {
												return u("activate", { ref: A });
											},
											color: "blue",
											children: "Activate",
										}),
									F >= 3 &&
										!H &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "magic",
											disabled: U,
											onClick: function () {
												return u("autocomplete", { ref: A });
											},
											children: "Autocomplete DNA",
										}),
									s(g, "Analyzer") &&
										!H &&
										L &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: p(g, "Analyzer"),
											icon: "microscope",
											color: "average",
											onClick: function () {
												return u("analyze", { ref: A });
											},
											children: "Check Stability",
										}),
									s(g, "Reclaimer") &&
										K &&
										!!W &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: p(g, "Reclaimer"),
											icon: "times",
											color: "bad",
											onClick: function () {
												return u("reclaim", { ref: A });
											},
											children: "Reclaim",
										}),
									x >= 0 &&
										F >= 2 &&
										K &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: V < x,
											icon: "person-booth",
											color: "good",
											onClick: function () {
												return N({ ref: A, price: 200, desc: "" });
											},
											children: "Sell at Booth",
										}),
									!!S &&
										F >= 2 &&
										L &&
										!!j &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "radiation",
											disabled: p(g, "Emitter") || k.stat > 0,
											color: "bad",
											onClick: function () {
												return u("precisionemitter", { ref: A });
											},
											children: "Scramble Gene",
										}),
									b > 0 &&
										F >= 2 &&
										_ &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: b <= v.length,
											icon: "save",
											color: "average",
											onClick: function () {
												return u("save", { ref: A });
											},
											children: "Store",
										}),
									F >= 2 &&
										!!E &&
										s(g, "Injectors") &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: p(g, "Injectors"),
											icon: "syringe",
											onClick: function () {
												return u("activator", { ref: A });
											},
											children: "Activator",
										}),
									F >= 2 &&
										!!E &&
										w >= 0 &&
										K &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: p(g, "Injectors") || V < w,
											icon: "syringe",
											onClick: function () {
												return u("injector", { ref: A });
											},
											color: "bad",
											children: "Injector",
										}),
									K &&
										!!y &&
										(0, o.createComponentVNode)(2, a.Button, {
											disabled: !!G,
											icon: "map-marker-alt",
											onClick: function () {
												return u("splicegene", { ref: A });
											},
											tooltip: G,
											tooltipPosition: "left",
											children: "Splice",
										}),
									P &&
										k &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "check",
											onClick: function () {
												return u("addstored", { ref: A });
											},
											color: "blue",
											children: "Add to Occupant",
										}),
									P &&
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "trash",
											onClick: function () {
												return u("deletegene", { ref: A });
											},
											color: "bad",
										}),
									(0, o.createComponentVNode)(2, a.Box, { inline: !0 }),
								],
							}),
							(0, o.createComponentVNode)(2, C, { text: R }),
							I &&
								(0, o.normalizeProps)(
									(0, o.createComponentVNode)(
										2,
										i.DNASequence,
										Object.assign({}, e)
									)
								),
						],
					});
				};
				t.BioEffect = h;
				var C = function (e, t) {
					return e.text.split(/<br ?\/?>/g).map(function (e, t) {
						return (0, o.createVNode)(1, "p", null, e, 0, null, t);
					});
				};
				t.Description = C;
				t.GeneList = function (e, t) {
					var n,
						c = (0, r.useBackend)(t),
						i = c.data,
						l = c.act,
						d = i.activeGene,
						u = e.genes,
						s = e.noSelection,
						p = e.noGenes,
						C = (function (e, t) {
							if (null == e) return {};
							var n,
								o,
								r = {},
								a = Object.keys(e);
							for (o = 0; o < a.length; o++)
								(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
							return r;
						})(e, ["genes", "noSelection", "noGenes"]),
						N = u.find(function (e) {
							return e.ref === d;
						}),
						V =
							(((n = {})[m.None] = { icon: "question", color: "grey" }),
							(n[m.InProgress] = { icon: "hourglass", color: "average" }),
							(n[m.Done] = { icon: "flask", color: "teal" }),
							(n[m.Activated] = { icon: "flask", color: "good" }),
							n);
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, a.Flex, {
								wrap: !0,
								mb: 1,
								children: u.map(function (e) {
									return (0, o.createComponentVNode)(
										2,
										a.Flex.Item,
										{
											grow: 1,
											textAlign: "center",
											children: (0, o.createComponentVNode)(2, a.Button, {
												icon: V[e.research].icon,
												color: e.ref === d ? "black" : V[e.research].color,
												onClick: function () {
													return l("setgene", { ref: e.ref });
												},
												tooltip:
													e.research === m.InProgress
														? "Researching..."
														: e.name,
												tooltipPosition: "left",
												width: "80%",
											}),
										},
										e.ref
									);
								}),
							}),
							!u.length && (p || "No genes found."),
							!!u.length && !N && (s || "Select a gene to view it."),
							N &&
								(0, o.normalizeProps)(
									(0, o.createComponentVNode)(
										2,
										h,
										Object.assign({ gene: N, showSequence: !0 }, C),
										N.ref
									)
								),
						],
						0
					);
				};
			},
			41941: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Nucleotide = t.DNASequence = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				var c = { "?": "grey", A: "red", T: "blue", C: "yellow", G: "green" },
					i = {
						"": "good",
						X: "grey",
						1: "good",
						2: "olive",
						3: "average",
						4: "orange",
						5: "bad",
					};
				t.DNASequence = function (e, t) {
					for (
						var n = (0, r.useBackend)(t).act,
							c = e.gene,
							d = e.isPotential,
							u = c.dna,
							m = !0,
							s = [],
							p = 0;
						p < u.length;
						p++
					)
						p % 4 == 0 && s.push([]),
							s[s.length - 1].push(u[p]),
							u[p].style && (m = !1);
					var h = function (e) {
						d && n("advancepair", { ref: c.ref, pair: e });
					};
					return s.map(function (e, t) {
						return (0, o.createVNode)(
							1,
							"table",
							null,
							[
								(0, o.createVNode)(
									1,
									"tr",
									null,
									e.map(function (e, n) {
										return (0, o.createVNode)(
											1,
											"td",
											null,
											(0, o.createComponentVNode)(2, l, {
												letter: e.pair.charAt(0),
												type: e.style,
												mark: e.marker,
												useLetterColor: m,
												onClick: function () {
													return h(4 * t + n + 1);
												},
											}),
											2,
											null,
											n
										);
									}),
									0
								),
								(0, o.createVNode)(
									1,
									"tr",
									null,
									e.map(function (e, n) {
										return (0, o.createVNode)(
											1,
											"td",
											null,
											m
												? "|"
												: "locked" === e.marker
												? (0, o.createComponentVNode)(2, a.Icon, {
														name: "lock",
														color: "average",
														onClick: function () {
															return h(4 * t + n + 1);
														},
												  })
												: (0, o.createComponentVNode)(2, a.Icon, {
														name:
															"" === e.style
																? "check"
																: "5" === e.style
																? "times"
																: "question",
														color: i[e.style],
												  }),
											0,
											{ style: { "text-align": "center" } },
											n
										);
									}),
									0
								),
								(0, o.createVNode)(
									1,
									"tr",
									null,
									e.map(function (e, n) {
										return (0, o.createVNode)(
											1,
											"td",
											null,
											(0, o.createComponentVNode)(2, l, {
												letter: e.pair.charAt(1),
												type: e.style,
												mark: e.marker,
												useLetterColor: m,
												onClick: function () {
													return h(4 * t + n + 1);
												},
											}),
											2,
											null,
											n
										);
									}),
									0
								),
							],
							4,
							{
								style: {
									display: "inline-table",
									"margin-top": "1em",
									"margin-left": t % 4 == 0 ? "0" : "0.25em",
									"margin-right": t % 4 == 3 ? "0" : "0.25em",
								},
							},
							t
						);
					});
				};
				var l = function (e) {
					var t = e.letter,
						n = e.type,
						r = (e.mark, e.useLetterColor),
						l = (function (e, t) {
							if (null == e) return {};
							var n,
								o,
								r = {},
								a = Object.keys(e);
							for (o = 0; o < a.length; o++)
								(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
							return r;
						})(e, ["letter", "type", "mark", "useLetterColor"]),
						d = r ? c[t] : i[n];
					return (0, o.normalizeProps)(
						(0, o.createComponentVNode)(
							2,
							a.Button,
							Object.assign(
								{ width: "1.75em", textAlign: "center", color: d },
								l,
								{ children: t }
							)
						)
					);
				};
				t.Nucleotide = l;
			},
			24451: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GeneIcon = void 0);
				var o = n(39812),
					r = n(34380),
					a = n(91031);
				var c = function (e) {
					var t = e.name,
						n = e.size,
						c = e.style,
						i = void 0 === c ? {} : c,
						l = (function (e, t) {
							if (null == e) return {};
							var n,
								o,
								r = {},
								a = Object.keys(e);
							for (o = 0; o < a.length; o++)
								(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
							return r;
						})(e, ["name", "size", "style"]);
					return (
						n && (i["font-size"] = 100 * n + "%"),
						(0, o.normalizeProps)(
							(0, o.createComponentVNode)(
								2,
								a.Box,
								Object.assign(
									{
										as: "i",
										className: (0, r.classes)(["GeneIcon", "GeneIcon--" + t]),
										style: i,
									},
									l
								)
							)
						)
					);
				};
				(t.GeneIcon = c), (c.defaultHooks = r.pureComponentHooks);
			},
			10307: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.StorageTab =
						t.RecordTab =
						t.ScannerTab =
						t.ResearchTab =
						t.MutationsTab =
						t.UnlockModal =
						t.CombineGenesModal =
						t.BuyMaterialsModal =
							void 0);
				var o = n(71891);
				t.BuyMaterialsModal = o.BuyMaterialsModal;
				var r = n(14424);
				t.CombineGenesModal = r.CombineGenesModal;
				var a = n(4285);
				t.UnlockModal = a.UnlockModal;
				var c = n(50993);
				t.MutationsTab = c.MutationsTab;
				var i = n(79185);
				t.ResearchTab = i.ResearchTab;
				var l = n(52880);
				t.ScannerTab = l.ScannerTab;
				var d = n(13329);
				(t.RecordTab = d.RecordTab), (t.StorageTab = d.StorageTab);
			},
			71891: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.BuyMaterialsModal = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.BuyMaterialsModal = function (e, t) {
					var n = (0, r.useBackend)(t),
						c = n.data,
						i = n.act,
						l = (0, r.useSharedState)(t, "buymats", null),
						d = l[0],
						u = l[1],
						m = e.maxAmount,
						s = c.budget,
						p = c.costPerMaterial,
						h = Math.min(d, m);
					return (0, o.createComponentVNode)(2, a.Modal, {
						full: !0,
						children: (0, o.createComponentVNode)(2, a.Box, {
							position: "relative",
							width: 18,
							children: [
								(0, o.createComponentVNode)(2, a.Box, {
									position: "absolute",
									right: 1,
									top: 0,
									children: (0, o.createComponentVNode)(2, a.Knob, {
										inline: !0,
										value: h,
										onChange: function (e, t) {
											return u(t);
										},
										minValue: 1,
										maxValue: m,
									}),
								}),
								(0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Purchase",
											children: [h, 1 === h ? " Material" : " Materials"],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Budget",
											children: s + " Credits",
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Cost",
											children: h * p + " Credits",
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Remainder",
											children: [
												(0, o.createComponentVNode)(2, a.Box, {
													inline: !0,
													color: s - h * p < 0 && "bad",
													children: s - h * p,
												}),
												" Credits",
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Divider, { hidden: !0 }),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									width: "50%",
									textAlign: "center",
									children: (0, o.createComponentVNode)(2, a.Button, {
										color: "good",
										icon: "dollar-sign",
										disabled: h <= 0,
										onClick: function () {
											i("purchasematerial", { amount: h }), u(null);
										},
										children: "Submit",
									}),
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									width: "50%",
									textAlign: "center",
									children: (0, o.createComponentVNode)(2, a.Button, {
										color: "bad",
										icon: "times",
										onClick: function () {
											return u(null);
										},
										children: "Cancel",
									}),
								}),
							],
						}),
					});
				};
			},
			14424: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.CombineGenesModal = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.CombineGenesModal = function (e, t) {
					var n = (0, r.useBackend)(t),
						c = n.data,
						i = n.act,
						l = (0, r.useSharedState)(t, "iscombining", !1),
						d = (l[0], l[1]),
						u = c.savedMutations,
						m = c.combining,
						s = void 0 === m ? [] : m;
					return (0, o.createComponentVNode)(2, a.Modal, {
						full: !0,
						children: (0, o.createComponentVNode)(2, a.Box, {
							width: 16,
							mr: 2,
							children: [
								(0, o.createComponentVNode)(2, a.Box, {
									bold: !0,
									mb: 2,
									children: "Select genes to combine",
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									mb: 2,
									children: u.map(function (e) {
										return (0, o.createComponentVNode)(
											2,
											a.Box,
											{
												children: [
													s.indexOf(e.ref) >= 0
														? (0, o.createComponentVNode)(2, a.Button, {
																icon: "check",
																color: "blue",
																onClick: function () {
																	return i("togglecombine", { ref: e.ref });
																},
														  })
														: (0, o.createComponentVNode)(2, a.Button, {
																icon: "blank",
																color: "grey",
																onClick: function () {
																	return i("togglecombine", { ref: e.ref });
																},
														  }),
													" " + e.name,
												],
											},
											e.ref
										);
									}),
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									width: "50%",
									textAlign: "center",
									children: (0, o.createComponentVNode)(2, a.Button, {
										icon: "sitemap",
										disabled: !s.length,
										onClick: function () {
											i("combinegenes"), d(!1);
										},
										children: "Combine",
									}),
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									width: "50%",
									textAlign: "center",
									children: (0, o.createComponentVNode)(2, a.Button, {
										color: "bad",
										icon: "times",
										onClick: function () {
											return d(!1);
										},
										children: "Cancel",
									}),
								}),
							],
						}),
					});
				};
			},
			4285: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.UnlockModal = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.UnlockModal = function (e, t) {
					var n = (0, r.useBackend)(t),
						c = n.data,
						i = n.act,
						l = (0, r.useSharedState)(t, "unlockcode", ""),
						d = l[0],
						u = l[1],
						m = c.autoDecryptors,
						s = c.unlock;
					if (s)
						return (0, o.createComponentVNode)(2, a.Modal, {
							full: !0,
							children: (0, o.createComponentVNode)(2, a.Box, {
								width: 22,
								mr: 2,
								children: [
									(0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Detected Length",
												children: [s.length, " characters"],
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Possible Characters",
												children: s.chars.join(" "),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Enter Unlock Code",
												children: (0, o.createComponentVNode)(2, a.Input, {
													value: d,
													onChange: function (e, t) {
														return u(t.toUpperCase());
													},
												}),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Correct Characters",
												children: [s.correctChar, " of ", s.length],
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Correct Positions",
												children: [s.correctPos, " of ", s.length],
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Attempts Remaining",
												children: [s.tries, " before mutation"],
											}),
										],
									}),
									(0, o.createComponentVNode)(2, a.Box, {
										textAlign: "right",
										mt: 2,
										children: (0, o.createComponentVNode)(2, a.Button, {
											icon: "magic",
											color: "average",
											tooltip: "Auto-Decryptors Available: " + m,
											disabled: m < 1,
											onClick: function () {
												u(""), i("unlock", { code: "UNLOCK" });
											},
											children: "Use Auto-Decryptor",
										}),
									}),
									(0, o.createComponentVNode)(2, a.Box, {
										textAlign: "right",
										mt: 1,
										children: [
											(0, o.createComponentVNode)(2, a.Button, {
												mr: 1,
												icon: "check",
												color: "good",
												tooltip:
													d.length !== s.length
														? "Code is the wrong length."
														: d.split("").some(function (e) {
																return -1 === s.chars.indexOf(e);
														  })
														? "Invalid character in code."
														: "",
												disabled:
													d.length !== s.length ||
													d.split("").some(function (e) {
														return -1 === s.chars.indexOf(e);
													}),
												onClick: function () {
													u(""), i("unlock", { code: d });
												},
												children: "Attempt Decryption",
											}),
											(0, o.createComponentVNode)(2, a.Button, {
												icon: "times",
												color: "bad",
												onClick: function () {
													u(""), i("unlock", { code: null });
												},
												children: "Cancel",
											}),
										],
									}),
								],
							}),
						});
				};
			},
			50993: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.MutationsTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(66673);
				t.MutationsTab = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						i = (0, r.useSharedState)(t, "mutsortmode", "time"),
						l = i[0],
						d = i[1],
						u = (0, r.useSharedState)(t, "showSequence", !1),
						m = u[0],
						s = u[1],
						p = (n.bioEffects || []).slice(0);
					return (
						"time" === l
							? p.sort(function (e, t) {
									return e.time - t.time;
							  })
							: "alpha" === l &&
							  p.sort(function (e, t) {
									return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
							  }),
						(0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Section, {
									children: [
										(0, o.createComponentVNode)(2, a.Button, {
											icon: "time" === l ? "clock" : "sort-alpha-down",
											onClick: function () {
												return d("time" === l ? "alpha" : "time");
											},
											children: "Sort Mode",
										}),
										(0, o.createComponentVNode)(2, a.Button.Checkbox, {
											inline: !0,
											content: "Show Sequence",
											checked: m,
											onClick: function () {
												return s(!m);
											},
										}),
									],
								}),
								p.map(function (e) {
									return (0,
									o.createComponentVNode)(2, c.BioEffect, { gene: e, showSequence: m }, e.ref);
								}),
							],
							0
						)
					);
				};
			},
			79185: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ResearchTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(66673);
				t.ResearchTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.data,
						l = n.act,
						d = i.materialCur,
						u = i.materialMax,
						m = i.budget,
						s = i.mutationsResearched,
						p = i.autoDecryptors,
						h = i.saveSlots,
						C = i.availableResearch,
						N = i.finishedResearch,
						V = i.savedMutations,
						f = i.research,
						g = e.maxBuyMats,
						b = e.setBuyMats;
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, a.Section, {
								title: "Statistics",
								buttons: (0, o.createComponentVNode)(2, a.Button, {
									icon: "dollar-sign",
									disabled: g <= 0,
									onClick: function () {
										return b(1);
									},
									children: "Purchase Additional Materials",
								}),
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Research Materials",
											children: [d, " / ", u],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Research Budget",
											children: [
												(0, o.createComponentVNode)(2, a.AnimatedNumber, {
													value: m,
												}),
												" Credits",
											],
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Mutations Researched",
											children: s,
										}),
										h > 0 &&
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Mutations Stored",
												children: [V.length, " / ", h],
											}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Auto-Decryptors",
											children: p,
										}),
									],
								}),
							}),
							(0, o.createComponentVNode)(2, a.Section, {
								title: "Available Research",
								children: C.map(function (e, t) {
									return (0, o.createComponentVNode)(
										2,
										a.Section,
										{
											title: "Tier " + (t + 1),
											children: e.length
												? e.map(function (e) {
														return (0, o.createComponentVNode)(
															2,
															a.Section,
															{
																title: f[e.ref].name,
																buttons: (0, o.createComponentVNode)(
																	2,
																	a.Button,
																	{
																		icon: "flask",
																		disabled: d < e.cost,
																		onClick: function () {
																			return l("research", { ref: e.ref });
																		},
																		color: "teal",
																		children:
																			"Research (" +
																			e.cost +
																			" mat, " +
																			e.time +
																			"s)",
																	}
																),
																children: (0, o.createComponentVNode)(
																	2,
																	c.Description,
																	{ text: f[e.ref].desc }
																),
															},
															e.ref
														);
												  })
												: "No research is currently available at this tier.",
										},
										t
									);
								}),
							}),
							(0, o.createComponentVNode)(2, a.Section, {
								title: "Finished Research",
								children: N.map(function (e, t) {
									return (0, o.createComponentVNode)(
										2,
										a.Section,
										{
											title: "Tier " + (t + 1),
											children: e.length
												? e.map(function (e) {
														return (0,
														o.createComponentVNode)(2, a.Section, { title: f[e.ref].name, children: (0, o.createComponentVNode)(2, c.Description, { text: f[e.ref].desc }) }, f[e.ref].name);
												  })
												: "No research has been completed at this tier.",
										},
										t
									);
								}),
							}),
						],
						4
					);
				};
			},
			52880: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ScannerTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(40909),
					i = n(66673),
					l = n(24451);
				t.ScannerTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.data,
						u = n.act,
						m = (0, r.useSharedState)(t, "changingmutantrace", !1),
						s = m[0],
						p = m[1],
						h = (0, r.useSharedState)(t, "togglePreview", !1),
						C = h[0],
						N = h[1],
						V = d.haveScanner,
						f = d.subject,
						g = d.modifyAppearance,
						b = d.equipmentCooldown,
						v = d.mutantRaces,
						k = f || {},
						x = k.preview,
						w = k.name,
						S = k.health,
						y = k.human,
						B = k.age,
						I = k.bloodType,
						T = k.mutantRace,
						L = k.canAppearance,
						_ = k.premature,
						P = k.potential,
						A = k.active;
					return (
						!s || (f && y && !_) || ((s = !1), p(!1)),
						f
							? (0, o.createFragment)(
									[
										!!s &&
											(0, o.createComponentVNode)(2, a.Modal, {
												full: !0,
												children: [
													(0, o.createComponentVNode)(2, a.Box, {
														bold: !0,
														width: 20,
														mb: 0.5,
														children: "Change to which body type?",
													}),
													v.map(function (e) {
														return (0, o.createComponentVNode)(
															2,
															a.Box,
															{
																children: (0, o.createComponentVNode)(
																	2,
																	a.Button,
																	{
																		color: "blue",
																		disabled: T === e.name,
																		mt: 0.5,
																		onClick: function () {
																			p(!1), u("mutantrace", { ref: e.ref });
																		},
																		children: [
																			(0, o.createComponentVNode)(
																				2,
																				l.GeneIcon,
																				{
																					name: e.icon,
																					size: 1.5,
																					style: {
																						margin: "-4px",
																						"margin-right": "4px",
																					},
																				}
																			),
																			e.name,
																		],
																	}
																),
															},
															e.ref
														);
													}),
													(0, o.createComponentVNode)(2, a.Box, {
														mt: 1,
														textAlign: "right",
														children: (0, o.createComponentVNode)(2, a.Button, {
															color: "bad",
															icon: "times",
															onClick: function () {
																return p(!1);
															},
															children: "Cancel",
														}),
													}),
												],
											}),
										g
											? (0, o.normalizeProps)(
													(0, o.createComponentVNode)(
														2,
														c.AppearanceEditor,
														Object.assign({}, g)
													)
											  )
											: (0, o.createFragment)(
													[
														(0, o.createComponentVNode)(2, a.Section, {
															title: "Occupant",
															children: (0, o.createComponentVNode)(2, a.Flex, {
																children: [
																	(0, o.createComponentVNode)(2, a.Flex.Item, {
																		mr: 1,
																		children: (0, o.createComponentVNode)(
																			2,
																			a.LabeledList,
																			{
																				children: [
																					(0, o.createComponentVNode)(
																						2,
																						a.LabeledList.Item,
																						{
																							label: "Name",
																							buttons:
																								(0, i.haveDevice)(
																									b,
																									"Emitter"
																								) &&
																								(0, o.createComponentVNode)(
																									2,
																									a.Button,
																									{
																										icon: "radiation",
																										disabled:
																											(0, i.onCooldown)(
																												b,
																												"Emitter"
																											) || S <= 0,
																										color: "bad",
																										onClick: function () {
																											return u("emitter");
																										},
																										children: "Scramble DNA",
																									}
																								),
																							children: w,
																						}
																					),
																					(0, o.createComponentVNode)(
																						2,
																						a.LabeledList.Item,
																						{
																							label: "Body Type",
																							buttons:
																								!!y &&
																								(0, o.createFragment)(
																									[
																										(0, o.createComponentVNode)(
																											2,
																											a.Button,
																											{
																												icon: "user",
																												color: "blue",
																												disabled: !!_,
																												onClick: function () {
																													return p(!0);
																												},
																												children: "Change",
																											}
																										),
																										(0, o.createComponentVNode)(
																											2,
																											a.Button,
																											{
																												icon: "wrench",
																												color: "average",
																												disabled: !L,
																												onClick: function () {
																													return u(
																														"editappearance"
																													);
																												},
																											}
																										),
																									],
																									4
																								),
																							children: T,
																						}
																					),
																					(0, o.createComponentVNode)(
																						2,
																						a.LabeledList.Item,
																						{
																							label: "Physical Age",
																							buttons:
																								!!y &&
																								(0, o.createComponentVNode)(
																									2,
																									a.Button.Checkbox,
																									{
																										inline: !0,
																										color: "good",
																										content: "DNA Render",
																										checked: C,
																										onClick: function () {
																											return N(!C);
																										},
																									}
																								),
																							children: [B, " years"],
																						}
																					),
																					(0, o.createComponentVNode)(
																						2,
																						a.LabeledList.Item,
																						{ label: "Blood Type", children: I }
																					),
																				],
																			}
																		),
																	}),
																	y &&
																		C &&
																		(0, o.createComponentVNode)(
																			2,
																			a.Flex.Item,
																			{
																				grow: 0,
																				shrink: 0,
																				children: (0, o.createComponentVNode)(
																					2,
																					a.ByondUi,
																					{
																						params: { id: x, type: "map" },
																						style: {
																							width: "64px",
																							height: "128px",
																						},
																						hideOnScroll: !0,
																					}
																				),
																			}
																		),
																],
															}),
														}),
														(0, o.createComponentVNode)(2, a.Section, {
															title: "Potential Genes",
															children: (0, o.createComponentVNode)(
																2,
																i.GeneList,
																{
																	genes: P,
																	noGenes:
																		"All detected potential mutations are active.",
																	isPotential: !0,
																}
															),
														}),
														(0, o.createComponentVNode)(2, a.Section, {
															title: "Active Mutations",
															children: (0, o.createComponentVNode)(
																2,
																i.GeneList,
																{
																	genes: A,
																	noGenes: "Subject has no detected mutations.",
																	isActive: !0,
																}
															),
														}),
													],
													4
											  ),
									],
									0
							  )
							: (0, o.createComponentVNode)(2, a.Section, {
									title: "Scanner Error",
									children: V
										? "Subject has absconded."
										: "Check connection to scanner.",
							  })
					);
				};
			},
			13329: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.RecordTab = t.StorageTab = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(66673),
					c = n(74814);
				t.StorageTab = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.data,
						l = n.act,
						d = (0, r.useSharedState)(t, "menu", "research"),
						u = (d[0], d[1]),
						m = (0, r.useSharedState)(t, "iscombining", !1),
						s = (m[0], m[1]),
						p = i.saveSlots,
						h = i.samples,
						C = i.savedMutations,
						N = i.savedChromosomes,
						V = i.toSplice,
						f = Object.values(
							N.reduce(function (e, t) {
								return (
									e[t.name] ||
										(e[t.name] = { name: t.name, desc: t.desc, count: 0 }),
									e[t.name].count++,
									(e[t.name].ref = t.ref),
									e
								);
							}, {})
						);
					return (
						f.sort(function (e, t) {
							return e.name > t.name ? 1 : -1;
						}),
						(0, o.createFragment)(
							[
								p > 0 &&
									(0, o.createComponentVNode)(2, c.Section, {
										title: "Stored Mutations",
										buttons: (0, o.createComponentVNode)(2, c.Button, {
											icon: "sitemap",
											onClick: function () {
												return s(!0);
											},
											children: "Combine",
										}),
										children: C.length
											? C.map(function (e) {
													return (0,
													o.createComponentVNode)(2, a.BioEffect, { gene: e, showSequence: !0, isStorage: !0 }, e.ref);
											  })
											: "There are no mutations in storage.",
									}),
								(0, o.createComponentVNode)(2, c.Section, {
									title: "Stored Chromosomes",
									children: f.length
										? (0, o.createComponentVNode)(2, c.LabeledList, {
												children: f.map(function (e) {
													return (0, o.createComponentVNode)(
														2,
														c.LabeledList.Item,
														{
															label: e.name,
															buttons: (0, o.createFragment)(
																[
																	(0, o.createComponentVNode)(2, c.Button, {
																		disabled: e.name === V,
																		icon: "map-marker-alt",
																		onClick: function () {
																			return l("splicechromosome", {
																				ref: e.ref,
																			});
																		},
																		children: "Splice",
																	}),
																	(0, o.createComponentVNode)(2, c.Button, {
																		color: "bad",
																		icon: "trash",
																		onClick: function () {
																			return l("deletechromosome", {
																				ref: e.ref,
																			});
																		},
																	}),
																],
																4
															),
															children: [
																e.desc,
																(0, o.createComponentVNode)(2, c.Box, {
																	mt: 0.5,
																	children: [
																		(0, o.createComponentVNode)(2, c.Box, {
																			inline: !0,
																			color: "grey",
																			children: "Stored Copies:",
																		}),
																		" ",
																		e.count,
																	],
																}),
															],
														},
														e.ref
													);
												}),
										  })
										: "There are no chromosomes in storage.",
								}),
								(0, o.createComponentVNode)(2, c.Section, {
									title: "DNA Samples",
									children: (0, o.createComponentVNode)(2, c.LabeledList, {
										children: h.map(function (e) {
											return (0, o.createComponentVNode)(
												2,
												c.LabeledList.Item,
												{
													label: e.name,
													buttons: (0, o.createComponentVNode)(2, c.Button, {
														icon: "save",
														onClick: function () {
															l("setrecord", { ref: e.ref }), u("record");
														},
														children: "View Record",
													}),
													children: (0, o.createVNode)(1, "tt", null, e.uid, 0),
												},
												e.ref
											);
										}),
									}),
								}),
							],
							0
						)
					);
				};
				t.RecordTab = function (e, t) {
					var n = (0, r.useBackend)(t).data.record;
					if (n) {
						var i = n.name,
							l = n.uid,
							d = n.genes;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, c.Section, {
									title: i,
									children: (0, o.createComponentVNode)(2, c.LabeledList, {
										children: (0, o.createComponentVNode)(
											2,
											c.LabeledList.Item,
											{
												label: "Genetic Signature",
												children: (0, o.createVNode)(1, "tt", null, l, 0),
											}
										),
									}),
								}),
								(0, o.createComponentVNode)(2, c.Section, {
									children: (0, o.createComponentVNode)(2, a.GeneList, {
										genes: d,
										noGenes: "No genes found in sample.",
										isSample: !0,
									}),
								}),
							],
							4
						);
					}
				};
			},
			26407: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GimmickObject = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.GimmickObject = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data,
						d = l.eventList,
						u = l.interactiveTypes,
						m = l.activeStage;
					l.icon, l.iconState;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Gimmick Object Editor",
						width: 675,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, a.Section, {
								title: (0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									children: "Edit Interactive Steps",
								}),
								children: [
									(0, o.createComponentVNode)(2, a.Flex, {
										direction: "column",
										children: Object.keys(d).map(function (e, t) {
											return (0, o.createComponentVNode)(
												2,
												a.Flex.Item,
												{
													children: (0, o.createComponentVNode)(2, a.Section, {
														title: t,
														children: (0, o.createComponentVNode)(
															2,
															a.Flex.Item,
															{
																mb: 1,
																children: [
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		content: "Move Step Down",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				icon: "angle-down",
																				disabled:
																					parseInt(e, 10) >= d.length - 1,
																				onClick: function () {
																					return i("move-down", { event: t });
																				},
																			}
																		),
																	}),
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		content: "Move Step Down",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				icon: "angle-up",
																				disabled: parseInt(e, 10) <= 0,
																				onClick: function () {
																					return i("move-up", { event: t });
																				},
																			}
																		),
																	}),
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		content: "Make Active Step",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				icon: "play",
																				disabled:
																					parseInt(e, 10) ===
																					parseInt(m, 10) - 1,
																				onClick: function () {
																					return i("active_step", { event: t });
																				},
																			}
																		),
																	}),
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		content: "Remove step from Gimmick",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				icon: "trash",
																				color: "red",
																				onClick: function () {
																					return i("delete_event", {
																						event: t,
																					});
																				},
																			}
																		),
																	}),
																	(0, o.createComponentVNode)(
																		2,
																		a.LabeledList,
																		{
																			children: [
																				(0, o.createComponentVNode)(
																					2,
																					a.Tooltip,
																					{
																						content:
																							"Set Tool Interactive Flags (Blank will be AttackHand)",
																						children: (0,
																						o.createComponentVNode)(
																							2,
																							a.LabeledList.Item,
																							{
																								label: "Interactive Flags",
																								children: Object.keys(u).map(
																									function (n, r) {
																										return (0,
																										o.createComponentVNode)(
																											2,
																											a.Button,
																											{
																												selected:
																													d[e].interaction &
																													u[n],
																												onClick: function () {
																													return i(
																														"interaction",
																														{
																															event: t,
																															value: u[n],
																														}
																													);
																												},
																												children: n,
																											},
																											r
																										);
																									}
																								),
																							}
																						),
																					}
																				),
																				(0, o.createComponentVNode)(
																					2,
																					a.Tooltip,
																					{
																						content:
																							"Hint appended to examine text",
																						children: (0,
																						o.createComponentVNode)(
																							2,
																							a.LabeledList.Item,
																							{
																								label: "Description",
																								children: (0,
																								o.createComponentVNode)(
																									2,
																									a.Input,
																									{
																										fluid: !0,
																										value: d[e].description,
																										onInput: function (e, n) {
																											return i("description", {
																												event: t,
																												value: n,
																											});
																										},
																									}
																								),
																							}
																						),
																					}
																				),
																				(0, o.createComponentVNode)(
																					2,
																					a.Tooltip,
																					{
																						content: "Actionbar Duration",
																						children: (0,
																						o.createComponentVNode)(
																							2,
																							a.LabeledList.Item,
																							{
																								label: "Duration",
																								children: [
																									(0, o.createComponentVNode)(
																										2,
																										a.NumberInput,
																										{
																											animated: !0,
																											width: "7em",
																											value: d[e].duration,
																											minValue: 1,
																											maxValue: 9e4,
																											onChange: function (
																												e,
																												n
																											) {
																												return i("duration", {
																													event: t,
																													value: n,
																												});
																											},
																										}
																									),
																									"Seconds",
																								],
																							}
																						),
																					}
																				),
																				(0, o.createComponentVNode)(
																					2,
																					a.Tooltip,
																					{
																						content:
																							"Visible Text Appended after [src]",
																						children: (0,
																						o.createComponentVNode)(
																							2,
																							a.LabeledList.Item,
																							{
																								label: "Visible Message",
																								children: (0,
																								o.createComponentVNode)(
																									2,
																									a.Input,
																									{
																										fluid: !0,
																										value: d[e].message,
																										onInput: function (e, n) {
																											return i("message", {
																												event: t,
																												value: n,
																											});
																										},
																									}
																								),
																							}
																						),
																					}
																				),
																			],
																		}
																	),
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		content:
																			"Notify in-game admins that action was performed",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Button,
																			{
																				icon: "flag",
																				selected: d[e].notify,
																				onClick: function () {
																					return i("notify", {
																						event: t,
																						value: !d[e].notify,
																					});
																				},
																				children: "Notify Admins",
																			}
																		),
																	}),
																],
															}
														),
													}),
												},
												t
											);
										}),
									}),
									(0, o.createComponentVNode)(2, a.Box, {
										m: 1,
										children: (0, o.createComponentVNode)(2, a.Button, {
											onClick: function () {
												return i("add_new");
											},
											children: "Add Event",
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			64791: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.GlassRecycler = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(67113),
					l = function (e) {
						var t = e.product,
							n = t.name,
							r = t.cost,
							c = t.img,
							l = e.disabled,
							d = e.onClick;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Flex, {
									direction: "row",
									align: "center",
									children: [
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: (0, o.createVNode)(1, "img", null, null, 1, {
												src: "data:image/png;base64," + c,
												style: {
													"vertical-align": "middle",
													"horizontal-align": "middle",
												},
											}),
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											grow: 1,
											children: [
												(0, o.createComponentVNode)(2, a.Box, {
													bold: !0,
													children: (0, i.capitalize)(n),
												}),
												(0, o.createComponentVNode)(2, a.Box, {
													children:
														"Cost: " + r + " " + (0, i.pluralize)("Unit", r),
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: d,
												disabled: l,
												children: "Create",
											}),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Divider),
							],
							4
						);
					};
				t.GlassRecycler = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.glassAmt,
						s = u.products,
						p = (0, r.useLocalState)(t, "filter-available", !1),
						h = p[0],
						C = p[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Glass Recycler",
						width: 300,
						height: 400,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										children: (0, o.createComponentVNode)(2, a.Section, {
											children: (0, o.createComponentVNode)(2, a.Flex, {
												direction: "row",
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														grow: 1,
														children: (0, o.createComponentVNode)(2, a.Box, {
															children:
																"Glass: " +
																m +
																" " +
																(0, i.pluralize)("Unit", m),
														}),
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														children: (0, o.createComponentVNode)(
															2,
															a.Button.Checkbox,
															{
																checked: h,
																onClick: function () {
																	return C(!h);
																},
																children: "Filter Available",
															}
														),
													}),
												],
											}),
										}),
									}),
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, a.Section, {
											fill: !0,
											scrollable: !0,
											title: "Products",
											children: s
												.filter(function (e) {
													var t = e.cost;
													return !h || m >= t;
												})
												.map(function (e) {
													var t = e.cost,
														n = e.type;
													return (0, o.createComponentVNode)(
														2,
														l,
														{
															product: e,
															disabled: m < t,
															onClick: function () {
																return d("create", { type: n });
															},
														},
														n
													);
												}),
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			14930: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.HumanInventory = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = {
						slot_head: "Head",
						slot_wear_mask: "Mask",
						slot_glasses: "Eyes",
						slot_ears: "Ears",
						slot_l_hand: "Left Hand",
						slot_r_hand: "Right Hand",
						slot_gloves: "Gloves",
						slot_shoes: "Shoes",
						slot_belt: "Belt",
						slot_w_uniform: "Uniform",
						slot_wear_suit: "Outer Suit",
						slot_back: "Back",
						slot_wear_id: "ID",
						slot_l_store: "Left Pocket",
						slot_r_store: "Right Pocket",
					};
				t.HumanInventory = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.data,
						u = n.act;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 300,
						height: 490,
						title: d.name,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								fill: !0,
								vertical: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: !0,
										children: (0, o.createComponentVNode)(2, a.Section, {
											scrollable: !0,
											fill: !0,
											children: (0, o.createComponentVNode)(2, a.LabeledList, {
												children: Object.entries(i).map(function (e) {
													var t = e[0],
														n = e[1],
														r = d.slots.find(function (e) {
															return e.id === t;
														});
													return (0,
													o.createComponentVNode)(2, l, { name: n, slot: r }, t);
												}),
											}),
										}),
									}),
									Boolean(d.handcuffed || d.canSetInternal || d.internal) &&
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Section, {
												children: [
													Boolean(d.handcuffed) &&
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return u("remove-handcuffs");
															},
															children: "Remove handcuffs",
														}),
													Boolean(d.canSetInternal) &&
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return u("access-internals");
															},
															children: "Set internals",
														}),
													Boolean(d.internal) &&
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return u("access-internals");
															},
															children: "Remove internals",
														}),
												],
											}),
										}),
								],
							}),
						}),
					});
				};
				var l = function (e, t) {
					var n = (0, r.useBackend)(t).act,
						c = e.slot,
						i = e.name,
						l = c.id,
						d = c.item;
					return (0, o.createComponentVNode)(2, a.LabeledList.Item, {
						label: i,
						children: (0, o.createComponentVNode)(2, a.Button, {
							color: d ? "default" : "transparent",
							fluid: !0,
							onClick: function () {
								return n("access-slot", { id: l });
							},
							children: d || "Nothing",
						}),
					});
				};
			},
			71798: function () {},
			89633: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Hypospray = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(23827),
					l = n(67113);
				t.Hypospray = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.emagged,
						s = u.injectionAmount,
						p = u.reagentData;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 320,
						height: 300,
						theme: m ? "syndicate" : "nanotrasen",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: m ? (0, l.glitch)("Contents", 3) : "Contents",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										icon: "times",
										color: "red",
										disabled: !p.totalVolume,
										onClick: function () {
											return d("dump");
										},
										children: "Dump",
									}),
									children: [
										(0, o.createComponentVNode)(2, i.ReagentGraph, {
											container: p,
										}),
										(0, o.createComponentVNode)(2, i.ReagentList, {
											container: p,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Injection Amount",
									children: (0, o.createComponentVNode)(2, a.Slider, {
										value: s,
										format: function (e) {
											return e + "u";
										},
										minValue: 1,
										maxValue: p.maxVolume,
										step: 1,
										stepPixelSize: 10,
										onChange: function (e, t) {
											return d("changeAmount", { amount: t });
										},
									}),
								}),
							],
						}),
					});
				};
			},
			78298: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Laundry = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.Laundry = function (e, t) {
					var n = (0, r.useBackend)(t).data.on;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Washman 550",
						width: 400,
						height: 100,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Box, {
									textAlign: "center",
									mb: 1,
									children: n
										? (0, o.createComponentVNode)(2, i)
										: (0, o.createComponentVNode)(2, l),
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									textAlign: "center",
									children: [
										(0, o.createComponentVNode)(2, d),
										(0, o.createComponentVNode)(2, u),
									],
								}),
							],
						}),
					});
				};
				var i = function (e, t) {
						return (0, o.createComponentVNode)(2, a.NoticeBox, {
							warning: !0,
							children: "Please wait, machine is currently running.",
						});
					},
					l = function (e, t) {
						return (0, o.createComponentVNode)(2, a.NoticeBox, {
							info: !0,
							children: 'Insert items and press "Turn On" to start.',
						});
					},
					d = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data.on;
						return (0, o.createComponentVNode)(2, a.Button, {
							disabled: i,
							color: i ? "" : "good",
							icon: "fas fa-power-off",
							content: "Turn On",
							onClick: function () {
								return c("cycle");
							},
						});
					},
					u = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data,
							l = i.on,
							d = i.door;
						return (0, o.createComponentVNode)(2, a.Button, {
							disabled: l,
							color: d ? "orange" : "",
							icon: d ? "fas fa-door-open" : "fas fa-door-closed",
							content: d ? "Open" : "Closed",
							onClick: function () {
								return c("door");
							},
						});
					};
			},
			617: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ListInputModal = void 0);
				var o = n(39812),
					r = n(65923),
					a = n(56443),
					c = n(74814),
					i = n(29708),
					l = n(85952),
					d = n(71494);
				t.ListInputModal = function (e, t) {
					var n = (0, d.useBackend)(t),
						s = n.act,
						p = n.data,
						h = p.items,
						C = void 0 === h ? [] : h,
						N = p.message,
						V = p.init_value,
						f = p.timeout,
						g = p.title,
						b = (0, d.useLocalState)(t, "selected", C.indexOf(V)),
						v = b[0],
						k = b[1],
						x = (0, d.useLocalState)(t, "searchBarVisible", C.length > 9),
						w = x[0],
						S = x[1],
						y = (0, d.useLocalState)(t, "searchQuery", ""),
						B = y[0],
						I = y[1],
						T = C.filter(function (e) {
							return null == e
								? void 0
								: e.toLowerCase().includes(B.toLowerCase());
						}),
						L = 325 + Math.ceil((null == N ? void 0 : N.length) / 3);
					return (
						w ||
							setTimeout(function () {
								var e;
								return null == (e = document.getElementById(v.toString()))
									? void 0
									: e.focus();
							}, 1),
						(0, o.createComponentVNode)(2, l.Window, {
							title: g,
							width: 325,
							height: L,
							children: [
								f && (0, o.createComponentVNode)(2, r.Loader, { value: f }),
								(0, o.createComponentVNode)(2, l.Window.Content, {
									onKeyDown: function (e) {
										var t = window.event ? e.which : e.keyCode;
										(t !== i.KEY_DOWN && t !== i.KEY_UP) ||
											(e.preventDefault(),
											(function (e) {
												var t,
													n,
													o = T.length - 1;
												if (e === i.KEY_DOWN)
													null === v || v === o
														? (k(0),
														  null == (t = document.getElementById("0")) ||
																t.scrollIntoView())
														: (k(v + 1),
														  null ==
																(n = document.getElementById(
																	(v + 1).toString()
																)) || n.scrollIntoView());
												else if (e === i.KEY_UP) {
													var r, a;
													null === v || 0 === v
														? (k(o),
														  null ==
																(r = document.getElementById(o.toString())) ||
																r.scrollIntoView())
														: (k(v - 1),
														  null ==
																(a = document.getElementById(
																	(v - 1).toString()
																)) || a.scrollIntoView());
												}
											})(t)),
											t === i.KEY_ENTER &&
												(e.preventDefault(), s("submit", { entry: T[v] })),
											!w &&
												t >= i.KEY_A &&
												t <= i.KEY_Z &&
												(e.preventDefault(),
												(function (e) {
													var t = String.fromCharCode(e),
														n = C.find(function (e) {
															return null == e
																? void 0
																: e
																		.toLowerCase()
																		.startsWith(
																			null == t ? void 0 : t.toLowerCase()
																		);
														});
													if (n) {
														var o,
															r = C.indexOf(n);
														k(r),
															null ==
																(o = document.getElementById(r.toString())) ||
																o.scrollIntoView();
													}
												})(t)),
											t === i.KEY_ESCAPE && (e.preventDefault(), s("cancel"));
									},
									children: (0, o.createComponentVNode)(2, c.Section, {
										buttons: (0, o.createComponentVNode)(2, c.Button, {
											compact: !0,
											icon: w ? "search" : "font",
											selected: !0,
											tooltip: w
												? "Search Mode. Type to search or use arrow keys to select manually."
												: "Hotkey Mode. Type a letter to jump to the first match. Enter to select.",
											tooltipPosition: "left",
											onClick: function () {
												return S(!w), void I("");
											},
										}),
										className: "ListInput__Section",
										fill: !0,
										title: N,
										children: (0, o.createComponentVNode)(2, c.Stack, {
											fill: !0,
											vertical: !0,
											children: [
												(0, o.createComponentVNode)(2, c.Stack.Item, {
													grow: !0,
													children: (0, o.createComponentVNode)(2, u, {
														filteredItems: T,
														onClick: function (e) {
															e !== v && k(e);
														},
														onFocusSearch: function () {
															S(!1), S(!0);
														},
														searchBarVisible: w,
														selected: v,
													}),
												}),
												w &&
													(0, o.createComponentVNode)(2, m, {
														filteredItems: T,
														onSearch: function (e) {
															var t;
															e !== B &&
																(I(e),
																k(0),
																null == (t = document.getElementById("0")) ||
																	t.scrollIntoView());
														},
														searchQuery: B,
														selected: v,
													}),
												(0, o.createComponentVNode)(2, c.Stack.Item, {
													children: (0, o.createComponentVNode)(
														2,
														a.InputButtons,
														{ input: T[v] }
													),
												}),
											],
										}),
									}),
								}),
							],
						})
					);
				};
				var u = function (e, t) {
						var n = (0, d.useBackend)(t).act,
							r = e.filteredItems,
							a = e.onClick,
							l = e.onFocusSearch,
							u = e.searchBarVisible,
							m = e.selected;
						return (0, o.createComponentVNode)(2, c.Section, {
							fill: !0,
							scrollable: !0,
							tabIndex: 0,
							children: r.map(function (e, t) {
								return (0, o.createComponentVNode)(
									2,
									c.Button,
									{
										color: "transparent",
										fluid: !0,
										id: t,
										onClick: function () {
											return a(t);
										},
										onDblClick: function (e) {
											e.preventDefault(), n("submit", { entry: r[m] });
										},
										onKeyDown: function (e) {
											var t = window.event ? e.which : e.keyCode;
											u &&
												t >= i.KEY_A &&
												t <= i.KEY_Z &&
												(e.preventDefault(), l());
										},
										selected: t === m,
										style: { animation: "none", transition: "none" },
										children: e.replace(/^\w/, function (e) {
											return e.toUpperCase();
										}),
									},
									t
								);
							}),
						});
					},
					m = function (e, t) {
						var n = (0, d.useBackend)(t).act,
							r = e.filteredItems,
							a = e.onSearch,
							i = e.searchQuery,
							l = e.selected;
						return (0, o.createComponentVNode)(2, c.Input, {
							autoFocus: !0,
							autoSelect: !0,
							fluid: !0,
							onEnter: function (e) {
								e.preventDefault(), n("submit", { entry: r[l] });
							},
							onInput: function (e, t) {
								return a(t);
							},
							placeholder: "Search...",
							value: i,
						});
					};
			},
			71533: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.LongRangeTeleporter = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.LongRangeTeleporter = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data,
						d = l.destinations,
						u = l.receive_allowed,
						m = l.send_allowed,
						s = l.syndicate;
					return (0, o.createComponentVNode)(2, c.Window, {
						theme: s ? "syndicate" : "ntos",
						width: 390,
						height: 380,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								title: "Destinations",
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: d.length
										? d.map(function (e) {
												return (0, o.createComponentVNode)(
													2,
													a.LabeledList.Item,
													{
														label: e.destination,
														children: [
															m &&
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "sign-out-alt",
																	onClick: function () {
																		return i("send", {
																			target: e.ref,
																			name: e.destination,
																		});
																	},
																	children: "Send",
																}),
															u &&
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "sign-in-alt",
																	onClick: function () {
																		return i("receive", {
																			target: e.ref,
																			name: e.destination,
																		});
																	},
																	children: "Receive",
																}),
														],
													},
													e.destination
												);
										  })
										: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
												children: "No destinations are currently available.",
										  }),
								}),
							}),
						}),
					});
				};
			},
			77373: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.MechanicalDropper = void 0);
				var o = n(39812),
					r = n(85952),
					a = n(71494),
					c = n(41860),
					i = n(74814),
					l = function (e) {
						var t = e.transferMode,
							n = e.onTransferModeChange;
						return (0, o.createComponentVNode)(2, i.Section, {
							fitted: !0,
							py: 0.6,
							pl: 0.6,
							pr: 1.2,
							children: (0, o.createComponentVNode)(2, i.Tabs, {
								vertical: !0,
								children: [
									(0, o.createComponentVNode)(2, i.Tabs.Tab, {
										selected: 0 === t,
										color: "green",
										onClick: function () {
											return n(0);
										},
										children: "Draw",
									}),
									(0, o.createComponentVNode)(2, i.Tabs.Tab, {
										selected: 1 === t,
										color: "red",
										onClick: function () {
											return n(1);
										},
										children: "Drop",
									}),
								],
							}),
						});
					},
					d = function (e) {
						var t = e.curTransferAmt,
							n = e.minTransferAmt,
							r = e.maxTransferAmt,
							a = e.onTransferAmtChange,
							c = e.curReagentVol,
							l = e.reagentColor;
						return (0, o.createComponentVNode)(2, i.Section, {
							children: [
								(0, o.createComponentVNode)(2, i.Stack, {
									align: "center",
									pb: 1,
									children: [
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											children: (0, o.createComponentVNode)(2, i.Box, {
												textAlign: "right",
												width: "3em",
												children: c + "u",
											}),
										}),
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											grow: !0,
											children: (0, o.createComponentVNode)(2, i.ProgressBar, {
												value: c,
												minValue: 0,
												maxValue: r,
												color: l,
											}),
										}),
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											children: (0, o.createComponentVNode)(2, i.Box, {
												textAlign: "left",
												width: "3em",
												children: r + "u",
											}),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, i.Stack, {
									align: "center",
									children: [
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											children: (0, o.createComponentVNode)(2, i.Button, {
												textAlign: "center",
												width: "3em",
												content: "Min",
												onClick: function () {
													return a(n);
												},
											}),
										}),
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											grow: !0,
											children: (0, o.createComponentVNode)(2, i.Slider, {
												minValue: n,
												maxValue: r,
												stepPixelSize: 20,
												step: 1,
												value: t,
												onChange: function (e, t) {
													return a(t);
												},
											}),
										}),
										(0, o.createComponentVNode)(2, i.Stack.Item, {
											children: (0, o.createComponentVNode)(2, i.Button, {
												textAlign: "center",
												width: "3em",
												content: "Max",
												onClick: function () {
													return a(r);
												},
											}),
										}),
									],
								}),
							],
						});
					};
				t.MechanicalDropper = function (e, t) {
					var n = (0, a.useBackend)(t),
						u = n.act,
						m = n.data,
						s = m.curTransferAmt,
						p = m.minTransferAmt,
						h = m.maxTransferAmt,
						C = m.transferMode,
						N = m.curReagentVol,
						V = m.reagentColor;
					return (0, o.createComponentVNode)(2, r.Window, {
						title: "Mechanical Dropper",
						width: 400,
						height: 105,
						children: (0, o.createComponentVNode)(2, r.Window.Content, {
							children: (0, o.createComponentVNode)(2, i.Stack, {
								children: [
									(0, o.createComponentVNode)(2, i.Stack.Item, {
										align: "center",
										children: (0, o.createComponentVNode)(2, l, {
											transferMode: C,
											onTransferModeChange: function (e) {
												u("mode", { mode: e });
											},
										}),
									}),
									(0, o.createComponentVNode)(2, i.Stack.Item, {
										grow: !0,
										children: (0, o.createComponentVNode)(2, d, {
											curTransferAmt: s,
											minTransferAmt: p,
											maxTransferAmt: h,
											onTransferAmtChange: function (e) {
												(e = (0, c.round)((0, c.clamp)(e, p, h), 1)),
													u("amt", { amt: e });
											},
											curReagentVol: N,
											reagentColor: V,
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			66048: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.MineralMagnet = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952);
				t.MineralMagnet = function (e, t) {
					var n,
						l = (0, r.useBackend)(t),
						d = l.act,
						u = l.data,
						m = u.isLinked,
						s = u.magnetActive,
						p = u.magnetAutomaticMode,
						h = u.magnetCooldownOverride,
						C = u.magnetHealth,
						N = u.magnetLastUsed,
						V = u.time,
						f = u.linkedMagnets || [],
						g = u.miningEncounters || [],
						b = N > V,
						v = (0, r.useLocalState)(t, "viewEncounters", !1),
						k = v[0],
						x = v[1];
					return (0, o.createComponentVNode)(2, i.Window, {
						width: 300,
						height: 240,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Magnet Status",
									children: [
										(0, o.createComponentVNode)(2, a.Box, {
											children: [
												"Condition: ",
												m
													? ((n = C),
													  n >= 95
															? (0, o.createComponentVNode)(2, a.Box, {
																	inline: !0,
																	color: "good",
																	children: "Optimal",
															  })
															: n >= 70
															? (0, o.createComponentVNode)(2, a.Box, {
																	inline: !0,
																	color: "olive",
																	children: "Mild Structural Damage",
															  })
															: n >= 40
															? (0, o.createComponentVNode)(2, a.Box, {
																	inline: !0,
																	color: "yellow",
																	children: "Heavy Structural Damage",
															  })
															: n >= 10
															? (0, o.createComponentVNode)(2, a.Box, {
																	inline: !0,
																	color: "average",
																	children: "Extreme Structural Damage",
															  })
															: (0, o.createComponentVNode)(2, a.Box, {
																	inline: !0,
																	color: "bad",
																	children: "Destruction Imminent",
															  }))
													: (0, o.createComponentVNode)(2, a.Box, {
															inline: !0,
															color: "bad",
															children: "No Magnet Linked",
													  }),
											],
										}),
										(0, o.createComponentVNode)(2, a.Box, {
											children: [
												"Status: ",
												s
													? "Pulling New Mineral Source"
													: b
													? (0, o.createFragment)(
															[
																(0, o.createTextVNode)("Cooling Down: "),
																(0, o.createComponentVNode)(2, a.TimeDisplay, {
																	value: Math.max(N - V, 0),
																	timing: !0,
																	format: function (e) {
																		return (0, c.formatTime)(e);
																	},
																}),
															],
															4
													  )
													: "Idle",
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Magnet Controls",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										textAlign: "center",
										icon: "rss",
										onClick: function () {
											return d("geoscan");
										},
										children: "Scan",
									}),
									children: [
										(!!s || (b && !h)) &&
											(0, o.createComponentVNode)(2, a.Dimmer, {
												fontSize: 1.75,
												pb: 2,
												children: s ? "Magnet Active" : "On Cooldown",
											}),
										(0, o.createComponentVNode)(2, a.Button, {
											textAlign: "center",
											color: b && h && "average",
											icon: "magnet",
											onClick: function () {
												return d("activatemagnet");
											},
											fluid: !0,
											children: "Activate Magnet",
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											textAlign: "center",
											color: b && h && "average",
											icon: "search",
											disabled: !g.length,
											onClick: function () {
												return x(!0);
											},
											fluid: !0,
											children: "Activate telescope location",
										}),
										(0, o.createComponentVNode)(2, a.Button.Checkbox, {
											checked: h,
											onClick: function () {
												return d("overridecooldown");
											},
											style: { "z-index": "1" },
											children: "Override Cooldown",
										}),
										(0, o.createComponentVNode)(2, a.Button.Checkbox, {
											checked: p,
											onClick: function () {
												return d("automode");
											},
											style: { "z-index": "1" },
											children: "Automatic Mode",
										}),
									],
								}),
								k &&
									(0, o.createComponentVNode)(2, a.Modal, {
										full: !0,
										ml: 1,
										width: "230px",
										height: "200px",
										children: (0, o.createComponentVNode)(2, a.Stack, {
											vertical: !0,
											fill: !0,
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													grow: !0,
													children: (0, o.createComponentVNode)(2, a.Section, {
														scrollable: !0,
														fill: !0,
														children: g.map(function (e) {
															return (0, o.createComponentVNode)(
																2,
																a.Button,
																{
																	onClick: function () {
																		d("activateselectable", {
																			encounter_id: e.id,
																		}),
																			x(!1);
																	},
																	fluid: !0,
																	children: e.name,
																},
																e.id
															);
														}),
													}),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													children: (0, o.createComponentVNode)(2, a.Flex, {
														children: [
															(0, o.createComponentVNode)(2, a.Flex.Item, {
																grow: !0,
																pt: 0.5,
																color: "label",
																children: [
																	(0, o.createComponentVNode)(2, a.Icon, {
																		name: "search",
																	}),
																	" Choose a location",
																],
															}),
															(0, o.createComponentVNode)(2, a.Flex.Item, {
																children: (0, o.createComponentVNode)(
																	2,
																	a.Button,
																	{
																		color: "bad",
																		icon: "times",
																		onClick: function () {
																			return x(!1);
																		},
																		children: "Cancel",
																	}
																),
															}),
														],
													}),
												}),
											],
										}),
									}),
								!!m ||
									(0, o.createComponentVNode)(2, a.Modal, {
										full: !0,
										ml: 1,
										width: "270px",
										height: "200px",
										children: (0, o.createComponentVNode)(2, a.Section, {
											title: "Choose Linked Magnet",
											scrollable: !0,
											fill: !0,
											children: [
												(0, o.createComponentVNode)(2, a.Button, {
													textAlign: "center",
													icon: "rss",
													fluid: !0,
													onClick: function () {
														return d("magnetscan");
													},
													children: "Scan for Magnets",
												}),
												(0, o.createComponentVNode)(2, a.Divider),
												f.map(function (e) {
													var t;
													return (0, o.createComponentVNode)(
														2,
														a.Button,
														{
															icon:
																e.angle === undefined
																	? "circle"
																	: "arrow-right",
															iconRotation: null != (t = e.angle) ? t : 0,
															textAlign: "center",
															fluid: !0,
															onClick: function () {
																return d("linkmagnet", e);
															},
															children:
																e.name + " at (" + e.x + ", " + e.y + ")",
														},
														e.ref
													);
												}),
											],
										}),
									}),
							],
						}),
					});
				};
			},
			50504: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.MixingDesk = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(58083);
				t.MixingDesk = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.voices,
						m = d.selected_voice,
						s = d.say_popup,
						p = (0, r.useSharedState)(t, "message", null),
						h = p[0],
						C = p[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						height: 375,
						width: 370,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							onkeydown: function (e) {
								var t = String.fromCharCode(e.keyCode),
									n = !0;
								if ("T" === t) l("say_popup");
								else if (27 === e.keyCode && s) l("cancel_say"), C("");
								else if (s) n = !1;
								else {
									var o = Number(t);
									String(o) === t ? l("switch_voice", { id: o }) : (n = !1);
								}
								n && e.stopPropagation();
							},
							children: [
								!!s &&
									(0, o.createComponentVNode)(2, a.Modal, {
										children: [
											"Say as ",
											m > 0 && m <= u.length ? u[m - 1].name : "yourself",
											":",
											(0, o.createVNode)(1, "br"),
											(0, o.createComponentVNode)(2, a.Box, {
												pt: "5px",
												pr: "10px",
												textAlign: "center",
												children: (0, o.createComponentVNode)(2, a.Input, {
													autoFocus: !0,
													selfClear: !0,
													width: 20,
													value: h,
													onEnter: function (e, t) {
														window.focus(), l("say", { message: t }), C("");
													},
													onChange: function (e, t) {
														return C(t);
													},
												}),
											}),
											(0, o.createVNode)(1, "br"),
											(0, o.createComponentVNode)(2, a.Box, {
												textAlign: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Button, {
														onClick: function () {
															l("say", { message: h }), C("");
														},
														children: "Say",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														onClick: function () {
															l("cancel_say"), C("");
														},
														children: "Cancel",
													}),
												],
											}),
										],
									}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Voice Synthesizer",
									children: [
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												u.map(function (e, t) {
													return (0, o.createComponentVNode)(
														2,
														a.LabeledList.Item,
														{
															label:
																t +
																1 +
																" " +
																(0, i.truncate)(e.name, 18) +
																(e.accent ? " [" + e.accent + "]" : ""),
															labelColor: t + 1 === m ? "red" : "label",
															children: [
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "trash-alt",
																	onClick: function () {
																		return l("remove_voice", { id: t + 1 });
																	},
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "bullhorn",
																	onClick: function () {
																		return l("say_popup", { id: t + 1 });
																	},
																}),
															],
														},
														e.name
													);
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													children: (0, o.createComponentVNode)(2, a.Stack, {
														align: "center",
														children: [
															(0, o.createComponentVNode)(2, a.Stack.Item, {
																children: (0, o.createComponentVNode)(
																	2,
																	a.Button,
																	{
																		icon: "plus",
																		onClick: function () {
																			return l("add_voice");
																		},
																		disabled: u.length >= 9,
																	}
																),
															}),
															(0, o.createComponentVNode)(2, a.Stack.Item, {
																children: (0, o.createComponentVNode)(
																	2,
																	a.Tooltip,
																	{
																		position: "right",
																		content:
																			"Press T to talk and 1-9 keys to switch voices. Press 0 to reset to your normal voice.",
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Icon,
																			{ name: "question-circle" }
																		),
																	}
																),
															}),
														],
													}),
												}),
											],
										}),
									],
								}),
							],
						}),
					});
				};
			},
			49937: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.NumberInputModal = void 0);
				var o = n(39812),
					r = n(65923),
					a = n(56443),
					c = n(29708),
					i = n(71494),
					l = n(74814),
					d = n(85952);
				t.NumberInputModal = function (e, t) {
					var n = (0, i.useBackend)(t),
						m = n.act,
						s = n.data,
						p = s.message,
						h = s.init_value,
						C = s.round_input,
						N = s.timeout,
						V = s.title,
						f = (0, i.useLocalState)(t, "input", h),
						g = f[0],
						b = f[1],
						v = 125 + Math.ceil((null == p ? void 0 : p.length) / 3);
					return (0, o.createComponentVNode)(2, d.Window, {
						title: V,
						width: 270,
						height: v,
						children: [
							N && (0, o.createComponentVNode)(2, r.Loader, { value: N }),
							(0, o.createComponentVNode)(2, d.Window.Content, {
								onKeyDown: function (e) {
									var t = window.event ? e.which : e.keyCode;
									t === c.KEY_ENTER && m("submit", { entry: g }),
										t === c.KEY_ESCAPE && m("cancel");
								},
								children: (0, o.createComponentVNode)(2, l.Section, {
									fill: !0,
									children: (0, o.createComponentVNode)(2, l.Stack, {
										fill: !0,
										vertical: !0,
										children: [
											(0, o.createComponentVNode)(2, l.Stack.Item, {
												children: (0, o.createComponentVNode)(2, l.Box, {
													color: "label",
													children: p,
												}),
											}),
											(0, o.createComponentVNode)(2, l.Stack.Item, {
												children: (0, o.createComponentVNode)(2, u, {
													input: g,
													onClick: function (e) {
														b(C ? Math.round(e) : e);
													},
													onChange: function (e) {
														b(C ? Math.round(e) : e);
													},
												}),
											}),
											(0, o.createComponentVNode)(2, l.Stack.Item, {
												pl: 4,
												pr: 4,
												children: (0, o.createComponentVNode)(
													2,
													a.InputButtons,
													{ input: g }
												),
											}),
										],
									}),
								}),
							}),
						],
					});
				};
				var u = function (e, t) {
					var n = (0, i.useBackend)(t).data,
						r = n.min_value,
						a = n.max_value,
						c = n.init_value,
						d = e.input,
						u = e.onClick,
						m = e.onChange;
					return (0, o.createComponentVNode)(2, l.Stack, {
						fill: !0,
						children: [
							(0, o.createComponentVNode)(2, l.Stack.Item, {
								children: (0, o.createComponentVNode)(2, l.Button, {
									icon: "angle-double-left",
									onClick: function () {
										return u(r || 0);
									},
									tooltip: "Minimum",
								}),
							}),
							(0, o.createComponentVNode)(2, l.Stack.Item, {
								grow: !0,
								children: (0, o.createComponentVNode)(2, l.NumberInput, {
									autoFocus: !0,
									autoSelect: !0,
									fluid: !0,
									minValue: r,
									maxValue: a,
									onChange: function (e, t) {
										return m(t);
									},
									onDrag: function (e, t) {
										return m(t);
									},
									value: null !== d ? d : c,
								}),
							}),
							(0, o.createComponentVNode)(2, l.Stack.Item, {
								children: (0, o.createComponentVNode)(2, l.Button, {
									icon: "angle-double-right",
									onClick: function () {
										return u(null !== a ? a : 1e4);
									},
									tooltip: "Max",
								}),
							}),
							(0, o.createComponentVNode)(2, l.Stack.Item, {
								children: (0, o.createComponentVNode)(2, l.Button, {
									icon: "redo",
									onClick: function () {
										return u(c || 0);
									},
									tooltip: "Reset",
								}),
							}),
						],
					});
				};
			},
			52472: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PaperSheet = t.PaperSheetView = void 0);
				var o,
					r = n(39812),
					a = n(5908),
					c = (o = n(76756)) && o.__esModule ? o : { default: o },
					i = n(71494),
					l = n(74814),
					d = n(85952),
					u = n(41860),
					m = n(45452);
				function s(e, t) {
					(e.prototype = Object.create(t.prototype)),
						(e.prototype.constructor = e),
						b(e, t);
				}
				function p(e, t) {
					var n =
						("undefined" != typeof Symbol && e[Symbol.iterator]) ||
						e["@@iterator"];
					if (n) return (n = n.call(e)).next.bind(n);
					if (
						Array.isArray(e) ||
						(n = (function (e, t) {
							if (!e) return;
							if ("string" == typeof e) return h(e, t);
							var n = Object.prototype.toString.call(e).slice(8, -1);
							"Object" === n && e.constructor && (n = e.constructor.name);
							if ("Map" === n || "Set" === n) return Array.from(e);
							if (
								"Arguments" === n ||
								/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							)
								return h(e, t);
						})(e)) ||
						(t && e && "number" == typeof e.length)
					) {
						n && (e = n);
						var o = 0;
						return function () {
							return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				function h(e, t) {
					(null == t || t > e.length) && (t = e.length);
					for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
					return o;
				}
				function C(e, t) {
					C = function (e, t) {
						return new a(e, undefined, t);
					};
					var n = V(RegExp),
						o = RegExp.prototype,
						r = new WeakMap();
					function a(e, t, o) {
						var a = n.call(this, e, t);
						return r.set(a, o || r.get(e)), a;
					}
					function c(e, t) {
						var n = r.get(t);
						return Object.keys(n).reduce(function (t, o) {
							return (t[o] = e[n[o]]), t;
						}, Object.create(null));
					}
					return (
						N(a, n),
						(a.prototype.exec = function (e) {
							var t = o.exec.call(this, e);
							return t && (t.groups = c(t, this)), t;
						}),
						(a.prototype[Symbol.replace] = function (e, t) {
							if ("string" == typeof t) {
								var n = r.get(this);
								return o[Symbol.replace].call(
									this,
									e,
									t.replace(/\$<([^>]+)>/g, function (e, t) {
										return "$" + n[t];
									})
								);
							}
							if ("function" == typeof t) {
								var a = this;
								return o[Symbol.replace].call(this, e, function () {
									var e = [];
									return (
										e.push.apply(e, arguments),
										"object" != typeof e[e.length - 1] && e.push(c(e, a)),
										t.apply(this, e)
									);
								});
							}
							return o[Symbol.replace].call(this, e, t);
						}),
						C.apply(this, arguments)
					);
				}
				function N(e, t) {
					if ("function" != typeof t && null !== t)
						throw new TypeError(
							"Super expression must either be null or a function"
						);
					(e.prototype = Object.create(t && t.prototype, {
						constructor: { value: e, writable: !0, configurable: !0 },
					})),
						t && b(e, t);
				}
				function V(e) {
					var t = "function" == typeof Map ? new Map() : undefined;
					return (V = function (e) {
						if (
							null === e ||
							((n = e),
							-1 === Function.toString.call(n).indexOf("[native code]"))
						)
							return e;
						var n;
						if ("function" != typeof e)
							throw new TypeError(
								"Super expression must either be null or a function"
							);
						if (void 0 !== t) {
							if (t.has(e)) return t.get(e);
							t.set(e, o);
						}
						function o() {
							return f(e, arguments, v(this).constructor);
						}
						return (
							(o.prototype = Object.create(e.prototype, {
								constructor: {
									value: o,
									enumerable: !1,
									writable: !0,
									configurable: !0,
								},
							})),
							b(o, e)
						);
					})(e);
				}
				function f(e, t, n) {
					return (f = g()
						? Reflect.construct
						: function (e, t, n) {
								var o = [null];
								o.push.apply(o, t);
								var r = new (Function.bind.apply(e, o))();
								return n && b(r, n.prototype), r;
						  }).apply(null, arguments);
				}
				function g() {
					if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
					if (Reflect.construct.sham) return !1;
					if ("function" == typeof Proxy) return !0;
					try {
						return (
							Boolean.prototype.valueOf.call(
								Reflect.construct(Boolean, [], function () {})
							),
							!0
						);
					} catch (e) {
						return !1;
					}
				}
				function b(e, t) {
					return (b =
						Object.setPrototypeOf ||
						function (e, t) {
							return (e.__proto__ = t), e;
						})(e, t);
				}
				function v(e) {
					return (v = Object.setPrototypeOf
						? Object.getPrototypeOf
						: function (e) {
								return e.__proto__ || Object.getPrototypeOf(e);
						  })(e);
				}
				var k = 5e3,
					x = function (e, t, n, o) {
						return (
							void 0 === o && (o = !1),
							'<span style="color:' +
								n +
								";font-family:" +
								t +
								";" +
								(o ? "font-weight: bold;" : "") +
								'">' +
								e +
								"</span>"
						);
					},
					w = /\[(_+)\]/g,
					S = C(
						/\[<input[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(?!disabled)(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+id="(paperfield_[0-9]+)"(.*?)\/>\]/gm,
						{ id: 2 }
					),
					y = /%s(?:ign)?(?=\\s|$)?/gim,
					B = function (e, t, n, o, r) {
						var a = e.replace(w, function (e, a, c, i) {
							var l =
								(function (e, t, n) {
									t = n + "x " + t;
									var o = document.createElement("canvas").getContext("2d");
									return (o.font = t), o.measureText(e).width;
								})(e, t, n) + "px";
							return (function (e, t, n, o, r, a) {
								return (
									'[<input type="text" style="font:\'' +
									o +
									"x " +
									n +
									"';color:'" +
									r +
									"';min-width:" +
									t +
									";max-width:" +
									t +
									';" id="' +
									a +
									'" maxlength=' +
									e +
									" size=" +
									e +
									" />]"
								);
							})(a.length, l, t, n, o, "paperfield_" + r++);
						});
						return { counter: r, text: a };
					},
					I = function (e, t) {
						var n = e.image,
							o = e.opacity,
							c = e.activeStamp,
							i = {
								left: n.x + "px",
								top: n.y + "px",
								transform: "rotate(" + n.rotate + "deg)",
								opacity: o || 1,
							};
						return n.sprite.match("stamp-.*")
							? (0, r.createVNode)(1, "img", "paper__stamp", null, 1, {
									id: c && "stamp",
									style: i,
									src: (0, a.resolveAsset)(n.sprite),
							  })
							: (0, r.createComponentVNode)(2, l.Box, {
									id: c && "stamp",
									style: i,
									className: "paper__stamp-text",
									children: n.sprite,
							  });
					},
					T = function (e, t) {
						var n,
							o,
							a = e.value,
							c = void 0 === a ? "" : a,
							i = e.stamps,
							d = void 0 === i ? [] : i,
							u = e.backgroundColor,
							m = e.readOnly,
							s = d || [],
							p = {
								__html:
									'<span class="paper-text">' +
									((n = c),
									(o = m),
									(o
										? n.replace(/<input\s[^d]/g, "<input disabled ")
										: n.replace(/<input\sdisabled\s/g, "<input ")) + "</span>"),
							};
						return (0, r.createComponentVNode)(2, l.Box, {
							className: "paper__page",
							position: "relative",
							backgroundColor: u,
							width: "100%",
							height: "100%",
							children: [
								(0, r.createComponentVNode)(2, l.Box, {
									color: "black",
									backgroundColor: u,
									fillPositionedParent: !0,
									width: "100%",
									height: "100%",
									dangerouslySetInnerHTML: p,
									p: "10px",
								}),
								s.map(function (e, t) {
									return (0,
									r.createComponentVNode)(2, I, { image: { sprite: e[0], x: e[1], y: e[2], rotate: e[3] } }, e[0] + t);
								}),
							],
						});
					};
				t.PaperSheetView = T;
				var L = (function (e) {
						function t(t, n) {
							var o;
							return (
								((o = e.call(this, t, n) || this).state = {
									x: 0,
									y: 0,
									rotate: 0,
								}),
								(o.style = null),
								(o.handleMouseMove = function (e) {
									var t = o.findStampPosition(e);
									t &&
										(!(function (e) {
											e.stopPropagation && e.stopPropagation(),
												e.preventDefault && e.preventDefault(),
												(e.cancelBubble = !0),
												(e.returnValue = !1);
										})(e),
										o.setState({ x: t[0], y: t[1], rotate: t[2] }));
								}),
								(o.handleMouseClick = function (e) {
									e.pageY <= 30 ||
										(0, (0, i.useBackend)(o.context).act)("stamp", {
											x: o.state.x,
											y: o.state.y,
											r: o.state.rotate,
										});
								}),
								o
							);
						}
						s(t, e);
						var n = t.prototype;
						return (
							(n.findStampPosition = function (e) {
								var t,
									n = document.querySelector(".Layout__content");
								e.shiftKey && (t = !0);
								var o = document.getElementById("stamp");
								if (o) {
									var r = o.clientHeight,
										a = o.clientWidth,
										c = t ? this.state.y : e.pageY + n.scrollTop - r,
										i = t ? this.state.x : e.pageX - a / 2,
										l = n.clientWidth - a,
										d = n.clientHeight + n.scrollTop - r,
										m = Math.atan2(e.pageX - i, e.pageY - c),
										s = t ? m * (180 / Math.PI) * -1 : this.state.rotate;
									return [(0, u.clamp)(i, 0, l), (0, u.clamp)(c, 0, d), s];
								}
							}),
							(n.componentDidMount = function () {
								document.addEventListener("mousemove", this.handleMouseMove),
									document.addEventListener("click", this.handleMouseClick);
							}),
							(n.componentWillUnmount = function () {
								document.removeEventListener("mousemove", this.handleMouseMove),
									document.removeEventListener("click", this.handleMouseClick);
							}),
							(n.render = function () {
								var e = this.props,
									t = e.value,
									n = e.stampClass,
									o = e.stamps || [],
									a = {
										sprite: n,
										x: this.state.x,
										y: this.state.y,
										rotate: this.state.rotate,
									};
								return (0, r.createFragment)(
									[
										(0, r.createComponentVNode)(2, T, {
											readOnly: !0,
											value: t,
											stamps: o,
										}),
										(0, r.createComponentVNode)(2, I, {
											activeStamp: !0,
											opacity: 0.5,
											image: a,
										}),
									],
									4
								);
							}),
							t
						);
					})(r.Component),
					_ = (function (e) {
						function t(t, n) {
							var o;
							return (
								((o = e.call(this, t, n) || this).state = {
									previewSelected: "Preview",
									oldText: t.value || "",
									textAreaText: "",
									combinedText: t.value || "",
									showingHelpTip: !1,
								}),
								o
							);
						}
						s(t, e);
						var n = t.prototype;
						return (
							(n.createPreview = function (e, t) {
								void 0 === t && (t = !1);
								var n,
									o,
									r = (0, i.useBackend)(this.context).data,
									a = r.text,
									l = r.penColor,
									d = r.penFont,
									u = r.isCrayon,
									s = r.fieldCounter,
									h = r.editUsr,
									C = { text: a };
								if ((e = e.trim()).length > 0) {
									var N = (0, m.sanitizeText)(e),
										V =
											((n = l),
											(o = h),
											N.replace(y, function () {
												return x(o, "Times New Roman", n, !0);
											})),
										f = B(V, d, 12, l, s),
										g = (function (e) {
											return (0, c["default"])(e, {
												breaks: !0,
												smartypants: !0,
												smartLists: !0,
												walkTokens: function (e) {
													switch (e.type) {
														case "url":
														case "autolink":
														case "reflink":
														case "link":
														case "image":
															(e.type = "text"), (e.href = "");
													}
												},
												baseUrl: "thisshouldbreakhttp",
											});
										})(f.text),
										b = x(g, d, l, u);
									(C.text += b), (C.fieldCounter = f.counter);
								}
								if (t) {
									var v = (function (e, t, n, o, r) {
										var a;
										void 0 === r && (r = !1);
										for (var c = {}, i = []; null !== (a = S.exec(e)); ) {
											var l = a[0],
												d = a.groups.id;
											if (d) {
												var u = document.getElementById(d);
												if (0 === (u && u.value ? u.value : "").length)
													continue;
												var s = (0, m.sanitizeText)(u.value.trim(), []);
												if (0 === s.length) continue;
												var h = u.cloneNode(!0);
												s.match(y)
													? ((h.style.fontFamily = "Times New Roman"),
													  (r = !0),
													  (h.defaultValue = o))
													: ((h.style.fontFamily = t), (h.defaultValue = s)),
													r && (h.style.fontWeight = "bold"),
													(h.style.color = n),
													(h.disabled = !0);
												var C = document.createElement("div");
												C.appendChild(h),
													(c[d] = s),
													i.push({
														value: "[" + C.innerHTML + "]",
														rawText: l,
													});
											}
										}
										if (i.length > 0)
											for (var N, V = p(i); !(N = V()).done; ) {
												var f = N.value;
												e = e.replace(f.rawText, f.value);
											}
										return { text: e, fields: c };
									})(C.text, d, l, h, u);
									(C.text = v.text), (C.formFields = v.fields);
								}
								return C;
							}),
							(n.onInputHandler = function (e, t) {
								var n = this;
								if (t !== this.state.textAreaText) {
									var o =
										this.state.oldText.length + this.state.textAreaText.length;
									if (
										o > k &&
										(t =
											o - k >= t.length
												? ""
												: t.substr(0, t.length - (o - k))) ===
											this.state.textAreaText
									)
										return;
									this.setState(function () {
										return {
											textAreaText: t,
											combinedText: n.createPreview(t),
										};
									});
								}
							}),
							(n.finalUpdate = function (e) {
								var t = (0, i.useBackend)(this.context).act,
									n = this.createPreview(e, !0);
								t("save", n),
									this.setState(function () {
										return {
											textAreaText: "",
											previewSelected: "save",
											combinedText: n.text,
										};
									});
							}),
							(n.render = function () {
								var e = this,
									t = this.props,
									n = t.textColor,
									o = t.fontFamily,
									a = t.stamps,
									c = t.backgroundColor;
								return (0, r.createComponentVNode)(2, l.Flex, {
									direction: "column",
									fillPositionedParent: !0,
									children: [
										(0, r.createComponentVNode)(2, l.Flex.Item, {
											children: (0, r.createComponentVNode)(2, l.Tabs, {
												size: "100%",
												children: [
													(0, r.createComponentVNode)(
														2,
														l.Tabs.Tab,
														{
															textColor: "black",
															backgroundColor:
																"Edit" === this.state.previewSelected
																	? "grey"
																	: "white",
															selected: "Edit" === this.state.previewSelected,
															onClick: function () {
																return e.setState({ previewSelected: "Edit" });
															},
															children: "Edit",
														},
														"marked_edit"
													),
													(0, r.createComponentVNode)(
														2,
														l.Tabs.Tab,
														{
															textColor: "black",
															backgroundColor:
																"Preview" === this.state.previewSelected
																	? "grey"
																	: "white",
															selected:
																"Preview" === this.state.previewSelected,
															onClick: function () {
																return e.setState(function () {
																	return {
																		previewSelected: "Preview",
																		textAreaText: e.state.textAreaText,
																		combinedText: e.createPreview(
																			e.state.textAreaText
																		).text,
																	};
																});
															},
															children: "Preview",
														},
														"marked_preview"
													),
													(0, r.createComponentVNode)(
														2,
														l.Tabs.Tab,
														{
															textColor: "black",
															backgroundColor:
																"confirm" === this.state.previewSelected
																	? "red"
																	: "save" === this.state.previewSelected
																	? "grey"
																	: "white",
															selected:
																"confirm" === this.state.previewSelected ||
																"save" === this.state.previewSelected,
															onClick: function () {
																"confirm" === e.state.previewSelected
																	? e.finalUpdate(e.state.textAreaText)
																	: "Edit" === e.state.previewSelected
																	? e.setState(function () {
																			return {
																				previewSelected: "confirm",
																				textAreaText: e.state.textAreaText,
																				combinedText: e.createPreview(
																					e.state.textAreaText
																				).text,
																			};
																	  })
																	: e.setState({ previewSelected: "confirm" });
															},
															children:
																"confirm" === this.state.previewSelected
																	? "Confirm"
																	: "Save",
														},
														"marked_done"
													),
													(0, r.createComponentVNode)(
														2,
														l.Tabs.Tab,
														{
															textColor: "black",
															backgroundColor: "white",
															icon: "question-circle-o",
															onmouseover: function () {
																e.setState({ showingHelpTip: !0 });
															},
															onmouseout: function () {
																e.setState({ showingHelpTip: !1 });
															},
															children: "Help",
														},
														"marked_help"
													),
												],
											}),
										}),
										(0, r.createComponentVNode)(2, l.Flex.Item, {
											grow: 1,
											basis: 1,
											children:
												("Edit" === this.state.previewSelected &&
													(0, r.createComponentVNode)(2, l.TextArea, {
														value: this.state.textAreaText,
														textColor: n,
														fontFamily: o,
														height: window.innerHeight - 60 + "px",
														backgroundColor: c,
														onInput: this.onInputHandler.bind(this),
													})) ||
												(0, r.createComponentVNode)(2, T, {
													value: this.state.combinedText,
													stamps: a,
													fontFamily: o,
													textColor: n,
												}),
										}),
										this.state.showingHelpTip &&
											(0, r.createComponentVNode)(2, P),
									],
								});
							}),
							t
						);
					})(r.Component);
				t.PaperSheet = function (e, t) {
					var n = (0, i.useBackend)(t).data,
						o = n.editMode,
						a = n.text,
						c = n.paperColor,
						u = void 0 === c ? "white" : c,
						m = n.penColor,
						s = void 0 === m ? "black" : m,
						p = n.penFont,
						h = void 0 === p ? "Verdana" : p,
						C = n.stamps,
						N = n.stampClass,
						V = n.sizeX,
						f = n.sizeY,
						g = n.name,
						b = C || [];
					return (0, r.createComponentVNode)(2, d.Window, {
						title: g,
						theme: "paper",
						width: V || 400,
						height: f || 500,
						children: (0, r.createComponentVNode)(2, d.Window.Content, {
							backgroundColor: u,
							scrollable: !0,
							children: (0, r.createComponentVNode)(2, l.Box, {
								id: "page",
								fitted: !0,
								fillPositionedParent: !0,
								children: (function (e) {
									switch (e) {
										case 0:
											return (0, r.createComponentVNode)(2, T, {
												value: a,
												stamps: b,
												readOnly: !0,
											});
										case 1:
											return (0, r.createComponentVNode)(2, _, {
												value: a,
												textColor: s,
												fontFamily: h,
												stamps: b,
												backgroundColor: u,
											});
										case 2:
											return (0, r.createComponentVNode)(2, L, {
												value: a,
												stamps: b,
												stampClass: N,
											});
										default:
											return "ERROR ERROR WE CANNOT BE HERE!!";
									}
								})(o),
							}),
						}),
					});
				};
				var P = function () {
					return (0, r.createComponentVNode)(2, l.Box, {
						position: "absolute",
						left: "10px",
						top: "25px",
						width: "300px",
						height: "350px",
						backgroundColor: "#E8E4C9",
						textAlign: "center",
						children: [
							(0, r.createVNode)(1, "h3", null, "Markdown Syntax", 16),
							(0, r.createComponentVNode)(2, l.Table, {
								children: [
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: [
													(0, r.createComponentVNode)(2, l.Box, {
														children: "Heading",
													}),
													"=====",
												],
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"h2",
													null,
													"Heading",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: [
													(0, r.createComponentVNode)(2, l.Box, {
														children: "Sub Heading",
													}),
													"------",
												],
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"h4",
													null,
													"Sub Heading",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: "_Italic Text_",
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"i",
													null,
													"Italic Text",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: "**Bold Text**",
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"b",
													null,
													"Bold Text",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: "`Code Text`",
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"code",
													null,
													"Code Text",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: "~~Strikethrough Text~~",
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"s",
													null,
													"Strikethrough Text",
													16
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: [
													(0, r.createComponentVNode)(2, l.Box, {
														children: "Horizontal Rule",
													}),
													"---",
												],
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: [
													"Horizontal Rule",
													(0, r.createVNode)(1, "hr"),
												],
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createComponentVNode)(2, l.Table, {
													children: [
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "* List Element 1",
														}),
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "* List Element 2",
														}),
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "* Etc...",
														}),
													],
												}),
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"ul",
													null,
													[
														(0, r.createVNode)(
															1,
															"li",
															null,
															"List Element 1",
															16
														),
														(0, r.createVNode)(
															1,
															"li",
															null,
															"List Element 2",
															16
														),
														(0, r.createVNode)(1, "li", null, "Etc...", 16),
													],
													4
												),
											}),
										],
									}),
									(0, r.createComponentVNode)(2, l.Table.Row, {
										children: [
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createComponentVNode)(2, l.Table, {
													children: [
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "1. List Element 1",
														}),
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "2. List Element 2",
														}),
														(0, r.createComponentVNode)(2, l.Table.Row, {
															children: "3. Etc...",
														}),
													],
												}),
											}),
											(0, r.createComponentVNode)(2, l.Table.Cell, {
												children: (0, r.createVNode)(
													1,
													"ol",
													null,
													[
														(0, r.createVNode)(
															1,
															"li",
															null,
															"List Element 1",
															16
														),
														(0, r.createVNode)(
															1,
															"li",
															null,
															"List Element 2",
															16
														),
														(0, r.createVNode)(1, "li", null, "Etc...", 16),
													],
													4
												),
											}),
										],
									}),
								],
							}),
						],
					});
				};
			},
			94633: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Particool = void 0);
				var o = n(39812),
					r = n(41860),
					a = n(41860),
					c = n(71494),
					i = n(74814),
					l = n(85952),
					d = n(88654),
					u = function (e, t) {
						var n = e.value,
							r = e.tooltip,
							a = e.name,
							l = (0, c.useBackend)(t).act;
						return (0, o.createComponentVNode)(2, i.Tooltip, {
							position: "bottom",
							content: r,
							children: (0, o.createComponentVNode)(2, i.NumberInput, {
								value: n,
								stepPixelSize: 5,
								width: "39px",
								onDrag: function (e, t) {
									return l("modify_particle_value", {
										new_data: { name: a, value: t, type: "int" },
									});
								},
							}),
						});
					},
					m = function (e, t) {
						var n = e.value,
							r = e.name,
							a = (0, c.useBackend)(t).act;
						return (
							(n = n || [1, 0, 0, 1, 0, 0]),
							(0, o.createComponentVNode)(2, i.Flex, {
								children: (0, o.createComponentVNode)(2, i.Flex.Item, {
									children: n.map(function (e, t) {
										return (0, o.createComponentVNode)(
											2,
											i.NumberInput,
											{
												value: e,
												onDrag: function (e, o) {
													(n[t] = o),
														a("modify_particle_value", {
															new_data: { name: r, value: n, type: "matrix" },
														});
												},
											},
											t
										);
									}),
								}),
							})
						);
					},
					s = function (e, t) {
						var n = e.value,
							r = (e.tooltip, e.name),
							a = (0, c.useBackend)(t).act,
							l = null,
							d = "string" == typeof n;
						return (
							(l = d ? f(e, t) : p(e, t)),
							(0, o.createComponentVNode)(2, i.Flex, {
								children: [
									(0, o.createComponentVNode)(2, i.Flex.Item, { children: l }),
									(0, o.createComponentVNode)(2, i.Flex.Item, {
										align: "right",
										children: (0, o.createComponentVNode)(
											2,
											i.Button.Checkbox,
											{
												checked: d,
												content: "generator",
												onClick: function () {
													return a("modify_particle_value", {
														new_data: {
															name: r,
															value: d
																? 0
																: {
																		genType: "num",
																		a: n,
																		b: n,
																		rand: "UNIFORM_RAND",
																  },
															type: d ? "float" : "generator",
														},
													});
												},
											}
										),
									}),
								],
							})
						);
					},
					p = function (e, t) {
						var n = e.value,
							l = e.tooltip,
							d = e.name,
							u = (0, c.useBackend)(t).act,
							m = (0, c.useLocalState)(t, "particleFloatStep", 0.01),
							s = m[0];
						m[1];
						return (0, o.createComponentVNode)(2, i.Tooltip, {
							position: "bottom",
							content: l,
							children: (0, o.createComponentVNode)(2, i.NumberInput, {
								value: n,
								stepPixelSize: 4,
								step: s,
								format: function (e) {
									return (0, r.toFixed)(e, (0, a.numberOfDecimalDigits)(s));
								},
								width: "80px",
								onDrag: function (e, t) {
									return u("modify_particle_value", {
										new_data: { name: d, value: t, type: "float" },
									});
								},
							}),
						});
					},
					h = function (e, t) {
						var n = e.value,
							r = (e.tooltip, e.name),
							a = (0, c.useBackend)(t).act,
							l = null,
							d = "string" == typeof n;
						return (
							(l = d ? f(e, t) : N(e, t)),
							(0, o.createComponentVNode)(2, i.Flex, {
								children: [
									(0, o.createComponentVNode)(2, i.Flex.Item, { children: l }),
									(0, o.createComponentVNode)(2, i.Flex.Item, {
										align: "right",
										children: (0, o.createComponentVNode)(
											2,
											i.Button.Checkbox,
											{
												checked: d,
												content: "generator",
												onClick: function () {
													return a("modify_particle_value", {
														new_data: {
															name: r,
															value: d
																? [0, 0, 0]
																: {
																		genType: "box",
																		a: n,
																		b: n,
																		rand: "UNIFORM_RAND",
																  },
															type: d ? "vector" : "generator",
														},
													});
												},
											}
										),
									}),
								],
							})
						);
					},
					C = function (e) {
						return function (t, n) {
							var r = t.value,
								a = t.name,
								l = (0, c.useBackend)(n).act;
							return (
								(r = r || Array(e).fill(0)),
								isNaN(r) || (r = Array(e).fill(r)),
								(r = r.slice(0, e)),
								(0, o.createComponentVNode)(2, i.Flex, {
									children: (0, o.createComponentVNode)(2, i.Flex.Item, {
										children: r.map(function (e, t) {
											return (0, o.createComponentVNode)(
												2,
												i.NumberInput,
												{
													value: e,
													width: "40px",
													onDrag: function (e, n) {
														(r[t] = n),
															l("modify_particle_value", {
																new_data: { name: a, value: r, type: "vector" },
															});
													},
												},
												t
											);
										}),
									}),
								})
							);
						};
					},
					N = C(3),
					V = function (e, t) {
						var n = e.value,
							r = (e.tooltip, e.name),
							a = (0, c.useBackend)(t).act,
							l = null,
							d = "string" == typeof n;
						return (
							(l = d ? f(e, t) : C(2)(e, t)),
							(0, o.createComponentVNode)(2, i.Flex, {
								children: [
									(0, o.createComponentVNode)(2, i.Flex.Item, { children: l }),
									(0, o.createComponentVNode)(2, i.Flex.Item, {
										align: "right",
										children: (0, o.createComponentVNode)(
											2,
											i.Button.Checkbox,
											{
												checked: d,
												content: "generator",
												onClick: function () {
													return a("modify_particle_value", {
														new_data: {
															name: r,
															value: d
																? [0, 0]
																: {
																		genType: "box",
																		a: n,
																		b: n,
																		rand: "UNIFORM_RAND",
																  },
															type: d ? "vector" : "generator",
														},
													});
												},
											}
										),
									}),
								],
							})
						);
					},
					f = function (e, t) {
						var n = e.value,
							r = e.name,
							a = (0, c.useBackend)(t).act,
							l = "",
							u = "",
							m = "",
							s = "";
						if ((d.logger.log(n), n)) {
							var p = n.match(/\((.*)\)/);
							if (
								4 === (p = (p = p || ["", "", "", ""])[1].split(", ")).length
							) {
								l = p[0].replace(/['"]+/g, "");
								var h = p[1].match(/\((.*)\)/);
								u = h ? h[1] : p[1].replace(/['"]+/g, "");
								var C = p[2].match(/\((.*)\)/);
								(m = C ? C[1] : p[2].replace(/['"]+/g, "")), (s = p[3]);
							}
						}
						var N = (0, c.useLocalState)(t, r + "genType", l),
							V = N[0],
							f = N[1],
							g = (0, c.useLocalState)(t, r + "a", u),
							b = g[0],
							v = g[1],
							k = (0, c.useLocalState)(t, r + "b", m),
							x = k[0],
							w = k[1],
							S = (0, c.useLocalState)(t, r + "rand", s),
							y = S[0],
							B = S[1];
						return (0, o.createComponentVNode)(2, i.Collapsible, {
							title: "Generator Settings - Hit Set to save",
							children: (0, o.createComponentVNode)(2, i.Section, {
								level: 2,
								children: [
									(0, o.createComponentVNode)(2, i.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, i.LabeledList.Item, {
												label: "type",
												children: (0, o.createComponentVNode)(2, i.Tooltip, {
													position: "bottom",
													content:
														"" +
														[
															"num",
															"vector",
															"box",
															"color",
															"circle",
															"sphere",
															"square",
															"cube",
														].join(", "),
													children: (0, o.createComponentVNode)(2, i.Input, {
														value: V,
														onInput: function (e, t) {
															return f(t);
														},
													}),
												}),
											}),
											(0, o.createComponentVNode)(2, i.LabeledList.Item, {
												label: "A",
												children: (0, o.createComponentVNode)(2, i.Input, {
													value: b,
													onInput: function (e, t) {
														return v(t);
													},
												}),
											}),
											(0, o.createComponentVNode)(2, i.LabeledList.Item, {
												label: "B",
												children: (0, o.createComponentVNode)(2, i.Input, {
													value: x,
													onInput: function (e, t) {
														return w(t);
													},
												}),
											}),
											(0, o.createComponentVNode)(2, i.LabeledList.Item, {
												label: "Rand Type",
												children: (0, o.createComponentVNode)(2, i.Tooltip, {
													position: "bottom",
													content:
														"" +
														[
															"UNIFORM_RAND",
															"NORMAL_RAND",
															"LINEAR_RAND",
															"SQUARE_RAND",
														].join(", "),
													children: (0, o.createComponentVNode)(2, i.Input, {
														value: y,
														onInput: function (e, t) {
															return B(t);
														},
													}),
												}),
											}),
										],
									}),
									(0, o.createComponentVNode)(2, i.Button, {
										content: "Set",
										onClick: function () {
											return (
												d.logger.log(V),
												void a("modify_particle_value", {
													new_data: {
														name: r,
														value: { genType: V, a: b, b: x, rand: y },
														type: "generator",
													},
												})
											);
										},
									}),
								],
							}),
						});
					},
					g = function (e, t) {
						var n = e.value,
							r = e.tooltip,
							a = e.name,
							l = (0, c.useBackend)(t).act;
						return (0, o.createComponentVNode)(2, i.Tooltip, {
							position: "bottom",
							content: r,
							children: (0, o.createComponentVNode)(2, i.Input, {
								value: n,
								width: "250px",
								onInput: function (e, t) {
									return l("modify_particle_value", {
										new_data: { name: a, value: t, type: "text" },
									});
								},
							}),
						});
					},
					b = function (e, t) {
						var n = e.value,
							r = e.tooltip,
							a = e.name,
							l = (0, c.useBackend)(t).act,
							d = n
								? Object.keys(n).map(function (e) {
										return n[e];
								  })
								: [];
						return (0, o.createComponentVNode)(2, i.Tooltip, {
							position: "bottom",
							content: r,
							children: (0, o.createComponentVNode)(2, i.Input, {
								value: d.join(","),
								width: "250px",
								onInput: function (e, t) {
									return l("modify_particle_value", {
										new_data: { name: a, value: t, type: "numList" },
									});
								},
							}),
						});
					},
					v = function (e, t) {
						var n = e.value,
							r = e.tooltip,
							a = e.name,
							l = (0, c.useBackend)(t).act,
							d = n
								? Object.keys(n).map(function (e) {
										return n[e];
								  })
								: [];
						return (0, o.createComponentVNode)(2, i.Tooltip, {
							position: "bottom",
							content: r,
							children: (0, o.createComponentVNode)(2, i.Input, {
								value: d.join(","),
								width: "250px",
								onInput: function (e, t) {
									return l("modify_particle_value", {
										new_data: { name: a, value: t, type: "list" },
									});
								},
							}),
						});
					},
					k = function (e, t) {
						var n = e.value,
							r = (e.tooltip, e.name),
							a = (0, c.useBackend)(t).act,
							l = null,
							d = "string" == typeof n && "#" !== n.charAt(0);
						return (
							(l = d
								? f(e, t)
								: (function (e, t) {
										var n = e.value,
											r = e.tooltip,
											a = e.name,
											l = (0, c.useBackend)(t).act;
										return (0, o.createComponentVNode)(2, i.Tooltip, {
											position: "bottom",
											content: r,
											children: [
												(0, o.createComponentVNode)(2, i.Button, {
													icon: "pencil-alt",
													onClick: function () {
														return l("modify_color_value");
													},
												}),
												(0, o.createComponentVNode)(2, i.ColorBox, {
													color: n,
													mr: 0.5,
												}),
												(0, o.createComponentVNode)(2, i.Input, {
													value: n,
													width: "90px",
													onInput: function (e, t) {
														return l("modify_particle_value", {
															new_data: { name: a, value: t, type: "color" },
														});
													},
												}),
											],
										});
								  })(e, t)),
							(0, o.createComponentVNode)(2, i.Flex, {
								children: [
									(0, o.createComponentVNode)(2, i.Flex.Item, { children: l }),
									(0, o.createComponentVNode)(2, i.Flex.Item, {
										align: "right",
										children: (0, o.createComponentVNode)(
											2,
											i.Button.Checkbox,
											{
												checked: d,
												content: "generator",
												onClick: function () {
													return a("modify_particle_value", {
														new_data: {
															name: r,
															value: d
																? "#ffffff"
																: {
																		genType: "color",
																		a: n,
																		b: n,
																		rand: "UNIFORM_RAND",
																  },
															type: d ? "color" : "generator",
														},
													});
												},
											}
										),
									}),
								],
							})
						);
					},
					x = function (e, t) {
						var n = e.value,
							r = (0, c.useBackend)(t).act;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, i.Button, {
									icon: "pencil-alt",
									onClick: function () {
										return r("modify_icon_value");
									},
								}),
								(0, o.createComponentVNode)(2, i.Box, {
									inline: !0,
									ml: 1,
									children: n,
								}),
							],
							4
						);
					},
					w = {
						width: {
							type: "float_nongen",
							tooltip: "Width of particle image in pixels",
						},
						height: {
							type: "float_nongen",
							tooltip: "Height of particle image in pixels",
						},
						count: { type: "int", tooltip: "Maximum particle count" },
						spawning: {
							type: "float_nongen",
							tooltip:
								"Number of particles to spawn per tick (can be fractional)",
						},
						bound1: {
							type: "vector_nongen",
							tooltip: "Minimum particle position in x,y,z space",
						},
						bound2: {
							type: "vector_nongen",
							tooltip: "Maximum particle position in x,y,z space",
						},
						gravity: {
							type: "vector_nongen",
							tooltip:
								"Constant acceleration applied to all particles in this set (pixels per squared tick)",
						},
						gradient: { type: "list", tooltip: "Color gradient used, if any" },
						transform: {
							type: "matrix",
							tooltip:
								"Transform done to all particles, if any (can be higher than 2D)",
						},
						lifespan: {
							type: "float",
							tooltip: "Maximum life of the particle, in ticks",
						},
						fade: {
							type: "float",
							tooltip: "Fade-out time at end of lifespan, in ticks",
						},
						fadein: { type: "float", tooltip: "Fade-in time, in ticks" },
						icon: {
							type: "icon",
							tooltip:
								"Icon to use, if any; no icon means this particle will be a dot",
						},
						icon_state: { type: "list", tooltip: "Icon state to use, if any" },
						color: {
							type: "color",
							tooltip: "Particle color; can be a number if a gradient is used",
						},
						color_change: {
							type: "float",
							tooltip:
								"Color change per tick; only applies if gradient is used",
						},
						position: {
							type: "vector",
							tooltip: "x,y,z position, from center in pixels",
						},
						velocity: { type: "vector", tooltip: "x,y,z velocity, in pixels" },
						scale: {
							type: "vector2",
							tooltip:
								"(2D)\tScale applied to icon, if used; defaults to list(1,1)",
						},
						grow: {
							type: "vector2",
							tooltip: "Change in scale per tick; defaults to list(0,0)",
						},
						rotation: {
							type: "float",
							tooltip:
								"Angle of rotation (clockwise); applies only if using an icon",
						},
						spin: { type: "float", tooltip: "Change in rotation per tick" },
						friction: {
							type: "float",
							tooltip:
								"Amount of velocity to shed (0 to 1) per tick, also applied to acceleration from drift",
						},
						drift: {
							type: "vector",
							tooltip:
								"Added acceleration every tick; e.g. a circle or sphere generator can be applied to produce snow or ember effects",
						},
					},
					S = function (e, t) {
						var n = e.name,
							r =
								(e.value,
								{
									int: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, u, Object.assign({}, e))
									),
									float: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, s, Object.assign({}, e))
									),
									float_nongen: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, p, Object.assign({}, e))
									),
									string: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, g, Object.assign({}, e))
									),
									numlist: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, b, Object.assign({}, e))
									),
									list: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, v, Object.assign({}, e))
									),
									color: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, k, Object.assign({}, e))
									),
									icon: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, x, Object.assign({}, e))
									),
									generator: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, f, Object.assign({}, e))
									),
									matrix: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, m, Object.assign({}, e))
									),
									vector: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, h, Object.assign({}, e))
									),
									vector_nongen: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, N, Object.assign({}, e))
									),
									vector2: (0, o.normalizeProps)(
										(0, o.createComponentVNode)(2, V, Object.assign({}, e))
									),
								});
						return (0, o.createComponentVNode)(2, i.LabeledList.Item, {
							label: n,
							children:
								r[w[n].type] || w[n].type || "Not Found (This is an error)",
						});
					},
					y = function (e, t) {
						var n = (0, c.useBackend)(t),
							r = (n.act, n.data, e.particle);
						return (0, o.createComponentVNode)(2, i.LabeledList, {
							children: Object.keys(w).map(function (e) {
								var t = r[e],
									n = w[e].tooltip || "Oh Bees! Tooltip is missing.";
								return (0,
								o.createComponentVNode)(2, S, { name: e, tooltip: n, value: t }, e);
							}),
						});
					},
					B = function () {
						return (0, o.createComponentVNode)(2, i.Collapsible, {
							title: "Generator Help",
							children: [
								(0, o.createComponentVNode)(2, i.Section, { level: 2 }),
								(0, o.createComponentVNode)(2, i.Section, {
									level: 2,
									children: (0, o.createVNode)(
										1,
										"table",
										null,
										(0, o.createVNode)(
											1,
											"tbody",
											null,
											[
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(
															1,
															"td",
															null,
															"Generator type",
															16
														),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"Result type",
															16
														),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"Description",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "num", 16),
														(0, o.createVNode)(1, "td", null, "num", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random number between A and B.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random vector on a line between A and B.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "box", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random vector within a box whose corners are at A and B.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "color", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"color (string) or color matrix",
															16
														),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"Result type depends on whether A or B are matrices or not. The result is interpolated between A and B; components are not randomized separately.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "circle", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random XY-only vector in a ring between radius A and B, centered at 0,0.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "sphere", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random vector in a spherical shell between radius A and B, centered at 0,0,0.",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "square", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random XY-only vector between squares of sizes A and B. (The length of the square is between A*2 and B*2, centered at 0,0.)",
															16
														),
													],
													4
												),
												(0, o.createVNode)(
													1,
													"tr",
													null,
													[
														(0, o.createVNode)(1, "td", null, "cube", 16),
														(0, o.createVNode)(1, "td", null, "vector", 16),
														(0, o.createVNode)(
															1,
															"td",
															null,
															"A random vector between cubes of sizes A and B. (The length of the cube is between A*2 and B*2, centered at 0,0,0.)",
															16
														),
													],
													4
												),
											],
											4
										),
										2
									),
								}),
							],
						});
					};
				t.Particool = function (e, t) {
					var n = (0, c.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.target_particle || {},
						s = m && Object.keys(m).length > 0,
						p = (0, c.useLocalState)(t, "particleFloatStep", 0.01),
						h = p[0],
						C = p[1],
						N = (0, c.useLocalState)(t, "hidden", !1),
						V = N[0],
						f = N[1];
					return (0, o.createComponentVNode)(2, l.Window, {
						title: "Particool",
						width: 700,
						height: 500,
						children: (0, o.createComponentVNode)(2, l.Window.Content, {
							scrollable: !0,
							children: [
								!!V &&
									(0, o.createComponentVNode)(2, i.NoticeBox, {
										danger: !0,
										children: [
											" ",
											String(Date.now()),
											" ",
											(0, o.createVNode)(1, "br"),
											"Particles? ",
											s.toString(),
											" -",
											(null === u.target_particle).toString(),
											" ",
											(0, o.createVNode)(1, "br"),
											"Json - ",
											JSON.stringify(u.target_particle),
										],
									}),
								(0, o.createComponentVNode)(2, i.Section, {
									title: (0, o.createComponentVNode)(2, i.Box, {
										inline: !0,
										onDblClick: function () {
											return f(!0);
										},
										children: "Particle",
									}),
									buttons: s
										? (0, o.createComponentVNode)(2, i.Button.Confirm, {
												icon: "minus",
												content: "Remove Particle",
												onClick: function () {
													return d("remove_particle");
												},
										  })
										: (0, o.createComponentVNode)(2, i.Button, {
												icon: "plus",
												content: "Add Particle",
												onClick: function () {
													return d("add_particle");
												},
										  }),
									children: [
										(0, o.createComponentVNode)(2, B),
										(0, o.createComponentVNode)(2, i.Box, {
											inline: !0,
											ml: 2,
											mr: 1,
											children: "Float change step:",
										}),
										(0, o.createComponentVNode)(2, i.NumberInput, {
											value: h,
											step: 0.001,
											format: function (e) {
												return (0, r.toFixed)(
													e,
													(0, a.numberOfDecimalDigits)(h)
												);
											},
											width: "70px",
											onChange: function (e, t) {
												return C(t);
											},
										}),
										s
											? (0, o.createComponentVNode)(2, y, { particle: m })
											: (0, o.createComponentVNode)(2, i.Box, {
													children: "No particle",
											  }),
									],
								}),
							],
						}),
					});
				};
			},
			76503: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Header = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(13939);
				t.Header = function (e) {
					var t = e.children,
						n = e.onSortClick,
						c = e.sortDirection,
						i = (function (e, t) {
							if (null == e) return {};
							var n,
								o,
								r = {},
								a = Object.keys(e);
							for (o = 0; o < a.length; o++)
								(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
							return r;
						})(e, ["children", "onSortClick", "sortDirection"]),
						l = c
							? c === a.SortDirection.Asc
								? "sort-alpha-down"
								: "sort-alpha-up"
							: "sort";
					return (0, o.normalizeProps)(
						(0, o.createComponentVNode)(
							2,
							r.Stack,
							Object.assign({ style: { cursor: "pointer" }, onClick: n }, i, {
								children: [
									(0, o.createComponentVNode)(2, r.Stack.Item, { children: t }),
									n &&
										(0, o.createComponentVNode)(2, r.Stack.Item, {
											children: (0, o.createComponentVNode)(2, r.Icon, {
												name: l,
												unselectable: !0,
											}),
										}),
								],
							})
						)
					);
				};
			},
			13939: function (e, t) {
				"use strict";
				var n, o;
				(t.__esModule = !0),
					(t.SortDirection = t.Action = void 0),
					(t.Action = n),
					(function (e) {
						(e.JumpToPlayerLocation = "jump-to-player-loc"),
							(e.OpenPlayerOptions = "open-player-options"),
							(e.PrivateMessagePlayer = "private-message-player");
					})(n || (t.Action = n = {})),
					(t.SortDirection = o),
					(function (e) {
						(e.Asc = "asc"), (e.Desc = "desc");
					})(o || (t.SortDirection = o = {}));
			},
			56740: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PlayerPanel = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(76503),
					l = n(13939),
					d = function (e) {
						return "" + e.value;
					},
					u = function (e, t) {
						return e.localeCompare(t);
					},
					m = function (e) {
						return Number(
							e
								.split(".")
								.map(function (e) {
									return ("00" + e).slice(-3);
								})
								.join("")
						);
					},
					s = function (e) {
						return function (t) {
							return t.row[e];
						};
					},
					p = function (e) {
						return { id: e, sorter: u, template: d, valueSelector: s(e) };
					},
					h = [
						Object.assign({}, p("ckey"), {
							name: "CKey",
							template: function (e) {
								var t = e.act,
									n = e.row,
									r = e.value;
								return (0, o.createComponentVNode)(2, a.Stack, {
									children: [
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											grow: 1,
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: function () {
													return t(l.Action.OpenPlayerOptions, {
														ckey: r,
														mobRef: n.mobRef,
													});
												},
												children: r,
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Button, {
												icon: "envelope",
												color: "bad",
												onClick: function () {
													return t(l.Action.PrivateMessagePlayer, {
														ckey: r,
														mobRef: n.mobRef,
													});
												},
											}),
										}),
									],
								});
							},
						}),
						Object.assign({}, p("name"), { name: "Name" }),
						Object.assign({}, p("realName"), { name: "Real Name" }),
						Object.assign({}, p("assignedRole"), { name: "Assigned Role" }),
						Object.assign({}, p("specialRole"), { name: "Special Role" }),
						Object.assign({}, p("playerType"), { name: "Player Type" }),
						Object.assign({}, p("computerId"), { name: "CID" }),
						Object.assign({}, p("ip"), {
							name: "IP",
							sorter: function (e, t) {
								return m(e) - m(t);
							},
						}),
						Object.assign({}, p("joined"), {
							name: "Join Date",
							sorter: function (e, t) {
								var n = e.split("-").map(parseFloat),
									o = t.split("-").map(parseFloat);
								return n > o ? 1 : n < o ? -1 : 0;
							},
						}),
						Object.assign({}, p("playerLocation"), {
							name: "Player Location",
							template: function (e) {
								var t = e.act,
									n = e.row,
									r = e.value;
								return (0, o.createComponentVNode)(2, a.Button, {
									onClick: function () {
										return t(l.Action.JumpToPlayerLocation, {
											ckey: n.ckey,
											mobRef: n.mobRef,
										});
									},
									children: r,
								});
							},
						}),
						Object.assign({}, p("ping"), {
							name: "Ping",
							sorter: function (e, t) {
								return e - t;
							},
						}),
					];
				t.PlayerPanel = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data.players,
						m = (0, r.useLocalState)(t, "search", ""),
						s = m[0],
						p = m[1],
						C = (0, r.useLocalState)(t, "sort", null),
						N = C[0],
						V = C[1],
						f = Object.keys(u).map(function (e) {
							return u[e];
						}),
						g = f.reduce(function (e, t) {
							return (
								(e[t.ckey] = h.reduce(function (e, n) {
									var o = n.id,
										r = n.valueSelector;
									return (e[o] = r({ column: n, row: t })), e;
								}, {})),
								e
							);
						}, {});
					if (s) {
						var b = s.toLowerCase();
						f = f.filter(function (e) {
							return Object.values(g[e.ckey]).some(function (e) {
								return "string" == typeof e && e.toLowerCase().includes(b);
							});
						});
					}
					if (N) {
						var v = h.find(function (e) {
							return e.id === N.id;
						});
						v &&
							f.sort(function (e, t) {
								var n = v.sorter(g[e.ckey][v.id], g[t.ckey][v.id]);
								return N.dir === l.SortDirection.Desc && (n *= -1), n;
							});
					}
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 1100,
						height: 640,
						title: "Player Panel",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: [
								(0, o.createComponentVNode)(2, a.Input, {
									autoFocus: !0,
									mb: 1,
									placeholder: "Search...",
									onInput: function (e, t) {
										return p(t);
									},
									value: s,
								}),
								(0, o.createComponentVNode)(2, a.Table, {
									children: [
										(0, o.createComponentVNode)(2, a.Table.Row, {
											header: !0,
											children: h.map(function (e) {
												var t = (null == N ? void 0 : N.id) === e.id ? N : null;
												return (0, o.createComponentVNode)(
													2,
													a.Table.Cell,
													{
														children: (0, o.createComponentVNode)(2, i.Header, {
															onSortClick: e.sorter
																? function () {
																		return V({
																			dir:
																				null != t &&
																				t.dir &&
																				t.dir === l.SortDirection.Asc
																					? l.SortDirection.Desc
																					: l.SortDirection.Asc,
																			id: e.id,
																		});
																  }
																: null,
															sortDirection: null == t ? void 0 : t.dir,
															children: e.name,
														}),
													},
													e.field
												);
											}),
										}),
										f.map(function (e) {
											var t = e.ckey;
											return (0, o.createComponentVNode)(
												2,
												a.Table.Row,
												{
													children: h.map(function (n) {
														var r = n.id,
															c = n.template;
														return (0,
														o.createComponentVNode)(2, a.Table.Cell, { children: c({ act: d, column: n, row: e, value: g[t][r] }) }, r);
													}),
												},
												t
											);
										}),
									],
								}),
							],
						}),
					});
				};
			},
			43307: function () {},
			82564: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PortablePump = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(34227);
				t.PortablePump = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.connected,
						m = d.on,
						s = d.direction_out,
						p = d.holding,
						h = d.pressure,
						C = d.targetPressure,
						N = d.maxPressure,
						V = d.minRelease,
						f = d.maxRelease;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 305,
						height: 365,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, i.PortableBasicInfo, {
									connected: u,
									pressure: h,
									maxPressure: N,
									children: [
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Pump Power",
													children: (0, o.createComponentVNode)(2, a.Button, {
														content: m ? "On" : "Off",
														color: m ? "average" : "default",
														onClick: function () {
															return l("toggle-power");
														},
													}),
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Target Pressure",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return l("set-pressure", { targetPressure: V });
															},
															content: "Min",
														}),
														(0, o.createComponentVNode)(2, a.NumberInput, {
															animated: !0,
															width: "7em",
															value: C,
															minValue: V,
															maxValue: f,
															onChange: function (e, t) {
																return l("set-pressure", { targetPressure: t });
															},
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return l("set-pressure", { targetPressure: f });
															},
															content: "Max",
														}),
													],
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Pump Direction",
													children: (0, o.createComponentVNode)(2, a.Button, {
														content: s ? "Out" : "In",
														color: s ? "yellow" : "blue",
														onClick: function () {
															return l("toggle-pump");
														},
													}),
												}),
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, i.PortableHoldingTank, {
									holding: p,
									onEjectTank: function () {
										return l("eject-tank");
									},
								}),
							],
						}),
					});
				};
			},
			24901: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PortableScrubber = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(34227);
				t.PortableScrubber = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.connected,
						m = d.on,
						s = d.holding,
						p = d.pressure,
						h = d.inletFlow,
						C = d.maxPressure,
						N = d.minFlow,
						V = d.maxFlow;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 305,
						height: 340,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, i.PortableBasicInfo, {
									connected: u,
									pressure: p,
									maxPressure: C,
									children: [
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Scrubber Power",
													children: (0, o.createComponentVNode)(2, a.Button, {
														content: m ? "On" : "Off",
														color: m ? "average" : "default",
														onClick: function () {
															return l("toggle-power");
														},
													}),
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Inlet Flow",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return l("set-inlet-flow", { inletFlow: N });
															},
															content: "Min",
														}),
														(0, o.createComponentVNode)(2, a.NumberInput, {
															animated: !0,
															width: "7em",
															value: h,
															minValue: N,
															maxValue: V,
															onChange: function (e, t) {
																return l("set-inlet-flow", { inletFlow: t });
															},
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return l("set-inlet-flow", { inletFlow: V });
															},
															content: "Max",
														}),
													],
												}),
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, i.PortableHoldingTank, {
									holding: s,
									onEjectTank: function () {
										return l("eject-tank");
									},
								}),
							],
						}),
					});
				};
			},
			19065: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.PowerMonitorApcTableRows =
						t.PowerMonitorApcTableHeader =
						t.PowerMonitorApcGlobal =
							void 0);
				var o,
					r,
					a = n(39812),
					c = n(71494),
					i = n(74814),
					l = n(58083),
					d =
						(((o = {})[0] = "Off"),
						(o[1] = (0, a.createComponentVNode)(2, i.Box, {
							inline: !0,
							children: [
								"Off",
								" ",
								(0, a.createComponentVNode)(2, i.Box, {
									inline: !0,
									color: "grey",
									children: "(Auto)",
								}),
							],
						})),
						(o[2] = "On"),
						(o[3] = (0, a.createComponentVNode)(2, i.Box, {
							inline: !0,
							children: [
								"On",
								" ",
								(0, a.createComponentVNode)(2, i.Box, {
									inline: !0,
									color: "grey",
									children: "(Auto)",
								}),
							],
						})),
						o),
					u =
						(((r = {})[0] = "Discharging"),
						(r[1] = "Charging"),
						(r[2] = "Charged"),
						r);
				t.PowerMonitorApcGlobal = function (e, t) {
					var n = (0, c.useBackend)(t).data,
						o = n.history.map(function (e) {
							return e[0];
						}),
						r = o.map(function (e, t) {
							return [t, e];
						}),
						d = n.history.map(function (e) {
							return e[1];
						}),
						u = d.map(function (e, t) {
							return [t, e];
						}),
						m = Math.max.apply(Math, o.concat(d));
					return (0, a.createComponentVNode)(2, i.Stack, {
						fill: !0,
						children: [
							(0, a.createComponentVNode)(2, i.Stack.Item, {
								width: "50%",
								children: [
									(0, a.createComponentVNode)(2, i.LabeledList, {
										children: (0, a.createComponentVNode)(
											2,
											i.LabeledList.Item,
											{
												label: "Total Power",
												children: (0, l.formatPower)(n.available),
											}
										),
									}),
									(0, a.createComponentVNode)(2, i.Chart.Line, {
										mt: "5px",
										height: "5em",
										data: r,
										rangeX: [0, r.length - 1],
										rangeY: [0, m],
										strokeColor: "rgba(1, 184, 170, 1)",
										fillColor: "rgba(1, 184, 170, 0.25)",
									}),
								],
							}),
							(0, a.createComponentVNode)(2, i.Stack.Item, {
								width: "50%",
								children: [
									(0, a.createComponentVNode)(2, i.LabeledList, {
										children: (0, a.createComponentVNode)(
											2,
											i.LabeledList.Item,
											{
												label: "Total Load",
												children: (0, l.formatPower)(n.load),
											}
										),
									}),
									(0, a.createComponentVNode)(2, i.Chart.Line, {
										mt: "5px",
										height: "5em",
										data: u,
										rangeX: [0, u.length - 1],
										rangeY: [0, m],
										strokeColor: "rgba(1, 184, 170, 1)",
										fillColor: "rgba(1, 184, 170, 0.25)",
									}),
								],
							}),
						],
					});
				};
				t.PowerMonitorApcTableHeader = function () {
					return (0, a.createFragment)(
						[
							(0, a.createComponentVNode)(2, i.Table.Cell, {
								header: !0,
								children: "Area",
							}),
							(0, a.createComponentVNode)(2, i.Tooltip, {
								content: "Equipment",
								children: (0, a.createComponentVNode)(2, i.Table.Cell, {
									header: !0,
									collapsing: !0,
									children: "Eqp.",
								}),
							}),
							(0, a.createComponentVNode)(2, i.Tooltip, {
								content: "Lighting",
								children: (0, a.createComponentVNode)(2, i.Table.Cell, {
									header: !0,
									collapsing: !0,
									children: "Lgt.",
								}),
							}),
							(0, a.createComponentVNode)(2, i.Tooltip, {
								content: "Environment",
								children: (0, a.createComponentVNode)(2, i.Table.Cell, {
									header: !0,
									collapsing: !0,
									children: "Env.",
								}),
							}),
							(0, a.createComponentVNode)(2, i.Table.Cell, {
								header: !0,
								textAlign: "right",
								children: "Load",
							}),
							(0, a.createComponentVNode)(2, i.Table.Cell, {
								header: !0,
								textAlign: "right",
								children: "Cell Charge",
							}),
							(0, a.createComponentVNode)(2, i.Table.Cell, {
								header: !0,
								children: "Cell State",
							}),
						],
						4
					);
				};
				t.PowerMonitorApcTableRows = function (e, t) {
					var n = e.search,
						o = (0, c.useBackend)(t).data;
					return (0, a.createFragment)(
						o.apcs.map(function (e) {
							return (0,
							a.createComponentVNode)(2, m, { apc: e, search: n }, e[0]);
						}),
						0
					);
				};
				var m = function (e, t) {
						var n,
							o = e.apc,
							r = e.search,
							d = o[0],
							m = o[1],
							p = o[2],
							h = o[3],
							C = o[4],
							N = o[5],
							V = o[6],
							f =
								null != (n = (0, c.useBackend)(t).data.apcNames[d]) ? n : "N/A";
						return r && !f.toLowerCase().includes(r.toLowerCase())
							? null
							: (0, a.createComponentVNode)(2, i.Table.Row, {
									children: [
										(0, a.createComponentVNode)(2, i.Table.Cell, {
											children: f,
										}),
										(0, a.createComponentVNode)(2, s, { state: m }),
										(0, a.createComponentVNode)(2, s, { state: p }),
										(0, a.createComponentVNode)(2, s, { state: h }),
										(0, a.createComponentVNode)(2, i.Table.Cell, {
											textAlign: "right",
											nowrap: !0,
											children: (0, l.formatPower)(C),
										}),
										"number" == typeof N
											? (0, a.createFragment)(
													[
														(0, a.createComponentVNode)(2, i.Table.Cell, {
															textAlign: "right",
															nowrap: !0,
															children: [N, "%"],
														}),
														(0, a.createComponentVNode)(2, i.Table.Cell, {
															color:
																V > 0 ? (1 === V ? "average" : "good") : "bad",
															nowrap: !0,
															children: u[V],
														}),
													],
													4
											  )
											: (0, a.createFragment)(
													[
														(0, a.createComponentVNode)(2, i.Table.Cell),
														(0, a.createComponentVNode)(2, i.Table.Cell, {
															color: "bad",
															children: "N/A",
														}),
													],
													4
											  ),
									],
							  });
					},
					s = function (e) {
						var t = e.state;
						return (0, a.createComponentVNode)(2, i.Table.Cell, {
							nowrap: !0,
							color: t >= 2 ? "good" : "bad",
							children: d[t],
						});
					};
			},
			35492: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.PowerMonitorSmesTableRows =
						t.PowerMonitorSmesTableHeader =
						t.PowerMonitorSmesGlobal =
							void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083);
				t.PowerMonitorSmesGlobal = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						i = n.history.map(function (e) {
							return e[0];
						}),
						l = i.map(function (e, t) {
							return [t, e];
						}),
						d = n.history.map(function (e) {
							return e[1];
						}),
						u = d.map(function (e, t) {
							return [t, e];
						}),
						m = Math.max.apply(Math, i.concat(d));
					return (0, o.createComponentVNode)(2, a.Stack, {
						fill: !0,
						children: [
							(0, o.createComponentVNode)(2, a.Stack.Item, {
								width: "50%",
								children: [
									(0, o.createComponentVNode)(2, a.LabeledList, {
										children: (0, o.createComponentVNode)(
											2,
											a.LabeledList.Item,
											{
												label: "Engine Output",
												children: (0, c.formatPower)(n.available),
											}
										),
									}),
									(0, o.createComponentVNode)(2, a.Chart.Line, {
										mt: "5px",
										height: "5em",
										data: l,
										rangeX: [0, l.length - 1],
										rangeY: [0, m],
										strokeColor: "rgba(1, 184, 170, 1)",
										fillColor: "rgba(1, 184, 170, 0.25)",
									}),
								],
							}),
							(0, o.createComponentVNode)(2, a.Stack.Item, {
								width: "50%",
								children: [
									(0, o.createComponentVNode)(2, a.LabeledList, {
										children: (0, o.createComponentVNode)(
											2,
											a.LabeledList.Item,
											{
												label: "SMES/PTL Draw",
												children: (0, c.formatPower)(n.load),
											}
										),
									}),
									(0, o.createComponentVNode)(2, a.Chart.Line, {
										mt: "5px",
										height: "5em",
										data: u,
										rangeX: [0, u.length - 1],
										rangeY: [0, m],
										strokeColor: "rgba(1, 184, 170, 1)",
										fillColor: "rgba(1, 184, 170, 0.25)",
									}),
								],
							}),
						],
					});
				};
				t.PowerMonitorSmesTableHeader = function (e, t) {
					return (0, o.createFragment)(
						[
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Area",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Stored Power",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Charging",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Input",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Output",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Active",
							}),
							(0, o.createComponentVNode)(2, a.Table.Cell, {
								header: !0,
								children: "Load",
							}),
						],
						4
					);
				};
				t.PowerMonitorSmesTableRows = function (e, t) {
					var n = e.search,
						a = (0, r.useBackend)(t).data;
					return (0, o.createFragment)(
						a.units.map(function (e) {
							return (0,
							o.createComponentVNode)(2, i, { unit: e, search: n }, e[0]);
						}),
						0
					);
				};
				var i = function (e, t) {
					var n,
						i = e.unit,
						l = e.search,
						d = i[0],
						u = i[1],
						m = i[2],
						s = i[3],
						p = i[4],
						h = i[5],
						C = i[6],
						N =
							null != (n = (0, r.useBackend)(t).data.unitNames[d]) ? n : "N/A";
					return l && !N.toLowerCase().includes(l.toLowerCase())
						? null
						: (0, o.createComponentVNode)(2, a.Table.Row, {
								children: [
									(0, o.createComponentVNode)(2, a.Table.Cell, { children: N }),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										children: [u, "%"],
									}),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										color: m ? "good" : "bad",
										children: m ? "Yes" : "No",
									}),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										children: (0, c.formatPower)(s),
									}),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										children: (0, c.formatPower)(p),
									}),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										color: h ? "good" : "bad",
										children: h ? "Yes" : "No",
									}),
									(0, o.createComponentVNode)(2, a.Table.Cell, {
										children: C ? (0, c.formatPower)(C) : "N/A",
									}),
								],
						  });
				};
			},
			6487: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PowerMonitor = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(19065),
					l = n(35492),
					d = n(16253);
				t.PowerMonitor = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						u = (0, r.useSharedState)(t, "search", ""),
						m = u[0],
						s = u[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 700,
						height: 700,
						theme: "retro-dark",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										children: (0, o.createComponentVNode)(2, a.Section, {
											children: [
												(0, d.isDataForApc)(n) &&
													(0, o.createComponentVNode)(
														2,
														i.PowerMonitorApcGlobal
													),
												(0, d.isDataForSmes)(n) &&
													(0, o.createComponentVNode)(
														2,
														l.PowerMonitorSmesGlobal
													),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										children: (0, o.createComponentVNode)(2, a.Section, {
											children: (0, o.createComponentVNode)(2, a.LabeledList, {
												children: (0, o.createComponentVNode)(
													2,
													a.LabeledList.Item,
													{
														label: "Search",
														children: (0, o.createComponentVNode)(2, a.Input, {
															value: m,
															onInput: function (e, t) {
																return s(t);
															},
														}),
													}
												),
											}),
										}),
									}),
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, a.Section, {
											fill: !0,
											scrollable: !0,
											children: (0, o.createComponentVNode)(2, a.Table, {
												children: [
													(0, o.createComponentVNode)(2, a.Table.Row, {
														header: !0,
														children:
															(0, d.isDataForApc)(n) &&
															(0, o.createComponentVNode)(
																2,
																i.PowerMonitorApcTableHeader
															),
													}),
													(0, d.isDataForApc)(n) &&
														(0, o.createComponentVNode)(
															2,
															i.PowerMonitorApcTableRows,
															{ search: m }
														),
													(0, o.createComponentVNode)(2, a.Table.Row, {
														header: !0,
														children:
															(0, d.isDataForSmes)(n) &&
															(0, o.createComponentVNode)(
																2,
																l.PowerMonitorSmesTableHeader
															),
													}),
													(0, d.isDataForSmes)(n) &&
														(0, o.createComponentVNode)(
															2,
															l.PowerMonitorSmesTableRows,
															{ search: m }
														),
												],
											}),
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			16253: function (e, t) {
				"use strict";
				var n;
				(t.__esModule = !0),
					(t.isDataForSmes = t.isDataForApc = t.PowerMonitorType = void 0),
					(t.PowerMonitorType = n),
					(function (e) {
						(e.Apc = "apc"), (e.Smes = "smes");
					})(n || (t.PowerMonitorType = n = {}));
				t.isDataForApc = function (e) {
					return e.type === n.Apc;
				};
				t.isDataForSmes = function (e) {
					return e.type === n.Smes;
				};
			},
			7359: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.PowerTransmissionLaser = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952);
				t.PowerTransmissionLaser = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						m = n.lifetimeEarnings,
						s = n.name,
						p = void 0 === s ? "Power Transmission Laser" : s;
					return (0, o.createComponentVNode)(2, i.Window, {
						title: p,
						width: "310",
						height: "485",
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, l),
								(0, o.createComponentVNode)(2, d),
								(0, o.createComponentVNode)(2, u),
								(0, o.createComponentVNode)(2, a.NoticeBox, {
									success: !0,
									children: ["Earned Credits : ", (0, c.formatMoney)(m)],
								}),
							],
						}),
					});
				};
				var l = function (e, t) {
						var n = (0, r.useBackend)(t).data,
							i = n.capacity,
							l = n.charge,
							d = n.gridLoad,
							u = n.totalGridPower;
						return (0, o.createComponentVNode)(2, a.Section, {
							title: "Status",
							children: [
								(0, o.createComponentVNode)(2, a.LabeledList, {
									children: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
										label: "Reserve Power",
										children: (0, c.formatSiUnit)(l, 0, "J"),
									}),
								}),
								(0, o.createComponentVNode)(2, a.ProgressBar, {
									mt: "0.5em",
									mb: "0.5em",
									ranges: {
										good: [0.8, Infinity],
										average: [0.5, 0.8],
										bad: [-Infinity, 0.5],
									},
									value: l / i,
								}),
								(0, o.createComponentVNode)(2, a.LabeledList, {
									children: (0, o.createComponentVNode)(2, a.LabeledList.Item, {
										label: "Grid Saturation",
									}),
								}),
								(0, o.createComponentVNode)(2, a.ProgressBar, {
									mt: "0.5em",
									ranges: {
										good: [0.8, Infinity],
										average: [0.5, 0.8],
										bad: [-Infinity, 0.5],
									},
									value: d / u,
								}),
							],
						});
					},
					d = function (e, t) {
						var n = (0, r.useBackend)(t),
							i = n.act,
							l = n.data,
							d = l.isChargingEnabled,
							u = l.excessPower,
							m = l.isCharging,
							s = l.inputLevel,
							p = l.inputNumber,
							h = l.inputMultiplier;
						return (0, o.createComponentVNode)(2, a.Section, {
							title: "Input Controls",
							children: [
								(0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Input Circuit",
											buttons: (0, o.createComponentVNode)(2, a.Button, {
												icon: "power-off",
												content: d ? "Enabled" : "Disabled",
												color: d ? "green" : "red",
												onClick: function () {
													return i("toggleInput");
												},
											}),
											children: (0, o.createComponentVNode)(2, a.Box, {
												color: (m ? "good" : d && "average") || "bad",
												children: (m ? "Online" : d && "Idle") || "Offline",
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Input Level",
											children: (0, c.formatPower)(s),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Optimal",
											children: (0, c.formatPower)(u),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									mt: "0.5em",
									children: [
										(0, o.createComponentVNode)(2, a.Knob, {
											mr: "0.5em",
											animated: !0,
											size: 1.25,
											inline: !0,
											step: 5,
											stepPixelSize: 2,
											minValue: 0,
											maxValue: 999,
											value: p,
											onDrag: function (e, t) {
												return i("setInput", { setInput: t });
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "W",
											selected: 1 === h,
											onClick: function () {
												return i("inputW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "kW",
											selected: h === Math.pow(10, 3),
											onClick: function () {
												return i("inputkW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "MW",
											selected: h === Math.pow(10, 6),
											onClick: function () {
												return i("inputMW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "GW",
											selected: h === Math.pow(10, 9),
											onClick: function () {
												return i("inputGW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "TW",
											selected: h === Math.pow(10, 12),
											onClick: function () {
												return i("inputTW");
											},
										}),
									],
								}),
							],
						});
					},
					u = function (e, t) {
						var n = (0, r.useBackend)(t),
							i = n.act,
							l = n.data,
							d = l.isEmagged,
							u = l.isFiring,
							m = l.isLaserEnabled,
							s = l.outputLevel,
							p = l.outputNumber,
							h = l.outputMultiplier;
						return (0, o.createComponentVNode)(2, a.Section, {
							title: "Output Controls",
							children: [
								(0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Laser Circuit",
											buttons: (0, o.createComponentVNode)(2, a.Button, {
												icon: "power-off",
												content: m ? "Enabled" : "Disabled",
												color: m ? "green" : "red",
												onClick: function () {
													return i("toggleOutput");
												},
											}),
											children: (0, o.createComponentVNode)(2, a.Box, {
												color: (u ? "good" : m && "average") || "bad",
												children: (u ? "Online" : m && "Idle") || "Offline",
											}),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Output Level",
											children:
												p < 0
													? "-" + (0, c.formatPower)(Math.abs(s))
													: (0, c.formatPower)(s),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Box, {
									mt: "0.5em",
									children: [
										(0, o.createComponentVNode)(2, a.Knob, {
											mr: "0.5em",
											size: 1.25,
											animated: !0,
											bipolar: d,
											inline: !0,
											step: 5,
											stepPixelSize: 2,
											minValue: d ? -999 : 0,
											maxValue: 999,
											ranges: { bad: [-Infinity, -1] },
											value: p,
											onDrag: function (e, t) {
												return i("setOutput", { setOutput: t });
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "MW",
											selected: h === Math.pow(10, 6),
											onClick: function () {
												return i("outputMW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "GW",
											selected: h === Math.pow(10, 9),
											onClick: function () {
												return i("outputGW");
											},
										}),
										(0, o.createComponentVNode)(2, a.Button, {
											content: "TW",
											selected: h === Math.pow(10, 12),
											onClick: function () {
												return i("outputTW");
											},
										}),
									],
								}),
							],
						});
					};
			},
			9253: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Precipitation = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(23827);
				t.Precipitation = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.probability,
						m = d.cooldown,
						s = d.poolDepth,
						p = d.containerData;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Precipitation",
						width: 300,
						height: 425,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, a.Section, {
								title: (0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									children: "Precipitation",
								}),
								children: [
									(0, o.createComponentVNode)(2, a.Tooltip, {
										content: "Cooldown for how fast ATOMs can be rained on.",
										children: (0, o.createComponentVNode)(2, a.Box, {
											m: 1,
											children: [
												"Cooldown",
												(0, o.createComponentVNode)(2, a.NumberInput, {
													value: m,
													width: 4,
													minValue: 0,
													onChange: function (e, t) {
														return l("set-cooldown", { value: t });
													},
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Tooltip, {
										content: "Chance of being rained on entering turf.",
										children: (0, o.createComponentVNode)(2, a.Box, {
											m: 1,
											children: [
												"Probability",
												(0, o.createComponentVNode)(2, a.NumberInput, {
													value: u,
													width: 4,
													minValue: 0,
													maxValue: 100,
													onChange: function (e, t) {
														return l("set-probability", { value: t });
													},
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Tooltip, {
										content:
											"Maximum fluid size/depth on the tile. (0 means no pooling will form)",
										children: (0, o.createComponentVNode)(2, a.Box, {
											m: 1,
											children: [
												"Maximum Pool Depth",
												(0, o.createComponentVNode)(2, a.NumberInput, {
													value: s,
													width: 4,
													minValue: 0,
													maxValue: 100,
													onChange: function (e, t) {
														return l("set-poolDepth", { value: t });
													},
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Section, {
										title: "Reagents",
										children: [
											(0, o.createComponentVNode)(2, i.ReagentList, {
												container: p,
												renderButtons: function (e) {
													return (0, o.createFragment)(
														[
															(0, o.createComponentVNode)(2, a.Button, {
																px: 0.75,
																mr: 1.5,
																icon: "filter",
																color: "red",
																title: "Isolate",
																onClick: function () {
																	return l("isolate", {
																		container_id: p.id,
																		reagent_id: e.id,
																	});
																},
															}),
															(0, o.createComponentVNode)(2, a.Button, {
																px: 0.75,
																icon: "times",
																color: "red",
																title: "Flush",
																onClick: function () {
																	return l("flush_reagent", {
																		container_id: p.id,
																		reagent_id: e.id,
																	});
																},
															}),
														],
														4
													);
												},
											}),
											(0, o.createComponentVNode)(2, a.Box, {
												m: 1,
												children: [
													(0, o.createComponentVNode)(2, a.Button, {
														ml: 1,
														onClick: function () {
															return l("add_reagents");
														},
														children: "Add Reagents",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														ml: 1,
														onClick: function () {
															return l("flush");
														},
														children: "Clear Reagents",
													}),
												],
											}),
										],
									}),
									(0, o.createComponentVNode)(2, a.Section, {
										title: "Particle",
										children: (0, o.createComponentVNode)(2, a.Box, {
											m: 1,
											children: (0, o.createComponentVNode)(2, a.Button, {
												fluid: !0,
												onClick: function () {
													return l("particle_editor");
												},
												children: "Edit Particle",
											}),
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			31979: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Pressurizer = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(34227),
					l = 0,
					d = 1,
					u = 2,
					m = {
						good: [1, Infinity],
						average: [0.75, 1],
						bad: [-Infinity, 0.75],
					};
				t.Pressurizer = function (e, t) {
					var n = (0, r.useBackend)(t),
						s = n.act,
						p = n.data,
						h = p.airSafe,
						C = p.blastArmed,
						N = p.blastDelay,
						V = p.connected,
						f = p.emagged,
						g = p.fanState,
						b = p.materialsCount,
						v = p.materialsProgress,
						k = p.maxArmDelay,
						x = p.maxPressure,
						w = p.maxRelease,
						S = p.minArmDelay,
						y = p.minBlastPercent,
						B = p.minRelease,
						I = p.pressure,
						T = p.processRate,
						L = p.releasePressure,
						_ = function (e) {
							s("set-pressure", { releasePressure: e });
						},
						P = function (e) {
							s("set-blast-delay", { blastDelay: e });
						},
						A = function (e) {
							s("set-process_rate", { processRate: e });
						},
						M = function (e) {
							s("fan", { fanState: e });
						},
						R = I < x * y;
					return (0, o.createComponentVNode)(2, c.Window, {
						theme: f ? "syndicate" : "ntos",
						width: 390,
						height: 380,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, i.PortableBasicInfo, {
									connected: V,
									pressure: I,
									maxPressure: x,
									children: [
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Emergency Blast Release",
													children: (0, o.createComponentVNode)(2, a.Button, {
														fluid: !0,
														textAlign: "center",
														icon: "circle",
														content: R
															? "Insufficient Pressure"
															: h
															? C
																? "Armed"
																: "Ready"
															: "AIR UNSAFE - Locked",
														disabled: R || !h,
														color: C ? "bad" : "average",
														onClick: function () {
															s("arm");
														},
													}),
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Delay",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return P(S);
															},
															children: "Min",
														}),
														(0, o.createComponentVNode)(2, a.NumberInput, {
															animated: !0,
															width: "7em",
															value: N,
															minValue: S,
															maxValue: k,
															onChange: function (e, t) {
																return P(t);
															},
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return P(k);
															},
															children: "Max",
														}),
													],
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Fan Status",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															color: g === l ? "bad" : "default",
															onClick: function () {
																return M(l);
															},
															children: "Off",
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															selected: g === d,
															onClick: function () {
																return M(d);
															},
															children: "In",
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															selected: g === u,
															onClick: function () {
																return M(u);
															},
															children: "Out",
														}),
													],
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Release Pressure",
													children: [
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return _(B);
															},
															children: "Min",
														}),
														(0, o.createComponentVNode)(2, a.NumberInput, {
															animated: !0,
															width: "7em",
															value: L,
															minValue: B,
															maxValue: w,
															onChange: function (e, t) {
																return _(t);
															},
														}),
														(0, o.createComponentVNode)(2, a.Button, {
															onClick: function () {
																return _(w);
															},
															children: "Max",
														}),
													],
												}),
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Material Processing",
									buttons: (0, o.createComponentVNode)(2, a.Button, {
										icon: "eject",
										disabled: 0 === b,
										onClick: function () {
											s("eject-materials");
										},
										children: "Eject",
									}),
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Speed",
												children: [
													(0, o.createComponentVNode)(2, a.Button, {
														selected: 1 === T,
														onClick: function () {
															return A(1);
														},
														children: "1",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														selected: 2 === T,
														onClick: function () {
															return A(2);
														},
														children: "2",
													}),
													(0, o.createComponentVNode)(2, a.Button, {
														selected: 3 === T,
														onClick: function () {
															return A(3);
														},
														children: "3",
													}),
													!!f &&
														(0, o.createFragment)(
															[
																(0, o.createComponentVNode)(2, a.Button, {
																	selected: 4 === T,
																	onClick: function () {
																		return A(4);
																	},
																	children: "4",
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	selected: 5 === T,
																	onClick: function () {
																		return A(5);
																	},
																	children: "5",
																}),
															],
															4
														),
												],
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Progress",
												children: (0, o.createComponentVNode)(
													2,
													a.ProgressBar,
													{ ranges: m, value: v / 100 }
												),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
			},
			61272: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Radio = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952),
					l = n(38913);
				t.Radio = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.data,
						u = n.act,
						m = function (e, t) {
							u("set-frequency", { value: e, finish: t });
						},
						s = function (e, t) {
							u("set-code", { value: e, finish: t });
						};
					return (0, o.createComponentVNode)(2, i.Window, {
						width: "280",
						height: "400",
						title: d.name,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										children: (0, o.createComponentVNode)(2, a.Section, {
											children: (0, o.createComponentVNode)(2, a.LabeledList, {
												children: [
													!!d.hasMicrophone &&
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															label: "Microphone",
															children: (0, o.createComponentVNode)(
																2,
																a.Button.Checkbox,
																{
																	checked: d.broadcasting,
																	onClick: function () {
																		return u("toggle-broadcasting");
																	},
																	children: d.broadcasting
																		? "Engaged"
																		: "Disengaged",
																}
															),
														}),
													(0, o.createComponentVNode)(2, a.LabeledList.Item, {
														label: "Speaker",
														children: (0, o.createComponentVNode)(
															2,
															a.Button.Checkbox,
															{
																checked: d.listening,
																onClick: function () {
																	return u("toggle-listening");
																},
																children: d.listening
																	? "Engaged"
																	: "Disengaged",
															}
														),
													}),
													(0, o.createComponentVNode)(2, a.LabeledList.Item, {
														label: "Frequency",
														children: (0, o.createComponentVNode)(2, a.Stack, {
															align: "center",
															children: [
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children:
																		!d.lockedFrequency &&
																		(0, o.createComponentVNode)(2, a.Knob, {
																			animated: !0,
																			value: d.frequency,
																			minValue: 1441,
																			maxValue: 1489,
																			stepPixelSize: 2,
																			format: c.formatFrequency,
																			onDrag: function (e, t) {
																				return m(t, !1);
																			},
																			onChange: function (e, t) {
																				return m(t, !0);
																			},
																		}),
																}),
																(0, o.createComponentVNode)(2, a.Stack.Item, {
																	children: (0, o.createComponentVNode)(
																		2,
																		a.AnimatedNumber,
																		{
																			value: d.frequency,
																			format: c.formatFrequency,
																		}
																	),
																}),
															],
														}),
													}),
													!!d.code &&
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															label: "Code",
															children: (0, o.createComponentVNode)(
																2,
																a.Stack,
																{
																	align: "center",
																	children: [
																		(0, o.createComponentVNode)(
																			2,
																			a.Stack.Item,
																			{
																				children: (0, o.createComponentVNode)(
																					2,
																					a.Knob,
																					{
																						animated: !0,
																						value: d.code,
																						minValue: 1,
																						maxValue: 100,
																						stepPixelSize: 1,
																						onDrag: function (e, t) {
																							return s(t, !1);
																						},
																						onChange: function (e, t) {
																							return s(t, !0);
																						},
																					}
																				),
																			}
																		),
																		(0, o.createComponentVNode)(
																			2,
																			a.Stack.Item,
																			{
																				children: (0, o.createComponentVNode)(
																					2,
																					a.AnimatedNumber,
																					{ value: d.code }
																				),
																			}
																		),
																	],
																}
															),
														}),
													!!d.sendButton &&
														(0, o.createComponentVNode)(2, a.LabeledList.Item, {
															children: (0, o.createComponentVNode)(
																2,
																a.Button,
																{
																	align: "center",
																	onClick: function () {
																		u("send");
																	},
																	children: "Send signal",
																}
															),
														}),
												],
											}),
										}),
									}),
									d.secureFrequencies.length > 0 &&
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											grow: 1,
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Supplementary Channels",
												fill: !0,
												scrollable: !0,
												children: (0, o.createComponentVNode)(2, a.Table, {
													children: [
														(0, o.createComponentVNode)(2, a.Table.Row, {
															header: !0,
															children: [
																(0, o.createComponentVNode)(2, a.Table.Cell, {
																	header: !0,
																	children: "Channel",
																}),
																(0, o.createComponentVNode)(2, a.Table.Cell, {
																	header: !0,
																	children: "Frequency",
																}),
																(0, o.createComponentVNode)(2, a.Table.Cell, {
																	header: !0,
																	children: "Prefix",
																}),
															],
														}),
														d.secureFrequencies.map(function (e) {
															return (0,
															o.createComponentVNode)(2, a.Table.Row, { children: [(0, o.createComponentVNode)(2, a.Table.Cell, { children: e.channel }), (0, o.createComponentVNode)(2, a.Table.Cell, { children: e.frequency }), (0, o.createComponentVNode)(2, a.Table.Cell, { children: (0, o.createComponentVNode)(2, a.Box, { as: "code", children: e.sayToken }) })] }, e.frequency);
														}),
													],
												}),
											}),
										}),
									!!d.modifiable &&
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Section, {
												title: "Access Panel",
												children: (0, o.createComponentVNode)(
													2,
													a.LabeledList,
													{
														children: [
															(0, o.createComponentVNode)(
																2,
																a.LabeledList.Item,
																{
																	label: "Green Wire",
																	labelColor: "green",
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			color: "green",
																			onClick: function () {
																				return u("toggle-wire", {
																					wire: l.RadioWires.Transmit,
																				});
																			},
																			children:
																				d.wires & l.RadioWires.Transmit
																					? "Cut"
																					: "Mend",
																		}
																	),
																}
															),
															(0, o.createComponentVNode)(
																2,
																a.LabeledList.Item,
																{
																	label: "Red Wire",
																	labelColor: "red",
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			color: "red",
																			onClick: function () {
																				return u("toggle-wire", {
																					wire: l.RadioWires.Receive,
																				});
																			},
																			children:
																				d.wires & l.RadioWires.Receive
																					? "Cut"
																					: "Mend",
																		}
																	),
																}
															),
															(0, o.createComponentVNode)(
																2,
																a.LabeledList.Item,
																{
																	label: "Blue Wire",
																	labelColor: "blue",
																	children: (0, o.createComponentVNode)(
																		2,
																		a.Button,
																		{
																			color: "blue",
																			onClick: function () {
																				return u("toggle-wire", {
																					wire: l.RadioWires.Signal,
																				});
																			},
																			children:
																				d.wires & l.RadioWires.Signal
																					? "Cut"
																					: "Mend",
																		}
																	),
																}
															),
														],
													}
												),
											}),
										}),
								],
							}),
						}),
					});
				};
			},
			38913: function (e, t) {
				"use strict";
				var n;
				(t.__esModule = !0),
					(t.RadioWires = void 0),
					(t.RadioWires = n),
					(function (e) {
						(e[(e.Signal = 1)] = "Signal"),
							(e[(e.Receive = 2)] = "Receive"),
							(e[(e.Transmit = 4)] = "Transmit");
					})(n || (t.RadioWires = n = {}));
			},
			89820: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ReagentExtractor = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(23827);
				t.ReagentExtractor = function (e, t) {
					var n = (0, r.useBackend)(t).data.containersData,
						i = n.inserted,
						u = n.storage_tank_1,
						m = n.storage_tank_2;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Reagent Extractor",
						width: 500,
						height: 739,
						theme: "ntos",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										basis: 19.5,
										children: (0, o.createComponentVNode)(2, l, {
											container: i,
											insertable: !0,
										}),
									}),
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: !0,
										children: (0, o.createComponentVNode)(2, a.Stack, {
											fill: !0,
											children: [
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													grow: !0,
													children: (0, o.createComponentVNode)(2, d),
												}),
												(0, o.createComponentVNode)(2, a.Stack.Item, {
													basis: 18,
													children: (0, o.createComponentVNode)(2, a.Stack, {
														vertical: !0,
														fill: !0,
														children: [
															(0, o.createComponentVNode)(2, a.Stack.Item, {
																basis: 19.5,
																grow: !0,
																children: (0, o.createComponentVNode)(2, l, {
																	container: u,
																}),
															}),
															(0, o.createComponentVNode)(2, a.Stack.Item, {
																basis: 19.5,
																children: (0, o.createComponentVNode)(2, l, {
																	container: m,
																}),
															}),
														],
													}),
												}),
											],
										}),
									}),
								],
							}),
						}),
					});
				};
				var l = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.insertable,
							l = e.container || i.NoContainer,
							d = (0, r.useSharedState)(t, "transferAmount_" + l.id, 10),
							u = d[0],
							m = d[1];
						return (0, o.createComponentVNode)(2, a.SectionEx, {
							capitalize: !0,
							title: l.name,
							buttons: (0, o.createFragment)(
								[
									(0, o.createComponentVNode)(2, a.Button, {
										title: "Flush All",
										icon: "times",
										color: "red",
										disabled: !l.totalVolume,
										onClick: function () {
											return n("flush", { container_id: l.id });
										},
									}),
									!c ||
										(0, o.createComponentVNode)(2, a.Button, {
											title: "Eject",
											icon: "eject",
											disabled: !e.container,
											onClick: function () {
												return n("ejectcontainer");
											},
										}),
								],
								0
							),
							children: [
								!!e.container ||
									(0, o.createComponentVNode)(2, a.Dimmer, {
										children: (0, o.createComponentVNode)(2, a.Button, {
											icon: "eject",
											fontSize: 1.5,
											onClick: function () {
												return n("insertcontainer");
											},
											bold: !0,
											children: "Insert Beaker",
										}),
									}),
								(0, o.createComponentVNode)(2, i.ReagentGraph, {
									container: l,
								}),
								(0, o.createComponentVNode)(2, i.ReagentList, {
									container: l,
									renderButtons: function (e) {
										return (0, o.createFragment)(
											[
												(0, o.createComponentVNode)(2, a.Button, {
													px: 0.75,
													mr: 1.5,
													icon: "filter",
													color: "red",
													title: "Isolate",
													onClick: function () {
														return n("isolate", {
															container_id: l.id,
															reagent_id: e.id,
														});
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													px: 0.75,
													icon: "times",
													color: "red",
													title: "Flush",
													onClick: function () {
														return n("flush_reagent", {
															container_id: l.id,
															reagent_id: e.id,
														});
													},
												}),
											],
											4
										);
									},
								}),
								(0, o.createComponentVNode)(2, a.Flex, {
									wrap: !0,
									justify: "center",
									children: [
										(0, o.createComponentVNode)(2, a.Flex.Item, { grow: !0 }),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											grow: !0,
											children: (0, o.createComponentVNode)(2, a.Button, {
												mb: 0.5,
												width: 17,
												textAlign: "center",
												selected: l.selected,
												title: "Select Extraction and Transfer Target",
												icon: l.selected ? "check-square-o" : "square-o",
												onClick: function () {
													return n("extractto", { container_id: l.id });
												},
												children: "Select",
											}),
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: (0, o.createComponentVNode)(2, a.Flex, {
												width: 17,
												children: [
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														grow: !0,
														children: [
															(0, o.createComponentVNode)(2, a.Button, {
																disabled: l.selected,
																onClick: function () {
																	return n("chemtransfer", {
																		container_id: l.id,
																		amount: u,
																	});
																},
																children: "Transfer",
															}),
															(0, o.createComponentVNode)(2, a.NumberInput, {
																value: u,
																format: function (e) {
																	return e + "u";
																},
																minValue: 1,
																maxValue: 500,
																onDrag: function (e, t) {
																	return m(t);
																},
															}),
														],
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														children: (0, o.createComponentVNode)(2, a.Button, {
															disabled: l.selected,
															onClick: function () {
																return n("chemtransfer", {
																	container_id: l.id,
																	amount: 500,
																});
															},
															children: "Transfer All",
														}),
													}),
												],
											}),
										}),
									],
								}),
							],
						});
					},
					d = function (e, t) {
						var n,
							c,
							i,
							l = (0, r.useBackend)(t),
							d = l.act,
							u = l.data,
							m = u.autoextract,
							s = u.ingredientsData || [],
							p = (0, r.useLocalState)(t, "page", 1),
							h = p[0],
							C = p[1],
							N = Math.max(1, Math.ceil(s.length / 25));
						(h < 1 || h > N) &&
							C(((n = h), (c = 1), (i = N), Math.min(Math.max(c, n), i)));
						var V = s.slice(25 * (h - 1), 25 * (h - 1) + 25);
						return (0, o.createComponentVNode)(2, a.Section, {
							fill: !0,
							title: "Extractable Items",
							buttons: (0, o.createComponentVNode)(2, a.Button.Checkbox, {
								checked: m,
								tooltip:
									"Items will be extracted into the selected container automatically upon insertion.",
								onClick: function () {
									return d("autoextract");
								},
								children: "Auto-Extract",
							}),
							children: (0, o.createComponentVNode)(2, a.Flex, {
								height: "100%",
								direction: "column",
								children: [
									(0, o.createComponentVNode)(2, a.Flex.Item, {
										grow: !0,
										children: (0, o.createComponentVNode)(2, a.Section, {
											scrollable: !0,
											fill: !0,
											children: V.map(function (e, t) {
												return (0, o.createFragment)(
													[
														(0, o.createComponentVNode)(2, a.Flex, {
															children: [
																(0, o.createComponentVNode)(2, a.Flex.Item, {
																	grow: !0,
																	children: e.name,
																}),
																(0, o.createComponentVNode)(2, a.Flex.Item, {
																	nowrap: !0,
																	children: [
																		(0, o.createComponentVNode)(2, a.Button, {
																			onClick: function () {
																				return d("extractingredient", {
																					ingredient_id: e.id,
																				});
																			},
																			children: "Extract",
																		}),
																		(0, o.createComponentVNode)(2, a.Button, {
																			icon: "eject",
																			title: "Eject",
																			onClick: function () {
																				return d("ejectingredient", {
																					ingredient_id: e.id,
																				});
																			},
																		}),
																	],
																}),
															],
														}),
														(0, o.createComponentVNode)(2, a.Divider),
													],
													4,
													e.id
												);
											}),
										}),
									}),
									N < 2 ||
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											textAlign: "center",
											basis: 1.5,
											children: [
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "caret-left",
													title: "Previous Page",
													disabled: h < 2,
													onClick: function () {
														return C(h - 1);
													},
												}),
												(0, o.createComponentVNode)(2, a.NumberInput, {
													value: h,
													format: function (e) {
														return "Page " + e + "/" + N;
													},
													minValue: 1,
													maxValue: N,
													stepPixelSize: 15,
													onChange: function (e, t) {
														return C(t);
													},
												}),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "caret-right",
													title: "Next Page",
													disabled: h > N - 1,
													onClick: function () {
														return C(h + 1);
													},
												}),
											],
										}),
								],
							}),
						});
					};
			},
			37975: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Rockbox = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(2882),
					i = n(85952);
				t.Rockbox = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.default_price,
						m = d.autosell,
						s = (0, r.useLocalState)(t, "takeAmount", 1),
						p = s[0],
						h = s[1];
					return (0, o.createComponentVNode)(2, i.Window, {
						title: "Rockbox",
						width: 375,
						height: 400,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Stack, {
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										children: (0, o.createComponentVNode)(2, a.Section, {
											fill: !0,
											children: [
												(0, o.createComponentVNode)(2, a.Box, {
													children: [
														"Amount to eject: ",
														(0, o.createComponentVNode)(2, a.NumberInput, {
															value: p,
															width: 4,
															minValue: 1,
															onDrag: function (e, t) {
																return h(t);
															},
															onChange: function (e, t) {
																return h(t);
															},
														}),
													],
												}),
												(0, o.createComponentVNode)(2, a.Divider),
												(0, o.createComponentVNode)(2, a.Tooltip, {
													content: "Default price for new ore entries.",
													position: "bottom",
													children: (0, o.createComponentVNode)(2, a.Box, {
														as: "span",
														children: [
															" ",
															"Default Price: ",
															(0, o.createComponentVNode)(2, a.NumberInput, {
																value: u,
																width: 4,
																minValue: 0,
																format: function (e) {
																	return "$" + e;
																},
																onChange: function (e, t) {
																	return l("set-default-price", {
																		newPrice: t,
																	});
																},
															}),
														],
													}),
												}),
												(0, o.createComponentVNode)(2, a.Button.Checkbox, {
													checked: m,
													tooltip:
														"Mark new ore entries for sale automatically.",
													onClick: function () {
														return l("toggle-auto-sell");
													},
													children: "Auto-Sell",
												}),
											],
										}),
									}),
									(0, o.createComponentVNode)(2, a.Stack.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, a.Section, {
											fill: !0,
											scrollable: !0,
											children: d.ores.length
												? (0, o.createComponentVNode)(2, a.Box, {
														children: d.ores.map(function (e) {
															return (0, o.createFragment)(
																[
																	(0, o.createComponentVNode)(2, a.Tooltip, {
																		position: "bottom",
																		content: e.stats,
																		children: (0, o.createComponentVNode)(
																			2,
																			a.Table,
																			{
																				children: (0, o.createComponentVNode)(
																					2,
																					a.Table.Row,
																					{
																						children: [
																							(0, o.createComponentVNode)(
																								2,
																								a.Table.Cell,
																								{
																									children: (0,
																									o.createComponentVNode)(
																										2,
																										a.Box,
																										{
																											children:
																												e.name +
																												": " +
																												e.amount,
																										}
																									),
																								}
																							),
																							(0, o.createComponentVNode)(
																								2,
																								a.Table.Cell,
																								{
																									textAlign: "right",
																									children: (0,
																									o.createComponentVNode)(
																										2,
																										a.Box,
																										{
																											children: [
																												"Price: ",
																												(0,
																												o.createComponentVNode)(
																													2,
																													a.NumberInput,
																													{
																														value: e.price,
																														width: 4,
																														minValue: 0,
																														format: function (
																															e
																														) {
																															return "$" + e;
																														},
																														onChange: function (
																															t,
																															n
																														) {
																															return l(
																																"set-ore-price",
																																{
																																	newPrice: n,
																																	ore: e.name,
																																}
																															);
																														},
																													}
																												),
																												(0,
																												o.createComponentVNode)(
																													2,
																													c.ButtonCheckbox,
																													{
																														content: "For Sale",
																														color: e.forSale
																															? "green"
																															: "red",
																														checked: e.forSale,
																														onClick:
																															function () {
																																return l(
																																	"toggle-ore-sell-status",
																																	{
																																		ore: e.name,
																																	}
																																);
																															},
																													}
																												),
																												(0,
																												o.createComponentVNode)(
																													2,
																													a.Button,
																													{
																														color:
																															e.amount < p
																																? "orange"
																																: "default",
																														disabled:
																															0 === e.amount,
																														onClick:
																															function () {
																																return l(
																																	"dispense-ore",
																																	{
																																		ore: e.name,
																																		take: p,
																																	}
																																);
																															},
																														children: "Eject",
																													}
																												),
																											],
																										}
																									),
																								}
																							),
																						],
																					}
																				),
																			}
																		),
																	}),
																	(0, o.createComponentVNode)(2, a.Divider),
																],
																4,
																e.name
															);
														}),
												  })
												: (0, o.createComponentVNode)(2, a.Box, {
														children: "No ores stored",
												  }),
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			57436: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.SecureSafe = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(67113),
					l = [
						["7", "8", "9", "A"],
						["4", "5", "6", "B"],
						["1", "2", "3", "C"],
						["0", "F", "E", "D"],
					],
					d = function (e, t) {
						var n = e.attempt,
							r = e.codeLen,
							c = e.disabled,
							l = e.emagged,
							d = e.padMsg,
							u =
								d ||
								(function (e, t) {
									return e.padEnd(t, "*").split("").join(" ");
								})(n, r);
						return (
							c && (u = "NO ACCESS"),
							l && (u = (0, i.glitch)(u, 2)),
							(0, o.createComponentVNode)(2, a.Box, {
								fontSize: "25px",
								fontFamily: "Courier",
								bold: !0,
								textAlign: "center",
								padding: "3px",
								backgroundColor: "#342210",
								style: {
									"border-width": "0.1em",
									"border-style": "solid",
									"border-radius": "0.16em",
									"border-color": "#FC8E1F",
								},
								children: u,
							})
						);
					},
					u = function (e, t) {
						var n = e.act;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									children: l.map(function (e, t) {
										var r = e.length;
										return (0, o.createComponentVNode)(
											2,
											a.Flex,
											{
												justify: "space-between",
												mt: 1,
												children: e.map(function (e, t) {
													return (0, o.createComponentVNode)(
														2,
														a.Flex.Item,
														{
															grow: 1,
															mr: t < r - 1 ? 1 : 0,
															children: (0, o.createComponentVNode)(
																2,
																a.Button,
																{
																	fluid: !0,
																	textAlign: "center",
																	fontSize: "25px",
																	fontFamily: "Courier",
																	bold: !0,
																	content: e,
																	onClick: function () {
																		return n("input", { input: e });
																	},
																}
															),
														},
														e
													);
												}),
											},
											"row-" + t
										);
									}),
								}),
								(0, o.createComponentVNode)(2, a.Flex.Item, {
									mt: 1,
									children: (0, o.createComponentVNode)(2, a.Flex, {
										justify: "space-between",
										children: [
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												grow: 1,
												mr: 1,
												children: (0, o.createComponentVNode)(2, a.Button, {
													fluid: !0,
													textAlign: "center",
													fontSize: "20px",
													fontFamily: "Courier",
													bold: !0,
													content: "ENTER",
													onClick: function () {
														return n("enter");
													},
												}),
											}),
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												grow: 1,
												children: (0, o.createComponentVNode)(2, a.Button, {
													fluid: !0,
													textAlign: "center",
													fontSize: "20px",
													fontFamily: "Courier",
													bold: !0,
													content: "RESET",
													onClick: function () {
														return n("reset");
													},
												}),
											}),
										],
									}),
								}),
							],
							4
						);
					};
				t.SecureSafe = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						m = n.data,
						s = m.attempt,
						p = m.codeLen,
						h = m.disabled,
						C = m.emagged,
						N = m.padMsg,
						V = m.safeName;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: (0, i.capitalize)(V),
						width: 200,
						height: 328,
						theme: "retro-dark",
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								fill: !0,
								children: (0, o.createComponentVNode)(2, a.Stack, {
									vertical: !0,
									children: [
										(0, o.createComponentVNode)(2, d, {
											attempt: s,
											codeLen: p,
											disabled: h,
											emagged: C,
											padMsg: N,
										}),
										(0, o.createComponentVNode)(2, u, { act: l }),
									],
								}),
							}),
						}),
					});
				};
			},
			72872: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.SeedFabricator = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(67113),
					l = {
						Fruit: 1,
						Vegetable: 2,
						Herb: 3,
						Flower: 4,
						Miscellaneous: 5,
						Other: 6,
					},
					d = function (e, t) {
						return (l[e.name] || l.Other) - (l[t.name] || l.Other);
					};
				t.SeedFabricator = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						l = n.canVend,
						u = n.isWorking,
						s = n.maxSeed,
						p = n.name,
						h = n.seedCount,
						C = n.seedCategories || [];
					C.sort(d);
					var N = (0, r.useLocalState)(t, "dispenseAmount", 1),
						V = N[0],
						f = N[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						title: p,
						width: 500,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: [
								!u &&
									(0, o.createComponentVNode)(2, a.Modal, {
										textAlign: "center",
										width: 35,
										height: 10,
										fontSize: 3,
										fontFamily: "Courier",
										color: "red",
										children: [
											(0, o.createComponentVNode)(2, a.Blink, {
												time: 500,
												children: [
													(0, o.createComponentVNode)(2, a.Icon, {
														name: "exclamation-triangle",
														pr: 1.5,
													}),
													"MALFUNCTION",
													(0, o.createComponentVNode)(2, a.Icon, {
														name: "exclamation-triangle",
														pl: 1.5,
													}),
												],
											}),
											"CHECK WIRES",
										],
									}),
								(0, o.createComponentVNode)(2, a.Section, {
									children: (0, o.createComponentVNode)(2, a.Flex, {
										children: [
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												bold: !0,
												pr: 1,
												children: "Dispense:",
											}),
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												basis: 6,
												grow: !0,
												children: (0, o.createComponentVNode)(
													2,
													a.NumberInput,
													{
														value: V,
														format: function (e) {
															return e + (0, i.pluralize)(" seed", e);
														},
														minValue: 1,
														maxValue: 10,
														onDrag: function (e, t) {
															return f(t);
														},
													}
												),
											}),
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												grow: 2,
												children: (0, o.createComponentVNode)(
													2,
													a.ProgressBar,
													{
														value: Math.max(0, s - h),
														maxValue: s,
														ranges: {
															yellow: [5, Infinity],
															bad: [-Infinity, 5],
														},
														children: (0, o.createComponentVNode)(2, a.Icon, {
															name: "bolt",
														}),
													}
												),
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									children: [
										!l &&
											(0, o.createComponentVNode)(2, a.Modal, {
												textAlign: "center",
												width: 25,
												height: 5,
												fontSize: 2,
												fontFamily: "Courier",
												color: "yellow",
												children: [
													(0, o.createComponentVNode)(2, a.Blink, {
														interval: 500,
														time: 500,
														children: (0, o.createComponentVNode)(2, a.Icon, {
															name: "bolt",
															pr: 1.5,
														}),
													}),
													"UNIT RECHARGING",
												],
											}),
										C.map(function (e) {
											return (0,
											o.createComponentVNode)(2, m, { category: e, dispenseAmount: V }, e.name);
										}),
									],
								}),
							],
						}),
					});
				};
				var u = function (e, t) {
						return e.name.localeCompare(t.name);
					},
					m = function (e, t) {
						var n = (0, r.useBackend)(t).act,
							c = e.category,
							i = e.dispenseAmount,
							l = c.name,
							d = c.seeds;
						if (!d) return null;
						var m = d.sort(u);
						return (0, o.createComponentVNode)(2, a.Collapsible, {
							title: l,
							children: m.map(function (e) {
								return (0, o.createComponentVNode)(
									2,
									a.Box,
									{
										as: "span",
										children: (0, o.createComponentVNode)(2, a.Button, {
											width: "155px",
											height: "32px",
											px: 0,
											m: 0.25,
											onClick: function () {
												return n("disp", { path: e.path, amount: i });
											},
											children: (0, o.createComponentVNode)(2, a.Flex, {
												direction: "row",
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														children: e.img
															? (0, o.createVNode)(1, "img", null, null, 1, {
																	style: {
																		"vertical-align": "middle",
																		"horizontal-align": "middle",
																	},
																	height: "32px",
																	width: "32px",
																	src: "data:image/png;base64," + e.img,
															  })
															: (0, o.createComponentVNode)(2, a.Icon, {
																	style: {
																		"vertical-align": "middle",
																		"horizontal-align": "middle",
																	},
																	height: "32px",
																	width: "32px",
																	name: "question-circle-o",
																	pl: "8px",
																	pt: "4px",
																	fontSize: "24px",
															  }),
													}),
													(0, o.createComponentVNode)(2, a.Flex.Item, {
														overflow: "hidden",
														style: { "text-overflow": "ellipsis" },
														title: e.name,
														children: e.name,
													}),
												],
											}),
										}),
									},
									e.name
								);
							}),
						});
					};
			},
			80646: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Sleeper = void 0);
				var o,
					r = n(39812),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = n(58083),
					d = n(77366),
					u = function (e) {
						return e <= 0 ? "0" : e.toFixed(1);
					},
					m = 1,
					s = 2,
					p =
						(((o = {})[0] = {
							name: "Conscious",
							color: "good",
							icon: "check",
						}),
						(o[m] = { name: "Unconscious", color: "average", icon: "bed" }),
						(o[s] = { name: "Dead", color: "bad", icon: "skull" }),
						o);
				t.Sleeper = function (e, t) {
					var n = (0, a.useBackend)(t),
						o = n.data,
						m = n.act,
						s = o.sleeperGone,
						h = o.hasOccupant,
						C = o.occupantStat,
						N = o.health,
						V = o.oxyDamage,
						f = o.toxDamage,
						g = o.burnDamage,
						b = o.bruteDamage,
						v = o.recharging,
						k = o.rejuvinators,
						x = o.isTiming,
						w = o.time,
						S = o.timeStarted,
						y = o.timeNow,
						B = o.maxTime,
						I = Math.max(S ? (w || 0) + S - y : w || 0, 0),
						T = h && !x && !v && C < 2,
						L = p[C];
					return (0, r.createComponentVNode)(2, i.Window, {
						theme: "ntos",
						width: 440,
						height: 440,
						children: (0, r.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, r.createComponentVNode)(2, c.Section, {
									title: "Occupant Statistics",
									buttons: (0, r.createComponentVNode)(2, c.Button, {
										icon: "eject",
										align: "center",
										color: "good",
										disabled: !h || !!x,
										onClick: function () {
											return m("eject");
										},
										children: "Eject",
									}),
									children: [
										!h &&
											(s
												? "Check connection to sleeper pod."
												: "The sleeper is unoccupied."),
										!!h &&
											(0, r.createComponentVNode)(2, c.LabeledList, {
												children: [
													(0, r.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Status",
														children: [
															(0, r.createComponentVNode)(2, c.Icon, {
																color: L.color,
																name: L.icon,
															}),
															" ",
															L.name,
														],
													}),
													(0, r.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Overall Health",
														children: (0, r.createComponentVNode)(
															2,
															c.ProgressBar,
															{
																value: N,
																ranges: {
																	good: [0.9, Infinity],
																	average: [0.5, 0.9],
																	bad: [-Infinity, 0.5],
																},
															}
														),
													}),
													(0, r.createComponentVNode)(2, c.LabeledList.Item, {
														label: "Damage Breakdown",
														children: [
															(0, r.createComponentVNode)(2, d.HealthStat, {
																inline: !0,
																align: "center",
																type: "oxy",
																width: 5,
																children: u(V),
															}),
															"/",
															(0, r.createComponentVNode)(2, d.HealthStat, {
																inline: !0,
																align: "center",
																type: "toxin",
																width: 5,
																children: u(f),
															}),
															"/",
															(0, r.createComponentVNode)(2, d.HealthStat, {
																inline: !0,
																align: "center",
																type: "burn",
																width: 5,
																children: u(g),
															}),
															"/",
															(0, r.createComponentVNode)(2, d.HealthStat, {
																inline: !0,
																align: "center",
																type: "brute",
																width: 5,
																children: u(b),
															}),
														],
													}),
												],
											}),
									],
								}),
								!!h &&
									(0, r.createComponentVNode)(2, c.Section, {
										title: "Detected Rejuvinators",
										buttons: (0, r.createComponentVNode)(2, c.Button, {
											icon: "syringe",
											align: "center",
											color: "good",
											disabled: !T,
											onClick: function () {
												return m("inject");
											},
											children: "Inject",
										}),
										children: [
											(0, r.createComponentVNode)(2, c.Section, {
												height: 10,
												scrollable: !0,
												children: k.length
													? (0, r.createComponentVNode)(2, c.LabeledList, {
															children: k.map(function (e) {
																return (0,
																r.createComponentVNode)(2, c.LabeledList.Item, { label: e.name, children: [(0, r.createComponentVNode)(2, c.Icon, { name: !e.od || e.volume < e.od ? "circle" : "skull", color: e.color }), " " + e.volume.toFixed(3), !!e.od && e.volume >= e.od && (0, r.createComponentVNode)(2, c.Box, { inline: !0, color: "bad", pl: 1, children: "(Overdose!)" })] }, e.name);
															}),
													  })
													: "No rejuvinators detected in occupant's bloodstream.",
											}),
											(0, r.createComponentVNode)(2, c.Box, {
												italic: !0,
												textAlign: "center",
												color: "label",
												mt: 2,
												children:
													"Use separate reagent scanner for complete analysis.",
											}),
										],
									}),
								(0, r.createComponentVNode)(2, c.Section, {
									title: "Occupant Alarm Clock",
									buttons: (0, r.createComponentVNode)(2, c.Button, {
										width: 8,
										icon: "clock",
										align: "center",
										color: x ? "bad" : "good",
										disabled: !h || C > 1 || w <= 0,
										onClick: function () {
											return m("timer");
										},
										children: x ? "Stop Timer" : "Start Timer",
									}),
									children: (0, r.createComponentVNode)(2, c.Flex, {
										children: [
											(0, r.createComponentVNode)(2, c.Flex.Item, {
												children: (0, r.createComponentVNode)(2, c.Knob, {
													mr: "0.5em",
													animated: !0,
													size: 1.25,
													step: 5,
													stepPixelSize: 2,
													minValue: 0,
													maxValue: B / 10,
													value: I / 10,
													onDrag: function (e, t) {
														return m("time_add", { tp: t - I / 10 });
													},
												}),
											}),
											(0, r.createComponentVNode)(2, c.Flex.Item, {
												children: (0, r.createComponentVNode)(2, c.Box, {
													p: 1,
													textAlign: "center",
													backgroundColor: "black",
													color: "good",
													maxWidth: "90px",
													width: "90px",
													fontSize: "20px",
													children: (0, r.createComponentVNode)(
														2,
														c.TimeDisplay,
														{
															value: I,
															timing: !!x,
															format: function (e) {
																return (0, l.formatTime)(e);
															},
														}
													),
												}),
											}),
											(0, r.createComponentVNode)(2, c.Flex.Item, {
												shrink: 1,
												children: (0, r.createComponentVNode)(2, c.Box, {
													italic: !0,
													textAlign: "center",
													color: "label",
													pl: 1,
													children:
														"System will inject rejuvenators automatically when occupant is in hibernation.",
												}),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
			},
			57243: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.SlotMachine = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.SlotMachine = function (e, t) {
					var n = (0, r.useBackend)(t).data,
						a = n.busy,
						u = n.scannedCard;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Slot Machine",
						width: 375,
						height: 220,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: u
								? a
									? (0, o.createComponentVNode)(2, d)
									: (0, o.createComponentVNode)(2, l)
								: (0, o.createComponentVNode)(2, i),
						}),
					});
				};
				var i = function (e, t) {
						var n = (0, r.useBackend)(t).act;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.NoticeBox, {
									danger: !0,
									children: "You must insert your ID to continue!",
								}),
								(0, o.createComponentVNode)(2, a.Button, {
									icon: "id-card",
									onClick: function () {
										return n("insert_card");
									},
									children: "Insert ID",
								}),
							],
							4
						);
					},
					l = function (e, t) {
						var n = (0, r.useBackend)(t),
							c = n.act,
							i = n.data,
							l = i.account_funds,
							d = i.money,
							u = i.plays,
							m = i.scannedCard,
							s = i.wager;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.NoticeBox, {
									success: !0,
									children: (0, o.createVNode)(
										1,
										"marquee",
										null,
										" Wager some credits! ",
										16
									),
								}),
								(0, o.createComponentVNode)(2, a.Stack, {
									vertical: !0,
									children: [
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: [
												(0, o.createVNode)(
													1,
													"strong",
													null,
													"Your card: ",
													16
												),
												(0, o.createComponentVNode)(2, a.Button, {
													icon: "eject",
													content: m,
													tooltip: "Pull Funds and Eject Card",
													tooltipPosition: "bottom-end",
													onClick: function () {
														return c("eject");
													},
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Stack, {
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createVNode)(
															1,
															"strong",
															null,
															"Account Balance:",
															16
														),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: [
															(0, o.createComponentVNode)(2, a.Icon, {
																name: "dollar-sign",
															}),
															" ",
															l,
														],
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(2, a.Button, {
															tooltip: "Add Funds",
															tooltipPosition: "bottom",
															onClick: function () {
																return c("cashin");
															},
															children: "Cash In",
														}),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(2, a.Button, {
															tooltip: "Pull Funds",
															tooltipPosition: "bottom",
															onClick: function () {
																return c("cashout");
															},
															children: "Cash Out",
														}),
													}),
												],
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Stack, {
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: "Amount Wagered:",
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(
															2,
															a.NumberInput,
															{
																minValue: 20,
																maxValue: 1e3,
																value: s,
																format: function (e) {
																	return "$" + e;
																},
																onDrag: function (e, t) {
																	return c("set_wager", { bet: t });
																},
															}
														),
													}),
												],
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Stack, {
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createVNode)(
															1,
															"strong",
															null,
															"Credits Remaining:",
															16
														),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: [
															(0, o.createComponentVNode)(2, a.Icon, {
																name: "dollar-sign",
															}),
															" ",
															d,
														],
													}),
												],
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.BlockQuote, {
												children: [u, " attempts have been made today!"],
											}),
										}),
										(0, o.createComponentVNode)(2, a.Stack.Divider),
										(0, o.createComponentVNode)(2, a.Stack.Item, {
											children: (0, o.createComponentVNode)(2, a.Button, {
												icon: "dice",
												tooltip: "Pull the lever",
												tooltipPosition: "right",
												onClick: function () {
													return c("play", { bet: s });
												},
												children: "Play!",
											}),
										}),
									],
								}),
							],
							4
						);
					},
					d = function () {
						return (0, o.createComponentVNode)(2, a.NoticeBox, {
							warning: !0,
							children: "The Machine is busy, please wait!",
						});
					};
			},
			20561: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Smes = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952),
					l = 1e3;
				t.Smes = function (e, t) {
					var n = (0, r.useBackend)(t),
						d = n.act,
						u = n.data,
						m = u.charge,
						s = u.capacity,
						p = u.inputAttempt,
						h = u.inputting,
						C = u.inputLevel,
						N = u.inputLevelMax,
						V = u.inputAvailable,
						f = u.outputAttempt,
						g = u.outputting,
						b = u.outputLevel,
						v = u.outputLevelMax,
						k = (m / s >= 1 ? "good" : h && C && "average") || "bad",
						x = (f && g ? "good" : m > 0 && "average") || "bad";
					return (0, o.createComponentVNode)(2, i.Window, {
						width: 340,
						height: 360,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Stored Energy",
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: (0, o.createComponentVNode)(
												2,
												a.LabeledList.Item,
												{
													label: "Stored Energy",
													children: (0, c.formatSiUnit)(m, 0, "J"),
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.ProgressBar, {
											mt: "0.5em",
											value: m / s,
											ranges: {
												good: [0.5, Infinity],
												average: [0.15, 0.5],
												bad: [-Infinity, 0.15],
											},
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Input",
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Charge Mode",
												buttons: (0, o.createComponentVNode)(2, a.Button, {
													icon: "power-off",
													color: p ? "green" : "red",
													onClick: function () {
														return d("toggle-input");
													},
													children: p ? "On" : "Off",
												}),
												children: (0, o.createComponentVNode)(2, a.Box, {
													color: k,
													children:
														(m / s >= 1
															? "Fully Charged"
															: p && C && !h && "Initializing") ||
														(p && C && h && "Charging") ||
														(p && h && "Idle") ||
														"Not Charging",
												}),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Target Input",
												children: (0, o.createComponentVNode)(2, a.Flex, {
													inline: !0,
													width: "100%",
													children: [
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															children: [
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "fast-backward",
																	disabled: 0 === C,
																	onClick: function () {
																		return d("set-input", { target: "min" });
																	},
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "backward",
																	disabled: 0 === C,
																	onClick: function () {
																		return d("set-input", { adjust: -1e4 });
																	},
																}),
															],
														}),
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															grow: 1,
															mx: 1,
															children: (0, o.createComponentVNode)(
																2,
																a.Slider,
																{
																	value: C / l,
																	fillValue: V / l,
																	minValue: 0,
																	maxValue: N / l,
																	step: 5,
																	stepPixelSize: 4,
																	format: function (e) {
																		return (0, c.formatPower)(e * l, 1);
																	},
																	onDrag: function (e, t) {
																		return d("set-input", { target: t * l });
																	},
																}
															),
														}),
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															children: [
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "forward",
																	disabled: C === N,
																	onClick: function () {
																		return d("set-input", { adjust: 1e4 });
																	},
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "fast-forward",
																	disabled: C === N,
																	onClick: function () {
																		return d("set-input", { target: "max" });
																	},
																}),
															],
														}),
													],
												}),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Available",
												children: (0, c.formatPower)(V),
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Output",
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Output Mode",
												buttons: (0, o.createComponentVNode)(2, a.Button, {
													icon: "power-off",
													color: f ? "green" : "red",
													onClick: function () {
														return d("toggle-output");
													},
													children: f ? "On" : "Off",
												}),
												children: (0, o.createComponentVNode)(2, a.Box, {
													color: x,
													children:
														(g && f ? "Enabled" : f && "Idle") ||
														(m && "Disabled") ||
														"No Charge",
												}),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Target Output",
												children: (0, o.createComponentVNode)(2, a.Flex, {
													inline: !0,
													width: "100%",
													children: [
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															children: [
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "fast-backward",
																	disabled: 0 === b,
																	onClick: function () {
																		return d("set-output", { target: "min" });
																	},
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "backward",
																	disabled: 0 === b,
																	onClick: function () {
																		return d("set-output", { adjust: -1e4 });
																	},
																}),
															],
														}),
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															grow: 1,
															mx: 1,
															children: (0, o.createComponentVNode)(
																2,
																a.Slider,
																{
																	value: b / l,
																	minValue: 0,
																	maxValue: v / l,
																	step: 5,
																	stepPixelSize: 4,
																	format: function (e) {
																		return (0, c.formatPower)(e * l, 1);
																	},
																	onDrag: function (e, t) {
																		return d("set-output", { target: t * l });
																	},
																}
															),
														}),
														(0, o.createComponentVNode)(2, a.Flex.Item, {
															children: [
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "forward",
																	disabled: b === v,
																	onClick: function () {
																		return d("set-output", { adjust: 1e4 });
																	},
																}),
																(0, o.createComponentVNode)(2, a.Button, {
																	icon: "fast-forward",
																	disabled: b === v,
																	onClick: function () {
																		return d("set-output", { target: "max" });
																	},
																}),
															],
														}),
													],
												}),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Outputting",
												children: (0, c.formatPower)(g),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
			},
			49387: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.SpendSpacebux = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = function (e) {
						var t = e.product,
							n = t.pname,
							r = t.cost,
							c = t.img,
							i = e.disabled,
							l = e.onClick;
						return (0, o.createFragment)(
							[
								(0, o.createComponentVNode)(2, a.Flex, {
									direction: "row",
									align: "center",
									children: [
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: (0, o.createVNode)(1, "img", null, null, 1, {
												src: "data:image/png;base64," + c,
												style: {
													"vertical-align": "middle",
													"horizontal-align": "middle",
												},
											}),
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											grow: 1,
											children: [
												(0, o.createComponentVNode)(2, a.Box, {
													bold: !0,
													children: n,
												}),
												(0, o.createComponentVNode)(2, a.Box, {
													children: "Cost: $" + r,
												}),
											],
										}),
										(0, o.createComponentVNode)(2, a.Flex.Item, {
											children: (0, o.createComponentVNode)(2, a.Button, {
												onClick: l,
												disabled: i,
												children: "Buy",
											}),
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Divider),
							],
							4
						);
					};
				t.SpendSpacebux = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.act,
						d = n.data,
						u = d.purchasables,
						m = d.held,
						s = d.balance,
						p = d.truebalance,
						h = (0, r.useLocalState)(t, "filter-available", !1),
						C = h[0],
						N = h[1];
					return (0, o.createComponentVNode)(2, c.Window, {
						resizable: !0,
						title: "Spend Spacebux",
						width: 300,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, a.Section, {
								children: [
									(0, o.createComponentVNode)(2, a.BlockQuote, {
										children:
											"Purchase an item for the upcoming round. Earn more cash by completing rounds. A purchased item will persist until you die or fail to escape the station. If you have a Held Item, buying a new one will replace it.",
									}),
									(0, o.createComponentVNode)(2, a.Stack, {
										vertical: !0,
										fill: !0,
										children: [
											m
												? (0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(2, a.Box, {
															children: ["Held Item: ", m],
														}),
												  })
												: "",
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: (0, o.createComponentVNode)(2, a.Section, {
													children: (0, o.createComponentVNode)(2, a.Flex, {
														direction: "row",
														align: "center",
														children: [
															(0, o.createComponentVNode)(2, a.Flex.Item, {
																grow: 1,
																children: (0, o.createComponentVNode)(
																	2,
																	a.Box,
																	{ children: ["Balance: $", s] }
																),
															}),
															(0, o.createComponentVNode)(2, a.Flex.Item, {
																children: (0, o.createComponentVNode)(
																	2,
																	a.Button.Checkbox,
																	{
																		checked: C,
																		onClick: function () {
																			return N(!C);
																		},
																		children: "Filter Affordable",
																	}
																),
															}),
														],
													}),
												}),
											}),
											(0, o.createComponentVNode)(2, a.Stack.Item, {
												children: u
													.filter(function (e) {
														var t = e.cost;
														return !(C && p < t);
													})
													.map(function (e) {
														var t = e.pname,
															n = e.cost;
														return (0, o.createComponentVNode)(
															2,
															i,
															{
																product: e,
																disabled: p < n,
																onClick: function () {
																	return l("purchase", { pname: t });
																},
															},
															t
														);
													}),
											}),
										],
									}),
								],
							}),
						}),
					});
				};
			},
			36184: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.TEG = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(58083),
					i = n(85952);
				t.TEG = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = (n.act, n.data),
						d = l.output,
						u = l.history,
						m = l.hotCircStatus,
						s = l.hotInletTemp,
						p = l.hotOutletTemp,
						h = l.hotInletPres,
						C = l.hotOutletPres,
						N = l.coldCircStatus,
						V = l.coldInletTemp,
						f = l.coldOutletTemp,
						g = l.coldInletPres,
						b = l.coldOutletPres,
						v = u.map(function (e, t) {
							return [t, e];
						}),
						k = Math.max.apply(Math, u),
						x = function (e) {
							return (e >= 1e3 ? e.toExponential(3) : e) + " K";
						};
					return (0, o.createComponentVNode)(2, i.Window, {
						height: "520",
						width: "300",
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: [
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Status",
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: (0, o.createComponentVNode)(
												2,
												a.LabeledList.Item,
												{ label: "Output History" }
											),
										}),
										(0, o.createComponentVNode)(2, a.Chart.Line, {
											height: "5em",
											data: v,
											rangeX: [0, v.length - 1],
											rangeY: [0, k],
											strokeColor: "rgba(1, 184, 170, 1)",
											fillColor: "rgba(1, 184, 170, 0.25)",
										}),
										(0, o.createComponentVNode)(2, a.Divider),
										(0, o.createComponentVNode)(2, a.LabeledList, {
											children: [
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Energy Output",
													textAlign: "right",
													children: (0, c.formatPower)(d),
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Hot Gas Circulator",
													textAlign: "right",
													children: (0, o.createComponentVNode)(2, a.Box, {
														color: (m && s ? "good" : m && "average") || "bad",
														children: (m && s ? "OK" : m && "Idle") || "ERROR",
													}),
												}),
												(0, o.createComponentVNode)(2, a.LabeledList.Item, {
													label: "Cold Gas Circulator",
													textAlign: "right",
													children: (0, o.createComponentVNode)(2, a.Box, {
														color: (N && V ? "good" : N && "average") || "bad",
														children: (N && V ? "OK" : N && "Idle") || "ERROR",
													}),
												}),
											],
										}),
									],
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Hot Loop",
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Inlet Temp",
												textAlign: "right",
												children: x(s),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Outlet Temp",
												textAlign: "right",
												children: x(p),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Inlet Pressure",
												textAlign: "right",
												children: (0, c.formatSiUnit)(Math.max(h, 0), 1, "Pa"),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Outlet Pressure",
												textAlign: "right",
												children: (0, c.formatSiUnit)(C, 1, "Pa"),
											}),
										],
									}),
								}),
								(0, o.createComponentVNode)(2, a.Section, {
									title: "Cold Loop",
									children: (0, o.createComponentVNode)(2, a.LabeledList, {
										children: [
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Inlet Temp",
												textAlign: "right",
												children: x(V),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Outlet Temp",
												textAlign: "right",
												children: x(f),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Divider),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Inlet Pressure",
												textAlign: "right",
												children: (0, c.formatSiUnit)(Math.max(g, 0), 1, "Pa"),
											}),
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Outlet Pressure",
												textAlign: "right",
												children: (0, c.formatSiUnit)(b, 1, "Pa"),
											}),
										],
									}),
								}),
							],
						}),
					});
				};
			},
			38754: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.TankDispenser = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952);
				t.TankDispenser = function (e, t) {
					var n = (0, r.useBackend)(t),
						i = n.act,
						l = n.data;
					return (0, o.createComponentVNode)(2, c.Window, {
						width: 280,
						height: 105,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Plasma",
											buttons: (0, o.createComponentVNode)(2, a.Button, {
												icon: l.plasma ? "circle" : "circle-o",
												content: "Dispense",
												disabled: !l.plasma,
												onClick: function () {
													return i("dispense-plasma");
												},
											}),
											children: l.plasma,
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Oxygen",
											buttons: (0, o.createComponentVNode)(2, a.Button, {
												icon: l.oxygen ? "circle" : "circle-o",
												content: "Dispense",
												disabled: !l.oxygen,
												onClick: function () {
													return i("dispense-oxygen");
												},
											}),
											children: l.oxygen,
										}),
									],
								}),
							}),
						}),
					});
				};
			},
			53133: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.Terrainify =
						t.TerrainOptions =
						t.TerrainToggles =
						t.TerrainVehicleChoice =
						t.TerrainChoice =
							void 0);
				var o = n(39812),
					r = (n(41860), n(71494)),
					a = n(74814),
					c = n(85952),
					i = function (e) {
						var t = e.typeData,
							n = e.terrain,
							r = e.onTerrainValue;
						return (0, o.createComponentVNode)(2, a.Flex.Item, {
							mb: 1,
							children: (0, o.createComponentVNode)(2, a.Flex, {
								direction: "column",
								children: (0, o.createComponentVNode)(2, a.Section, {
									title: "Types",
									children: Object.keys(t).map(function (e, c) {
										return (0, o.createComponentVNode)(
											2,
											a.Flex.Item,
											{
												mb: 1,
												children: (0, o.createComponentVNode)(2, a.Button, {
													fluid: !0,
													selected: n === e,
													onClick: function () {
														return r(e);
													},
													children: t[e].name,
												}),
											},
											c
										);
									}),
								}),
							}),
						});
					};
				t.TerrainChoice = i;
				var l = function (e) {
					var t = e.fabricator,
						n = e.cars,
						r = e.allowVehicles,
						c = e.onToggleFabricators,
						i = e.onToggleCars,
						l = e.onToggleAllowVehicles;
					return (0, o.createComponentVNode)(2, a.Flex.Item, {
						children: (0, o.createComponentVNode)(2, a.Section, {
							title: "Vehicle Options",
							children: [
								(0, o.createComponentVNode)(2, a.Button.Checkbox, {
									checked: t,
									content: "Add Subs to Fabricators",
									onClick: function () {
										return c();
									},
								}),
								(0, o.createVNode)(1, "br"),
								(0, o.createComponentVNode)(2, a.Button.Checkbox, {
									checked: n,
									content: "Convert some Cars",
									onClick: function () {
										return i();
									},
								}),
								(0, o.createComponentVNode)(2, a.Button.Checkbox, {
									checked: r,
									content: "Allow Pods",
									onClick: function () {
										return l();
									},
								}),
							],
						}),
					});
				};
				t.TerrainVehicleChoice = l;
				var d = function (e) {
					var t,
						n = e.terrain,
						r = e.typeData,
						c = e.activeToggles,
						i = e.onToggle;
					return n && null != (t = r[n].toggles) && t.length
						? (0, o.createComponentVNode)(2, a.Section, {
								title: "Toggles",
								children: r[n].toggles.map(function (e, t) {
									return (0, o.createComponentVNode)(
										2,
										a.Flex.Item,
										{
											mb: 1,
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: c[e],
													content: e,
													onClick: function () {
														return i(e);
													},
												}
											),
										},
										t
									);
								}),
						  })
						: "";
				};
				t.TerrainToggles = d;
				var u = function (e) {
					var t = e.terrain,
						n = e.typeData,
						r = e.activeOptions,
						c = e.onSelect;
					return t && n[t].options && Object.keys(n[t].options).length
						? Object.keys(n[t].options).map(function (e, i) {
								return (0, o.createComponentVNode)(
									2,
									a.Section,
									{
										title: e,
										children: n[t].options[e].map(function (t, n) {
											return (0, o.createComponentVNode)(
												2,
												a.Flex.Item,
												{
													mb: 1,
													children: (0, o.createComponentVNode)(2, a.Button, {
														fluid: !0,
														selected: r[e] === t,
														onClick: function () {
															return c(e, t);
														},
														children: t,
													}),
												},
												n
											);
										}),
									},
									i
								);
						  })
						: "";
				};
				t.TerrainOptions = u;
				t.Terrainify = function (e, t) {
					var n = (0, r.useBackend)(t),
						m = n.act,
						s = n.data,
						p = s.typeData,
						h = s.terrain,
						C = s.fabricator,
						N = s.cars,
						V = s.allowVehicles,
						f = s.locked,
						g = s.activeOptions,
						b = s.activeToggles;
					return (0, o.createComponentVNode)(2, c.Window, {
						title: "Terrainify",
						width: 500,
						height: 600,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							scrollable: !0,
							children: (0, o.createComponentVNode)(2, a.Section, {
								title: (0, o.createComponentVNode)(2, a.Box, {
									inline: !0,
									children: "Terrainify",
								}),
								children: [
									(0, o.createComponentVNode)(2, a.Flex, {
										direction: "row",
										children: [
											(0, o.createComponentVNode)(2, i, {
												typeData: p,
												terrain: h,
												onTerrainValue: function (e) {
													m("terrain", { terrain: e });
												},
											}),
											(0, o.createComponentVNode)(2, a.Flex.Item, { ml: 2 }),
											(0, o.createComponentVNode)(2, a.Flex.Item, {
												ml: 1,
												children: [
													(0, o.createComponentVNode)(2, a.Section, {
														title: "Description",
														children: h ? p[h].description : "...",
													}),
													(0, o.createComponentVNode)(2, l, {
														fabricator: C,
														cars: N,
														allowVehicles: V,
														onToggleAllowVehicles: function () {
															m("allowVehicles");
														},
														onToggleFabricators: function () {
															m("fabricator");
														},
														onToggleCars: function () {
															m("cars");
														},
													}),
													(0, o.createComponentVNode)(2, d, {
														typeData: p,
														terrain: h,
														activeToggles: b,
														onToggle: function (e) {
															m("toggle", { toggle: e });
														},
													}),
													(0, o.createComponentVNode)(2, u, {
														typeData: p,
														terrain: h,
														activeOptions: g,
														onSelect: function (e, t) {
															m("option", { key: e, value: t });
														},
													}),
												],
											}),
										],
									}),
									(0, o.createComponentVNode)(2, a.Box, {
										m: 1,
										children: (0, o.createComponentVNode)(2, a.Button, {
											fluid: !0,
											disabled: f,
											onClick: function () {
												return m("activate");
											},
											children: "Transform Station",
										}),
									}),
								],
							}),
						}),
					});
				};
			},
			9735: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.TextInputModal = void 0);
				var o = n(39812),
					r = n(65923),
					a = n(56443),
					c = n(71494),
					i = n(29708),
					l = n(74814),
					d = n(85952);
				t.TextInputModal = function (e, t) {
					var n = (0, c.useBackend)(t).data,
						i = n.max_length,
						s = n.message,
						p = n.multiline,
						h = n.placeholder,
						C = n.timeout,
						N = n.title,
						V = (0, c.useSharedState)(t, "input", h),
						f = V[0],
						g = V[1],
						b = (0, c.useSharedState)(t, "inputIsValid", {
							isValid: !!s.length,
							error: null,
						}),
						v = b[0],
						k = b[1],
						x = 130 + Math.ceil(s.length / 5) + (p ? 75 : 0);
					return (0, o.createComponentVNode)(2, d.Window, {
						title: N,
						width: 325,
						height: x,
						children: [
							C && (0, o.createComponentVNode)(2, r.Loader, { value: C }),
							(0, o.createComponentVNode)(2, d.Window.Content, {
								children: (0, o.createComponentVNode)(2, l.Section, {
									fill: !0,
									children: (0, o.createComponentVNode)(2, l.Stack, {
										fill: !0,
										vertical: !0,
										children: [
											(0, o.createComponentVNode)(2, l.Stack.Item, {
												children: (0, o.createComponentVNode)(2, l.Box, {
													color: "label",
													children: s,
												}),
											}),
											(0, o.createComponentVNode)(2, u, {
												input: f,
												inputIsValid: v,
												onType: function (e) {
													e.preventDefault();
													var t = e.target;
													k(m(t.value, i)), g(t.value);
												},
											}),
											(0, o.createComponentVNode)(2, l.Stack.Item, {
												pl: 5,
												pr: 5,
												children: (0, o.createComponentVNode)(
													2,
													a.InputButtons,
													{ input: f, inputIsValid: v }
												),
											}),
										],
									}),
								}),
							}),
						],
					});
				};
				var u = function (e, t) {
						var n = (0, c.useBackend)(t),
							r = n.act,
							a = n.data.multiline,
							d = e.input,
							u = e.inputIsValid,
							m = e.onType;
						return a
							? (0, o.createComponentVNode)(2, l.Stack.Item, {
									grow: !0,
									children: (0, o.createComponentVNode)(2, l.TextArea, {
										autoFocus: !0,
										height: "100%",
										onInput: function (e) {
											return m(e);
										},
										onKeyDown: function (e) {
											(window.event ? e.which : e.keyCode) === i.KEY_ENTER &&
												u &&
												r("submit", { entry: d });
										},
										placeholder: "Type something...",
										value: d,
									}),
							  })
							: (0, o.createComponentVNode)(2, l.Stack.Item, {
									children: (0, o.createComponentVNode)(2, l.Input, {
										autoFocus: !0,
										fluid: !0,
										onInput: function (e) {
											return m(e);
										},
										onKeyDown: function (e) {
											(window.event ? e.which : e.keyCode) === i.KEY_ENTER &&
												u &&
												r("submit", { entry: d });
										},
										placeholder: "Type something...",
										value: d,
									}),
							  });
					},
					m = function (e, t) {
						return t && e.length > t
							? { isValid: !1, error: "Too long!" }
							: 0 === e.length
							? { isValid: !1, error: null }
							: { isValid: !0, error: null };
					};
			},
			94936: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Timer = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814),
					c = n(85952),
					i = n(58083);
				t.Timer = function (e, t) {
					var n = (0, r.useBackend)(t),
						l = n.data,
						d = n.act,
						u = function (e) {
							d("set-time", { value: 10 * e });
						},
						m = function (e) {
							return (0, i.formatTime)(10 * e);
						};
					return (0, o.createComponentVNode)(2, c.Window, {
						width: "280",
						height: "200",
						title: l.name,
						children: (0, o.createComponentVNode)(2, c.Window.Content, {
							children: (0, o.createComponentVNode)(2, a.Section, {
								children: (0, o.createComponentVNode)(2, a.LabeledList, {
									children: [
										!!l.armButton &&
											(0, o.createComponentVNode)(2, a.LabeledList.Item, {
												label: "Armed",
												children: (0, o.createComponentVNode)(
													2,
													a.Button.Checkbox,
													{
														checked: l.armed,
														onClick: function () {
															return d("toggle-armed");
														},
														children: l.armed ? "Armed" : "Not armed",
													}
												),
											}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Timing",
											children: (0, o.createComponentVNode)(
												2,
												a.Button.Checkbox,
												{
													checked: l.timing,
													onClick: function () {
														return d("toggle-timing");
													},
													children: l.timing ? "Timing" : "Not timing",
												}
											),
										}),
										(0, o.createComponentVNode)(2, a.LabeledList.Item, {
											label: "Time",
											children: (0, o.createComponentVNode)(2, a.Stack, {
												align: "center",
												children: [
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(2, a.Knob, {
															animated: !0,
															value: l.time,
															minValue: l.minTime,
															maxValue: 600,
															stepPixelSize: 1,
															format: m,
															onDrag: function (e, t) {
																return u(t);
															},
															onChange: function (e, t) {
																return u(t);
															},
														}),
													}),
													(0, o.createComponentVNode)(2, a.Stack.Item, {
														children: (0, o.createComponentVNode)(
															2,
															a.AnimatedNumber,
															{ value: l.time, format: m }
														),
													}),
												],
											}),
										}),
									],
								}),
							}),
						}),
					});
				};
			},
			46669: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.TurretControl = void 0);
				var o = n(39812),
					r = n(85952),
					a = n(71494),
					c = n(74814),
					i = n(32942),
					l = n(67113),
					d = function (e) {
						for (var t = [], n = 0; n < e; n++)
							Math.random() > 0.3 ? t.push("Kill. ") : t.push("KILL. ");
						return t.map(function (e, t) {
							return (0,
							o.createComponentVNode)(2, c.Box, { inline: !0, preserveWhitespace: !0, fontSize: (0, i.randInt)(11, 25) + "px", children: e }, t);
						});
					};
				t.TurretControl = function (e, t) {
					var n = (0, a.useBackend)(t),
						i = n.act,
						u = n.data,
						m = u.enabled,
						s = u.lethal,
						p = u.emagged,
						h = u.area,
						C = u.locked,
						N = function (e) {
							i("setLethal", { lethal: e });
						},
						V = function (e) {
							i("setEnabled", { enabled: e });
						};
					return (0, o.createComponentVNode)(2, r.Window, {
						title: p ? "FATAL ERROR" : "Turret control (" + h + ")",
						theme: p ? "syndicate" : "ntos",
						width: 400,
						height: 160,
						children: (0, o.createComponentVNode)(2, r.Window.Content, {
							align: "center",
							children: (0, o.createComponentVNode)(2, c.Box, {
								py: "6px",
								children: [
									!p &&
										!C &&
										(0, o.createComponentVNode)(2, c.Box, {
											fontSize: "16px",
											children: [
												(0, o.createComponentVNode)(2, c.Section, {
													width: "70%",
													children: (0, o.createComponentVNode)(2, c.Stack, {
														children: [
															(0, o.createComponentVNode)(2, c.Stack.Item, {
																width: "50%",
																children: (0, o.createComponentVNode)(
																	2,
																	c.Button,
																	{
																		icon: "exclamation-triangle",
																		fluid: !0,
																		selected: m,
																		onClick: function () {
																			return V(!0);
																		},
																		children: "Enabled",
																	}
																),
															}),
															(0, o.createComponentVNode)(2, c.Stack.Item, {
																width: "50%",
																children: (0, o.createComponentVNode)(
																	2,
																	c.Button,
																	{
																		icon: "power-off",
																		fluid: !0,
																		selected: !m,
																		onClick: function () {
																			return V(!1);
																		},
																		children: "Disabled",
																	}
																),
															}),
														],
													}),
												}),
												(0, o.createComponentVNode)(2, c.Section, {
													width: "70%",
													children: (0, o.createComponentVNode)(2, c.Stack, {
														children: [
															(0, o.createComponentVNode)(2, c.Stack.Item, {
																width: "50%",
																children: (0, o.createComponentVNode)(
																	2,
																	c.Button,
																	{
																		icon: "bolt",
																		fluid: !0,
																		selected: !s,
																		onClick: function () {
																			return N(!1);
																		},
																		children: "Stun",
																	}
																),
															}),
															(0, o.createComponentVNode)(2, c.Stack.Item, {
																width: "50%",
																children: (0, o.createComponentVNode)(
																	2,
																	c.Button,
																	{
																		icon: "skull-crossbones",
																		fluid: !0,
																		selected: s,
																		onClick: function () {
																			return N(!0);
																		},
																		children: "Lethal",
																	}
																),
															}),
														],
													}),
												}),
											],
										}),
									!p &&
										!!C &&
										(0, o.createComponentVNode)(2, c.Section, {
											children: "Panel locked, swipe ID card to unlock.",
										}),
									!!p &&
										(0, o.createComponentVNode)(2, c.Box, {
											py: "20px",
											children: [
												(0, o.createComponentVNode)(2, c.Box, {
													align: "center",
													fontFamily: "Courier New",
													children: (0, l.glitch)(
														"ERROR: UNABLE TO READ AUTHORIZATION",
														12
													),
												}),
												(0, o.createComponentVNode)(2, c.Box, {
													align: "center",
													style: { "font-size": "20px" },
													children: d(7),
												}),
											],
										}),
								],
							}),
						}),
					});
				};
			},
			2861: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.WeaponVendor = void 0);
				var o = n(39812),
					r = n(2497),
					a = n(71494),
					c = n(74814),
					i = n(85952),
					l = n(67113);
				t.WeaponVendor = function (e, t) {
					var n = (0, a.useBackend)(t).data,
						r = (0, a.useLocalState)(t, "filter-available", !1),
						u = r[0],
						m = r[1];
					return (0, o.createComponentVNode)(2, i.Window, {
						width: 550,
						height: 700,
						children: (0, o.createComponentVNode)(2, i.Window.Content, {
							children: (0, o.createComponentVNode)(2, c.Stack, {
								className: "WeaponVendor",
								vertical: !0,
								fill: !0,
								children: [
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										children: (0, o.createComponentVNode)(2, c.Section, {
											fill: !0,
											children: (0, o.createComponentVNode)(2, c.LabeledList, {
												children: (0, o.createComponentVNode)(
													2,
													c.LabeledList.Item,
													{
														label: "Balance",
														children: Object.entries(n.credits).map(function (
															e,
															t
														) {
															var r = e[0],
																a = e[1];
															return (0, o.createComponentVNode)(
																2,
																c.Box,
																{
																	inline: !0,
																	mr: "5px",
																	className: "WeaponVendor__Credits--" + r,
																	children: [
																		a,
																		" ",
																		r,
																		" ",
																		(0, l.pluralize)("credit", a),
																		t + 1 !== Object.keys(n.credits).length
																			? ", "
																			: "",
																	],
																},
																r
															);
														}),
													}
												),
											}),
										}),
									}),
									(0, o.createComponentVNode)(2, c.Stack.Item, {
										grow: 1,
										children: (0, o.createComponentVNode)(2, c.Section, {
											fill: !0,
											scrollable: !0,
											title: "Materiel",
											buttons: (0, o.createComponentVNode)(
												2,
												c.Button.Checkbox,
												{
													checked: u,
													onClick: function () {
														return m(!u);
													},
													children: "Filter Available",
												}
											),
											children: Object.keys(n.credits).map(function (e) {
												return (0,
												o.createComponentVNode)(2, d, { category: e, filterAvailable: u }, e);
											}),
										}),
									}),
								],
							}),
						}),
					});
				};
				var d = function (e, t) {
						var n = e.category,
							i = e.filterAvailable,
							l = (0, a.useBackend)(t).data,
							d = l.stock.filter(function (e) {
								return e.category === n;
							});
						return (
							i &&
								(d = d.filter(function (e) {
									return e.cost <= l.credits[e.category];
								})),
							0 === d.length
								? null
								: (0, o.createComponentVNode)(2, c.Collapsible, {
										className: "WeaponVendor__Category--" + n,
										title: (0, r.toTitleCase)(n),
										open: !0,
										color: n,
										children: (0, o.createComponentVNode)(2, c.Table, {
											children: l.stock
												.filter(function (e) {
													return e.category === n;
												})
												.map(function (e) {
													return (0,
													o.createComponentVNode)(2, u, { stock: e }, e.name);
												}),
										}),
								  })
						);
					},
					u = function (e, t) {
						var n = e.stock,
							r = (0, a.useBackend)(t),
							i = r.data,
							d = r.act;
						return (0, o.createComponentVNode)(2, c.Table.Row, {
							className: "WeaponVendor__Row",
							opacity: n.cost > i.credits[n.category] ? 0.5 : 1,
							children: [
								(0, o.createComponentVNode)(2, c.Table.Cell, {
									className: "WeaponVendor__Cell",
									py: "5px",
									children: [
										(0, o.createComponentVNode)(2, c.Box, {
											mb: "5px",
											bold: !0,
											children: n.name,
										}),
										(0, o.createComponentVNode)(2, c.Box, {
											children: n.description,
										}),
									],
								}),
								(0, o.createComponentVNode)(2, c.Table.Cell, {
									className: "WeaponVendor__Cell",
									py: "5px",
									textAlign: "right",
									children: (0, o.createComponentVNode)(2, c.Button, {
										disabled: n.cost > i.credits[n.category],
										color: n.category,
										onClick: function () {
											return d("redeem", { ref: n.ref });
										},
										children: [
											"Redeem ",
											n.cost,
											" ",
											(0, l.pluralize)("credit", n.cost),
										],
									}),
								}),
							],
						});
					};
			},
			19606: function () {},
			48229: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.BeakerContents = void 0);
				var o = n(39812),
					r = n(74814);
				t.BeakerContents = function (e) {
					var t = e.beakerLoaded,
						n = e.beakerContents;
					return (0, o.createComponentVNode)(2, r.Box, {
						children: [
							(!t &&
								(0, o.createComponentVNode)(2, r.Box, {
									color: "label",
									children: "No beaker loaded.",
								})) ||
								(0 === n.length &&
									(0, o.createComponentVNode)(2, r.Box, {
										color: "label",
										children: "Beaker is empty.",
									})),
							n.map(function (e) {
								return (0,
								o.createComponentVNode)(2, r.Box, { color: "label", children: [e.volume, " units of ", e.name] }, e.name);
							}),
						],
					});
				};
			},
			77366: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.HealthStat = void 0);
				var o = n(39812),
					r = n(34380),
					a = n(76270),
					c = n(91031);
				t.HealthStat = function (e) {
					var t = e.type,
						n = e.children,
						i = e.className,
						l = (function (e, t) {
							if (null == e) return {};
							var n,
								o,
								r = {},
								a = Object.keys(e);
							for (o = 0; o < a.length; o++)
								(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
							return r;
						})(e, ["type", "children", "className"]);
					return (
						(l.color = a.COLORS.damageType[t] & a.COLORS.damageType[t]),
						(0, o.normalizeProps)(
							(0, o.createComponentVNode)(
								2,
								c.Box,
								Object.assign({}, l, {
									className: (0, r.classes)([
										"HealthStat",
										i,
										(0, c.computeBoxClassName)(l),
									]),
									color: a.COLORS.damageType[t],
									children: n,
								})
							)
						)
					);
				};
			},
			69742: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.IDCard = void 0);
				var o = n(39812),
					r = n(74814);
				t.IDCard = function (e, t) {
					if (e.card) {
						var n = e.card,
							a = e.onEject;
						return (0, o.createComponentVNode)(2, r.Button, {
							icon: "eject",
							content: n.name + " (" + n.role + ")",
							tooltip: "Clear scanned card",
							tooltipPosition: "bottom-end",
							onClick: a,
						});
					}
				};
			},
			56443: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.InputButtons = void 0);
				var o = n(39812),
					r = n(71494),
					a = n(74814);
				t.InputButtons = function (e, t) {
					var n = (0, r.useBackend)(t).act,
						c = e.input,
						i = e.inputIsValid,
						l = (0, o.createComponentVNode)(2, a.Button, {
							color: "good",
							disabled: i && !i.isValid,
							fluid: !1,
							onClick: function () {
								return n("submit", { entry: c });
							},
							pt: 0,
							textAlign: "center",
							tooltip: (null == i ? void 0 : i.error) || null,
							width: 6,
							children: "Submit",
						}),
						d = (0, o.createComponentVNode)(2, a.Button, {
							color: "bad",
							fluid: !1,
							onClick: function () {
								return n("cancel");
							},
							pt: 0,
							textAlign: "center",
							width: 6,
							children: "Cancel",
						}),
						u = l;
					return (0, o.createComponentVNode)(2, a.Stack, {
						children: [
							(0, o.createComponentVNode)(2, a.Stack.Item, { children: d }),
							(0, o.createComponentVNode)(2, a.Stack.Item, {
								grow: !0,
								children:
									i &&
									!i.isValid &&
									i.error &&
									(0, o.createComponentVNode)(2, a.Box, {
										color: "average",
										nowrap: !0,
										textAlign: "center",
										children: i.error,
									}),
							}),
							(0, o.createComponentVNode)(2, a.Stack.Item, { children: u }),
						],
					});
				};
			},
			65224: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ListSearch = void 0);
				var o = n(39812),
					r = n(34380),
					a = n(74814);
				t.ListSearch = function (e) {
					var t = e.autoFocus,
						n = e.className,
						c = e.currentSearch,
						i = e.noResultsPlaceholder,
						l = e.onSearch,
						d = e.onSelect,
						u = e.options,
						m = e.searchPlaceholder,
						s = void 0 === m ? "Search..." : m,
						p = e.selectedOption,
						h = void 0 === p ? null : p,
						C = (0, r.classes)(["list-search-interface", n]);
					return (0, o.createComponentVNode)(2, a.Stack, {
						className: C,
						vertical: !0,
						children: [
							(0, o.createComponentVNode)(2, a.Stack.Item, {
								children: (0, o.createComponentVNode)(2, a.Input, {
									autoFocus: t,
									fluid: !0,
									onInput: function (e, t) {
										l(t);
									},
									placeholder: s,
									value: c,
								}),
							}),
							(0, o.createComponentVNode)(2, a.Stack.Item, {
								children: [
									0 === u.length &&
										(0, o.createComponentVNode)(2, a.Placeholder, {
											mx: 1,
											py: 0.5,
											children: i,
										}),
									u.map(function (e) {
										return (0, o.createVNode)(
											1,
											"div",
											(0, r.classes)([
												"list-search-interface__search-option",
												"Button",
												"Button--fluid",
												"Button--color--transparent",
												"Button--ellipsis",
												h && e === h && "Button--selected",
											]),
											e,
											0,
											{
												onClick: function () {
													return d(e);
												},
												title: e,
											},
											e
										);
									}),
								],
							}),
						],
					});
				};
			},
			65923: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.Loader = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(41860);
				t.Loader = function (e) {
					var t = e.value;
					return (0, o.createVNode)(
						1,
						"div",
						"AlertModal__Loader",
						(0, o.createComponentVNode)(2, r.Box, {
							className: "AlertModal__LoaderProgress",
							style: { width: 100 * (0, a.clamp01)(t) + "%" },
						}),
						2
					);
				};
			},
			34227: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.PortableHoldingTank = t.PortableBasicInfo = void 0);
				var o = n(39812),
					r = n(74814),
					a = n(58083);
				t.PortableBasicInfo = function (e) {
					var t = e.connected,
						n = e.pressure,
						c = e.maxPressure,
						i = e.children;
					return (0, o.createComponentVNode)(2, r.Section, {
						title: "Status",
						children: [
							(0, o.createComponentVNode)(2, r.LabeledList, {
								children: [
									(0, o.createComponentVNode)(2, r.LabeledList.Item, {
										label: "Pressure",
										children: (0, o.createComponentVNode)(2, r.RoundGauge, {
											size: 1.75,
											value: n,
											minValue: 0,
											maxValue: c,
											alertAfter: 0.7 * c,
											ranges: {
												good: [0, 0.7 * c],
												average: [0.7 * c, 0.85 * c],
												bad: [0.85 * c, c],
											},
											format: a.formatPressure,
										}),
									}),
									(0, o.createComponentVNode)(2, r.LabeledList.Item, {
										label: "Port",
										color: t ? "good" : "average",
										children: t ? "Connected" : "Not Connected",
									}),
								],
							}),
							i,
						],
					});
				};
				t.PortableHoldingTank = function (e) {
					var t = e.holding,
						n = e.onEjectTank;
					return (0, o.createComponentVNode)(2, r.Section, {
						title: "Holding Tank",
						minHeight: "115px",
						buttons: (0, o.createComponentVNode)(2, r.Button, {
							icon: "eject",
							content: "Eject",
							disabled: !t,
							onClick: function () {
								return n();
							},
						}),
						children: t
							? (0, o.createComponentVNode)(2, r.LabeledList, {
									children: [
										(0, o.createComponentVNode)(2, r.LabeledList.Item, {
											label: "Pressure",
											children: (0, o.createComponentVNode)(2, r.RoundGauge, {
												size: 1.75,
												value: t.pressure,
												minValue: 0,
												maxValue: t.maxPressure,
												alertAfter: 0.7 * t.maxPressure,
												ranges: {
													good: [0, 0.7 * t.maxPressure],
													average: [0.7 * t.maxPressure, 0.85 * t.maxPressure],
													bad: [0.85 * t.maxPressure, t.maxPressure],
												},
												format: a.formatPressure,
											}),
										}),
										(0, o.createComponentVNode)(2, r.LabeledList.Item, {
											label: "Label",
											children: t.name,
										}),
									],
							  })
							: (0, o.createComponentVNode)(2, r.Box, {
									color: "average",
									children: "No holding tank",
							  }),
					});
				};
			},
			23827: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.ReagentList = t.ReagentGraph = t.NoContainer = void 0);
				var o = n(39812),
					r = n(74814);
				function a(e, t) {
					if (null == e) return {};
					var n,
						o,
						r = {},
						a = Object.keys(e);
					for (o = 0; o < a.length; o++)
						(n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
					return r;
				}
				var c = {
					name: "No Beaker Inserted",
					id: "inserted",
					maxVolume: 100,
					totalVolume: 0,
					finalColor: "#000000",
					temperature: n(46473).freezeTemperature,
					fake: !0,
				};
				t.NoContainer = c;
				var i = function (e) {
					e.className;
					var t = e.container,
						n = e.height,
						c = a(e, ["className", "container", "height"]),
						i = t.maxVolume,
						l = t.totalVolume,
						d = t.finalColor,
						u = t.contents || [];
					return (
						(c.height = n || "50px"),
						(0, o.normalizeProps)(
							(0, o.createComponentVNode)(
								2,
								r.Box,
								Object.assign({}, c, {
									children: (0, o.createComponentVNode)(2, r.Flex, {
										height: "100%",
										direction: "column",
										children: [
											(0, o.createComponentVNode)(2, r.Flex.Item, {
												grow: !0,
												children: (0, o.createComponentVNode)(2, r.Flex, {
													height: "100%",
													children: [
														u.map(function (e) {
															return (0,
															o.createComponentVNode)(2, r.Flex.Item, { grow: e.volume / i, children: (0, o.createComponentVNode)(2, r.Tooltip, { content: e.name + " (" + e.volume + "u)", position: "bottom", children: (0, o.createComponentVNode)(2, r.Box, { px: 0, my: 0, height: "100%", backgroundColor: "rgb(" + e.colorR + ", " + e.colorG + ", " + e.colorB + ")" }) }) }, e.id);
														}),
														(0, o.createComponentVNode)(2, r.Flex.Item, {
															grow: (i - l) / i,
															children: (0, o.createComponentVNode)(
																2,
																r.Tooltip,
																{
																	content: "Nothing (" + (i - l) + "u)",
																	position: "bottom",
																	children: (0, o.createComponentVNode)(
																		2,
																		r.NoticeBox,
																		{
																			px: 0,
																			my: 0,
																			height: "100%",
																			backgroundColor: "rgba(0, 0, 0, 0)",
																		}
																	),
																}
															),
														}),
													],
												}),
											}),
											(0, o.createComponentVNode)(2, r.Flex.Item, {
												children: (0, o.createComponentVNode)(2, r.Tooltip, {
													content: (0, o.createComponentVNode)(2, r.Box, {
														children: [
															(0, o.createComponentVNode)(2, r.ColorBox, {
																color: d,
															}),
															" Current Mixture Color",
														],
													}),
													position: "bottom",
													children: (0, o.createComponentVNode)(2, r.Box, {
														height: "14px",
														backgroundColor: u.length
															? d
															: "rgba(0, 0, 0, 0.1)",
														textAlign: "center",
														children:
															t.fake ||
															(0, o.createComponentVNode)(2, r.Box, {
																as: "span",
																backgroundColor: "rgba(0, 0, 0, 0.5)",
																px: 1,
																children: l + "/" + i,
															}),
													}),
												}),
											}),
										],
									}),
								})
							)
						)
					);
				};
				t.ReagentGraph = i;
				var l = function (e) {
					e.className;
					var t = e.container,
						n = e.renderButtons,
						c = e.height,
						i = a(e, ["className", "container", "renderButtons", "height"]),
						l = t.contents || [];
					return (
						(i.height = c || 6),
						(0, o.createComponentVNode)(2, r.Section, {
							scrollable: !0,
							children: (0, o.normalizeProps)(
								(0, o.createComponentVNode)(
									2,
									r.Box,
									Object.assign({}, i, {
										children: l.length
											? l.map(function (e) {
													return (0,
													o.createComponentVNode)(2, r.Flex, { mb: 0.5, align: "center", children: [(0, o.createComponentVNode)(2, r.Flex.Item, { grow: !0, children: [(0, o.createComponentVNode)(2, r.Icon, { pr: 0.9, name: "circle", style: { "text-shadow": "0 0 3px #000;" }, color: "rgb(" + e.colorR + ", " + e.colorG + ", " + e.colorB + ")" }), "( " + e.volume + "u ) " + e.name] }), n && (0, o.createComponentVNode)(2, r.Flex.Item, { nowrap: !0, children: n(e) })] }, e.id);
											  })
											: (0, o.createComponentVNode)(2, r.Box, {
													color: "label",
													children: [
														(0, o.createComponentVNode)(2, r.Icon, {
															pr: 0.9,
															name: "circle-o",
															style: { "text-shadow": "0 0 3px #000;" },
														}),
														"Empty",
													],
											  }),
									})
								)
							),
						})
					);
				};
				t.ReagentList = l;
				var d = function (e, t) {
						return (
							e.volume !== t.volume ||
							e.name !== t.name ||
							e.id !== t.id ||
							e.colorR !== t.colorR ||
							e.colorG !== t.colorG ||
							e.colorB !== t.colorB
						);
					},
					u = function (e, t) {
						var n;
						for (n in e) if ("container" !== n && !(n in t)) return !0;
						for (n in t) if ("container" !== n && e[n] !== t[n]) return !0;
						return (function (e, t) {
							var n, o;
							if (e === t) return !1;
							if (null === e || null === t) return !0;
							if (
								e.totalVolume !== t.totalVolume ||
								e.finalColor !== t.finalColor ||
								e.maxVolume !== t.maxVolume
							)
								return !0;
							if (
								(null == (n = e.contents) ? void 0 : n.length) !==
								(null == (o = t.contents) ? void 0 : o.length)
							)
								return !0;
							for (var r in e) if (d(e[r], t[r])) return !0;
							return !1;
						})(e.container, t.container);
					};
				(i.defaultHooks = {
					onComponentShouldUpdate: function (e, t) {
						return u(e, t);
					},
				}),
					(l.defaultHooks = {
						onComponentShouldUpdate: function (e, t) {
							return u(e, t);
						},
					});
			},
			988: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.ReleaseValve = void 0);
				var o = n(39812),
					r = n(74814);
				t.ReleaseValve = function (e) {
					var t = e.valveIsOpen,
						n = e.releasePressure,
						a = void 0 === n ? 0 : n,
						c = e.minRelease,
						i = void 0 === c ? 0 : c,
						l = e.maxRelease,
						d = void 0 === l ? 0 : l,
						u = e.onToggleValve,
						m = e.onSetPressure;
					return (0, o.createComponentVNode)(2, r.LabeledList, {
						children: [
							(0, o.createComponentVNode)(2, r.LabeledList.Item, {
								label: "Release valve",
								children: (0, o.createComponentVNode)(2, r.Button, {
									content: t ? "Open" : "Closed",
									color: t ? "average" : "default",
									onClick: u,
								}),
							}),
							(0, o.createComponentVNode)(2, r.LabeledList.Item, {
								label: "Release pressure",
								children: [
									(0, o.createComponentVNode)(2, r.Button, {
										onClick: function () {
											return m(i);
										},
										content: "Min",
									}),
									(0, o.createComponentVNode)(2, r.NumberInput, {
										animated: !0,
										width: "7em",
										value: a,
										minValue: i,
										maxValue: d,
										onChange: function (e, t) {
											return m(t);
										},
									}),
									(0, o.createComponentVNode)(2, r.Button, {
										onClick: function () {
											return m(d);
										},
										content: "Max",
									}),
								],
							}),
						],
					});
				};
			},
			32942: function (e, t) {
				"use strict";
				(t.__esModule = !0), (t.randInt = void 0);
				t.randInt = function (e, t) {
					return Math.floor(Math.random() * (t - e + 1)) + e;
				};
			},
			67113: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.glitch = t.capitalize = t.pluralize = void 0);
				var o = n(32942);
				t.pluralize = function (e, t) {
					return 1 !== t ? e + "s" : e;
				};
				t.capitalize = function (e) {
					return e.replace(/(^\w{1})|(\s+\w{1})/g, function (e) {
						return e.toUpperCase();
					});
				};
				var r = [
					"$",
					"{",
					"]",
					"%",
					"^",
					"?",
					">",
					"\xac",
					"\u03c0",
					";",
					"\u0438",
					"\u046b",
					"/",
					"#",
					"~",
				];
				t.glitch = function (e, t) {
					for (var n = e.split(""), a = 0; a < t; a++) {
						n[(0, o.randInt)(0, n.length ? n.length - 1 : 0)] =
							r[(0, o.randInt)(0, r.length - 1)];
					}
					return n.join("");
				};
			},
			46473: function (e, t, n) {
				"use strict";
				(t.__esModule = !0),
					(t.getTemperatureChangeName =
						t.getTemperatureIcon =
						t.getTemperatureColor =
						t.neutralTemperature =
						t.freezeTemperature =
						t.TemperatureColors =
							void 0);
				var o = n(8397),
					r = {
						cold: new o.Color(66, 194, 255),
						neutral: new o.Color(170, 170, 170),
						hot: new o.Color(255, 120, 0),
						veryhot: new o.Color(255, 0, 0),
					};
				t.TemperatureColors = r;
				t.freezeTemperature = 273.15;
				var a = 293.15;
				t.neutralTemperature = a;
				var c = 493.15;
				t.getTemperatureColor = function (e) {
					var t = r.cold,
						n = r.neutral,
						i = r.hot,
						l = r.veryhot;
					return e < c
						? o.Color.lookup((e - a) / 400 + 0.5, [t, n, i])
						: o.Color.lookup((e - c) / 506.85, [i, l]);
				};
				t.getTemperatureIcon = function (e) {
					switch (Math.round(e / 200)) {
						case 0:
							return "thermometer-empty";
						case 1:
							return "thermometer-quarter";
						case 2:
							return "thermometer-half";
						case 3:
							return "thermometer-three-quarters";
						default:
							return "thermometer-full";
					}
				};
				t.getTemperatureChangeName = function (e, t) {
					return e < t ? "heating" : e > t ? "cooling" : "neutral";
				};
			},
			73218: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.getRoutedComponent = void 0);
				var o = n(39812),
					r = n(71494),
					a = (n(30098), n(85952)),
					c = n(8156),
					i = function (e, t) {
						return function () {
							return (0, o.createComponentVNode)(2, a.Window, {
								children: (0, o.createComponentVNode)(2, a.Window.Content, {
									scrollable: !0,
									children: [
										"notFound" === e &&
											(0, o.createVNode)(
												1,
												"div",
												null,
												[
													(0, o.createTextVNode)("Interface "),
													(0, o.createVNode)(1, "b", null, t, 0),
													(0, o.createTextVNode)(" was not found."),
												],
												4
											),
										"missingExport" === e &&
											(0, o.createVNode)(
												1,
												"div",
												null,
												[
													(0, o.createTextVNode)("Interface "),
													(0, o.createVNode)(1, "b", null, t, 0),
													(0, o.createTextVNode)(" is missing an export."),
												],
												4
											),
									],
								}),
							});
						};
					},
					l = function () {
						return (0, o.createComponentVNode)(2, a.Window, {
							children: (0, o.createComponentVNode)(2, a.Window.Content, {
								scrollable: !0,
							}),
						});
					};
				t.getRoutedComponent = function (e) {
					var t = e.getState(),
						n = (0, r.selectBackend)(t),
						o = n.suspended,
						a = n.config;
					if (o) return l;
					for (
						var d,
							u = null == a ? void 0 : a["interface"],
							m = [
								function (e) {
									return "./" + e + ".tsx";
								},
								function (e) {
									return "./" + e + ".js";
								},
								function (e) {
									return "./" + e + "/index.tsx";
								},
								function (e) {
									return "./" + e + "/index.js";
								},
							];
						!d && m.length > 0;

					) {
						var s = m.shift()(u);
						try {
							d = c(s);
						} catch (h) {
							if ("MODULE_NOT_FOUND" !== h.code) throw h;
						}
					}
					if (!d) return i("notFound", u);
					var p = d[u];
					return p || i("missingExport", u);
				};
			},
			45452: function (e, t, n) {
				"use strict";
				(t.__esModule = !0), (t.sanitizeText = void 0);
				var o,
					r = (o = n(65054)) && o.__esModule ? o : { default: o };
				var a = [
						"b",
						"br",
						"center",
						"code",
						"div",
						"font",
						"hr",
						"i",
						"li",
						"menu",
						"ol",
						"p",
						"pre",
						"span",
						"table",
						"td",
						"th",
						"tr",
						"u",
						"ul",
					],
					c = ["class", "style"];
				t.sanitizeText = function (e, t, n) {
					return (
						void 0 === t && (t = a),
						void 0 === n && (n = c),
						r["default"].sanitize(e, { ALLOWED_TAGS: t, FORBID_ATTR: n })
					);
				};
			},
			405: function () {},
			11516: function () {},
			58594: function () {},
			92959: function () {},
			21300: function () {},
			16657: function () {},
			49081: function () {},
			30890: function () {},
			8156: function (e, t, n) {
				var o = {
					"./AIMap": 26363,
					"./AIMap.js": 26363,
					"./AIRack": 44045,
					"./AIRack.js": 44045,
					"./Airlock": 56294,
					"./Airlock.js": 56294,
					"./AlertModal": 31010,
					"./AlertModal.tsx": 31010,
					"./Apc": 11147,
					"./Apc/": 11147,
					"./Apc/AccessPanel": 39475,
					"./Apc/AccessPanel.js": 39475,
					"./Apc/PowerChannelSection": 62347,
					"./Apc/PowerChannelSection.js": 62347,
					"./Apc/Wire": 99123,
					"./Apc/Wire.js": 99123,
					"./Apc/index": 11147,
					"./Apc/index.js": 11147,
					"./ArtifactPaper": 74856,
					"./ArtifactPaper.js": 74856,
					"./AutoInjector": 42399,
					"./AutoInjector.js": 42399,
					"./BarcodeComputer": 15748,
					"./BarcodeComputer.js": 15748,
					"./BugReportForm": 93302,
					"./BugReportForm.js": 93302,
					"./CharacterPreferences": 91245,
					"./CharacterPreferences/": 91245,
					"./CharacterPreferences/CharacterTab": 26436,
					"./CharacterPreferences/CharacterTab.tsx": 26436,
					"./CharacterPreferences/GameSettingsTab": 50669,
					"./CharacterPreferences/GameSettingsTab.tsx": 50669,
					"./CharacterPreferences/GeneralTab": 94123,
					"./CharacterPreferences/GeneralTab.tsx": 94123,
					"./CharacterPreferences/SavesTab": 6489,
					"./CharacterPreferences/SavesTab.tsx": 6489,
					"./CharacterPreferences/TraitsTab": 86890,
					"./CharacterPreferences/TraitsTab.tsx": 86890,
					"./CharacterPreferences/index": 91245,
					"./CharacterPreferences/index.tsx": 91245,
					"./CharacterPreferences/type": 55958,
					"./CharacterPreferences/type.ts": 55958,
					"./ChemDispenser": 22223,
					"./ChemDispenser.js": 22223,
					"./ChemHeater": 96479,
					"./ChemHeater.js": 96479,
					"./ChemRequestReceiver": 36041,
					"./ChemRequestReceiver.js": 36041,
					"./ChemRequester": 1150,
					"./ChemRequester.js": 1150,
					"./CloningConsole": 98213,
					"./CloningConsole.js": 98213,
					"./ComUplink": 97757,
					"./ComUplink/": 97757,
					"./ComUplink/index": 97757,
					"./ComUplink/index.tsx": 97757,
					"./ComUplink/type": 26211,
					"./ComUplink/type.ts": 26211,
					"./ContributorRewards": 1430,
					"./ContributorRewards.js": 1430,
					"./CyborgModuleRewriter": 56995,
					"./CyborgModuleRewriter/": 56995,
					"./CyborgModuleRewriter/EmptyPlaceholder": 6499,
					"./CyborgModuleRewriter/EmptyPlaceholder.tsx": 6499,
					"./CyborgModuleRewriter/ModuleView": 43173,
					"./CyborgModuleRewriter/ModuleView/": 43173,
					"./CyborgModuleRewriter/ModuleView/Module": 46839,
					"./CyborgModuleRewriter/ModuleView/Module.tsx": 46839,
					"./CyborgModuleRewriter/ModuleView/Tools": 33494,
					"./CyborgModuleRewriter/ModuleView/Tools.tsx": 33494,
					"./CyborgModuleRewriter/ModuleView/index": 43173,
					"./CyborgModuleRewriter/ModuleView/index.tsx": 43173,
					"./CyborgModuleRewriter/action": 92833,
					"./CyborgModuleRewriter/action.ts": 92833,
					"./CyborgModuleRewriter/index": 56995,
					"./CyborgModuleRewriter/index.tsx": 56995,
					"./CyborgModuleRewriter/style": 90769,
					"./CyborgModuleRewriter/style.ts": 90769,
					"./CyborgModuleRewriter/type": 46866,
					"./CyborgModuleRewriter/type.ts": 46866,
					"./DJPanel": 40555,
					"./DJPanel.js": 40555,
					"./DisposalChute": 94055,
					"./DisposalChute/": 94055,
					"./DisposalChute/index": 94055,
					"./DisposalChute/index.tsx": 94055,
					"./DisposalChute/type": 37316,
					"./DisposalChute/type.ts": 37316,
					"./DoorTimer": 57013,
					"./DoorTimer/": 57013,
					"./DoorTimer/index": 57013,
					"./DoorTimer/index.tsx": 57013,
					"./DoorTimer/type": 70156,
					"./DoorTimer/type.ts": 70156,
					"./EngineStats": 47239,
					"./EngineStats.js": 47239,
					"./Filteriffic": 43540,
					"./Filteriffic.js": 43540,
					"./FlockPanel": 74036,
					"./FlockPanel.js": 74036,
					"./Freezer": 56964,
					"./Freezer.tsx": 56964,
					"./GasCanister": 73981,
					"./GasCanister/": 73981,
					"./GasCanister/Detonator": 48265,
					"./GasCanister/Detonator.js": 48265,
					"./GasCanister/DetonatorTimer": 37383,
					"./GasCanister/DetonatorTimer.js": 37383,
					"./GasCanister/index": 73981,
					"./GasCanister/index.js": 73981,
					"./GasTank": 84183,
					"./GasTank.js": 84183,
					"./GeneTek": 93823,
					"./GeneTek.js": 93823,
					"./GeneTek/": 10307,
					"./GeneTek/AppearanceEditor": 40909,
					"./GeneTek/AppearanceEditor.js": 40909,
					"./GeneTek/BioEffect": 66673,
					"./GeneTek/BioEffect.js": 66673,
					"./GeneTek/DNASequence": 41941,
					"./GeneTek/DNASequence.js": 41941,
					"./GeneTek/GeneIcon": 24451,
					"./GeneTek/GeneIcon.js": 24451,
					"./GeneTek/index": 10307,
					"./GeneTek/index.js": 10307,
					"./GeneTek/modals/BuyMaterialsModal": 71891,
					"./GeneTek/modals/BuyMaterialsModal.js": 71891,
					"./GeneTek/modals/CombineGenesModal": 14424,
					"./GeneTek/modals/CombineGenesModal.js": 14424,
					"./GeneTek/modals/UnlockModal": 4285,
					"./GeneTek/modals/UnlockModal.js": 4285,
					"./GeneTek/tabs/MutationsTab": 50993,
					"./GeneTek/tabs/MutationsTab.js": 50993,
					"./GeneTek/tabs/ResearchTab": 79185,
					"./GeneTek/tabs/ResearchTab.js": 79185,
					"./GeneTek/tabs/ScannerTab": 52880,
					"./GeneTek/tabs/ScannerTab.js": 52880,
					"./GeneTek/tabs/StorageTab": 13329,
					"./GeneTek/tabs/StorageTab.js": 13329,
					"./GimmickObject": 26407,
					"./GimmickObject.js": 26407,
					"./GlassRecycler": 64791,
					"./GlassRecycler.js": 64791,
					"./HumanInventory": 14930,
					"./HumanInventory/": 14930,
					"./HumanInventory/index": 14930,
					"./HumanInventory/index.tsx": 14930,
					"./HumanInventory/types": 71798,
					"./HumanInventory/types.ts": 71798,
					"./Hypospray": 89633,
					"./Hypospray.js": 89633,
					"./Laundry": 78298,
					"./Laundry.js": 78298,
					"./ListInputModal": 617,
					"./ListInputModal.tsx": 617,
					"./LongRangeTeleporter": 71533,
					"./LongRangeTeleporter.js": 71533,
					"./MechanicalDropper": 77373,
					"./MechanicalDropper.js": 77373,
					"./MineralMagnet": 66048,
					"./MineralMagnet.js": 66048,
					"./MixingDesk": 50504,
					"./MixingDesk.js": 50504,
					"./NumberInputModal": 49937,
					"./NumberInputModal.tsx": 49937,
					"./PaperSheet": 52472,
					"./PaperSheet.js": 52472,
					"./Particool": 94633,
					"./Particool.js": 94633,
					"./PlayerPanel": 56740,
					"./PlayerPanel/": 56740,
					"./PlayerPanel/Header": 76503,
					"./PlayerPanel/Header.tsx": 76503,
					"./PlayerPanel/constant": 13939,
					"./PlayerPanel/constant.ts": 13939,
					"./PlayerPanel/index": 56740,
					"./PlayerPanel/index.tsx": 56740,
					"./PlayerPanel/type": 43307,
					"./PlayerPanel/type.ts": 43307,
					"./PortablePump": 82564,
					"./PortablePump.js": 82564,
					"./PortableScrubber": 24901,
					"./PortableScrubber.js": 24901,
					"./PowerMonitor": 6487,
					"./PowerMonitor/": 6487,
					"./PowerMonitor/Apc": 19065,
					"./PowerMonitor/Apc.tsx": 19065,
					"./PowerMonitor/Smes": 35492,
					"./PowerMonitor/Smes.tsx": 35492,
					"./PowerMonitor/index": 6487,
					"./PowerMonitor/index.tsx": 6487,
					"./PowerMonitor/type": 16253,
					"./PowerMonitor/type.ts": 16253,
					"./PowerTransmissionLaser": 7359,
					"./PowerTransmissionLaser.js": 7359,
					"./Precipitation": 9253,
					"./Precipitation.js": 9253,
					"./Pressurizer": 31979,
					"./Pressurizer.js": 31979,
					"./Radio": 61272,
					"./Radio/": 61272,
					"./Radio/index": 61272,
					"./Radio/index.tsx": 61272,
					"./Radio/type": 38913,
					"./Radio/type.ts": 38913,
					"./ReagentExtractor": 89820,
					"./ReagentExtractor.js": 89820,
					"./Rockbox": 37975,
					"./Rockbox.js": 37975,
					"./SecureSafe": 57436,
					"./SecureSafe.js": 57436,
					"./SeedFabricator": 72872,
					"./SeedFabricator.js": 72872,
					"./Sleeper": 80646,
					"./Sleeper.js": 80646,
					"./SlotMachine": 57243,
					"./SlotMachine.js": 57243,
					"./Smes": 20561,
					"./Smes.js": 20561,
					"./SpendSpacebux": 49387,
					"./SpendSpacebux.js": 49387,
					"./TEG": 36184,
					"./TEG.js": 36184,
					"./TankDispenser": 38754,
					"./TankDispenser.js": 38754,
					"./Terrainify": 53133,
					"./Terrainify.js": 53133,
					"./TextInputModal": 9735,
					"./TextInputModal.tsx": 9735,
					"./Timer": 94936,
					"./Timer.js": 94936,
					"./TurretControl": 46669,
					"./TurretControl.js": 46669,
					"./WeaponVendor": 2861,
					"./WeaponVendor/": 2861,
					"./WeaponVendor/index": 2861,
					"./WeaponVendor/index.tsx": 2861,
					"./WeaponVendor/type": 19606,
					"./WeaponVendor/type.ts": 19606,
					"./common/BeakerContents": 48229,
					"./common/BeakerContents.js": 48229,
					"./common/HealthStat": 77366,
					"./common/HealthStat.js": 77366,
					"./common/IDCard": 69742,
					"./common/IDCard.js": 69742,
					"./common/InputButtons": 56443,
					"./common/InputButtons.tsx": 56443,
					"./common/ListSearch": 65224,
					"./common/ListSearch.tsx": 65224,
					"./common/Loader": 65923,
					"./common/Loader.tsx": 65923,
					"./common/PortableAtmos": 34227,
					"./common/PortableAtmos.js": 34227,
					"./common/ReagentInfo": 23827,
					"./common/ReagentInfo.tsx": 23827,
					"./common/ReleaseValve": 988,
					"./common/ReleaseValve.js": 988,
					"./common/mathUtils": 32942,
					"./common/mathUtils.ts": 32942,
					"./common/stringUtils": 67113,
					"./common/stringUtils.ts": 67113,
					"./common/temperatureUtils": 46473,
					"./common/temperatureUtils.js": 46473,
				};
				function r(e) {
					var t = a(e);
					return n(t);
				}
				function a(e) {
					if (!n.o(o, e)) {
						var t = new Error("Cannot find module '" + e + "'");
						throw ((t.code = "MODULE_NOT_FOUND"), t);
					}
					return o[e];
				}
				(r.keys = function () {
					return Object.keys(o);
				}),
					(r.resolve = a),
					(e.exports = r),
					(r.id = 8156);
			},
		},
		n = {};
	function o(e) {
		var r = n[e];
		if (r !== undefined) return r.exports;
		var a = (n[e] = { exports: {} });
		return t[e](a, a.exports, o), a.exports;
	}
	(o.m = t),
		(e = []),
		(o.O = function (t, n, r, a) {
			if (!n) {
				var c = Infinity;
				for (d = 0; d < e.length; d++) {
					(n = e[d][0]), (r = e[d][1]), (a = e[d][2]);
					for (var i = !0, l = 0; l < n.length; l++)
						(!1 & a || c >= a) &&
						Object.keys(o.O).every(function (e) {
							return o.O[e](n[l]);
						})
							? n.splice(l--, 1)
							: ((i = !1), a < c && (c = a));
					i && (e.splice(d--, 1), (t = r()));
				}
				return t;
			}
			a = a || 0;
			for (var d = e.length; d > 0 && e[d - 1][2] > a; d--) e[d] = e[d - 1];
			e[d] = [n, r, a];
		}),
		(o.g = (function () {
			if ("object" == typeof globalThis) return globalThis;
			try {
				return this || new Function("return this")();
			} catch (e) {
				if ("object" == typeof window) return window;
			}
		})()),
		(o.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(function () {
			var e = { 764: 0 };
			o.O.j = function (t) {
				return 0 === e[t];
			};
			var t = function (t, n) {
					var r,
						a,
						c = n[0],
						i = n[1],
						l = n[2],
						d = 0;
					for (r in i) o.o(i, r) && (o.m[r] = i[r]);
					for (l && l(o), t && t(n); d < c.length; d++)
						(a = c[d]), o.o(e, a) && e[a] && e[a][0](), (e[c[d]] = 0);
					o.O();
				},
				n = (self.webpackChunktgui_workspace =
					self.webpackChunktgui_workspace || []);
			n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
		})(),
		o.O(undefined, [962], function () {
			return o(50539);
		});
	var r = o.O(undefined, [962], function () {
		return o(60121);
	});
	r = o.O(r);
})();
