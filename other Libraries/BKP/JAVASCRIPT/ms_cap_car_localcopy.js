//window.parent.window.parent.Ext.get("MultipleWindow1").mask("Please Wait until page load");
/* --------------------------------------------------- *** global variables *** ---------------------------------------------------*/
//global array for storing Tab Names and Tab ID
Tabs = {};
Tabs.DTLS = "MSAI_42"; //Details Tab
Tabs.OWN_DETLS = "MSAI_43"; //Owner ship Details
Tabs.IDNTFY_TEAM = "MSAI_99"; //Identify Team
Tabs.DFN_PRBLM = "MSAI_127"; //Define Problem
Tabs.CNTMT_ACT = "MSAI_166"; //containment Action
Tabs.ROOT_CAUSE = "MSAI_197"; //Root Cause Analysis
Tabs.CORRECTIVE_ACT = "MSAI_242"; //Corrective Action
Tabs.VERIFY_EFF = "MSAI_283"; //verify effective ness
Tabs.PREV_REC = "MSAI_313"; //prevent reccurence
Tabs.CONG_TEAM = "MSAI_350"; //congratulate Team
Tabs.ACTION = "MSAI_144"; //Action Tab
Tabs.COPQ = "MSAI_369"; //Cost of Poor Quality Tab
Tabs.FINAL = "MSAI_1323"; //Final Review Tab
var p1;
var r11 = 0;
var map_flag;
var incl_excl = 0;
editFlag = F.getFormParameter('edit_flag');
old_own = '';
inc_cnt = 0;
inc_cnt1 = 0;
opt = {};
cnt1 = 0;
cnt2 = 0;
cnt = 0;
mgr_flag = false;
pr_count = 0;
dept_count = 0;
ownerStoredName = '';
ownerDisplayValue = '';
question = 0;
p_priority = 0;
var hid_step_no = F.HID_STEP.read();
var currentStage = F.DD_CURRENT_STAGE.read();
var previousStage = F.HID_PREVIOUS_STAGE.read();
//var currentStage=F.DD_CURRENT_STAGE.read();
//alert('hid_step_no' + hid_step_no + 'currentStage' + currentStage + 'previousStage' + previousStage);


/* --------------------------------------------------- *** **************** *** ---------------------------------------------------*/
/* --------------------------------------------------- *** Onchange Events  *** ---------------------------------------------------*/
/* --------------------------------------------------- *** **************** *** ---------------------------------------------------*/

F.COPQ_AMOUNT.onChange(function (row) {
	if (((F.COPQ_AMOUNT.read(row) % 1) != 0) || (F.COPQ_AMOUNT.read(row) < 0)) {
		alert(jsAlertMessages["ENT_PSTV_NO"]);

		F.COPQ_AMOUNT.write('', row);
	}

});

//This Function is for Hiding the Tabs Based on Step and Stage
F.HID_TABS_INFO.onChange(function () {
	hideTabs();
});
//To validate TOTAL_QUANTITY to be a positive whole number
F.TOTAL_QUANTITY.onChange(function () {
	if (((F.TOTAL_QUANTITY.read() % 1) != 0) || (F.TOTAL_QUANTITY.read() < 0)) {
		alert(jsAlertMessages["ENT_PSTV_NO"]);

		F.TOTAL_QUANTITY.write('');
	}

});
//defaulting based the ownership details based on the org and priority
F.HID_OWN_TAB.onChange(function () {
	if (currentStage == 'MGR' && F.APPROVE_CAR_INITIATION.read() == 1)
		getOwnerShipDetails();

});

F.REQUESTED_FOR.onChange(function () {
	requestedForValidation();
	/*if(F.REQUESTED_FOR.read() == 1){
	var MSAI1773 = document.getElementById('MSAI_TD_PRODUCT_ID_1').innerHTML;
	document.getElementById('MSAI_TD_PRODUCT_ID_1').innerHTML = document.getElementById('MSAI_TD_TOTAL_QUANTITY_1').innerHTML;
	document.getElementById('MSAI_TD_TOTAL_QUANTITY_1').innerHTML = MSAI1773;
	}*/
});

F.CAR_CREATED_BY.onChange(function () {
	F.CAR_CREATED_BY.disable();
});

//When SOURCE_SYSTEM_ID is change then the following fields should be cleared
F.SOURCE_SYSTEM_ID.onChange(function () {
	F.ORIGIN.write("");
	F.REQUESTED_FOR.write("");
	F.THRDPRTY_ORG_NME.writeValue('', '');
	F.THRDPRTY_ORG_NME.hide();
	F.THRDPRTY_ORG_NME.makeNotRequired();
	F.PRODUCT_ID.hide();
	F.PRODUCT_ID.writeValue('', '');
	F.PRODUCT_ID.makeNotRequired();
	F.SRC_PROCESS_NAME.hide();
	F.SRC_PROCESS_NAME.writeValue('', '');
	F.SRC_PROCESS_NAME.makeNotRequired();
	F.CUSTOMER_NAME.writeValue('', '');
	F.CUSTOMER_NAME.hide();
	F.CUSTOMER_NAME.makeNotRequired();
	sourceidValidation();
	F.INTERNAL_DEPARTMENT_NAME.hide();
	F.INTERNAL_DEPARTMENT_CONTACT.hide();
	F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
	F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
});
//conditional fields hiding each step and stage
F.ORIGIN.onChange(function () {
	originBasedValidaion();
});

F.PRIMARY_EVAL_PERFORMED.onChange(function () {
	if (hid_step_no == 0 || hid_step_no == '')
		if (F.PRIMARY_EVAL_PERFORMED.read() == 1) {
			F.PRIMARY_EVAL_PERFMD_DESC.makeRequired();
		} else {
			F.PRIMARY_EVAL_PERFMD_DESC.makeNotRequired();
		}
	primaryEvaluationValidation();
});
//****If CAR Manager want to change the Organisation in  Manager stage ******/
F.RESP_DEPT.onChange(function () {
	duedatehide();
	if (currentStage == 'MGR') {
		if (r1 == F.RESP_DEPT.read())
			r11 = 1;
		//F.MANAGER.writeValue(mgrStored1, mgrDisp1);
	}

	if (currentStage == 'MGR') {

		/*dept_count++;*/
		var r2 = F.RESP_DEPT.read();
		var d2 = F.RESP_DEPT.readDisplayedValue();
		//alert(r1+''+r2);
		if (r1 != r2) {
			if (F.APPROVE_CAR_INITIATION.read() == 1) {
				var resp = confirm(jsAlertMessages["DEPT_CHANGE"]);
				if (resp) {
					clearOwnership();
					F.APPROVE_CAR_INITIATION.write('');
					//F.STP.addRow(true, true);
					F.STP.hide();
					//F.STP.allowZeroRows();
					//F.STP.deleteAllRows();
					//F.STP.makeEmpty();
					deleteStpRows();
					//F.STP.addRow(true,true);
					F.CAR_OWNER.hide();
					F.FINAL_APPROVER.hide();
					F.FINAL_APPROVER_ORG.hide();
				} else {
					F.RESP_DEPT.writeValue(r1, d1);
				}
			}
		}
	}
});

F.DUE_DATE.onChange(function () {
	if (F.DUE_DATE.read() != '' && (currentStage == '' || currentStage == 'INT')) {
		F.DUE_DATE.show();
		SetPositionOfField('DUE_DATE', 10, 4, 15);
	}
});
//****If CAR Manager want to change the Priority   Manager stage  compare previous and present priority******/
F.PRIORITY.onChange(function () {
	duedatehide();
	if (currentStage == 'MGR') {
		/*var pri[pr_count]=p1;
		pr_count++;*/
		//p3 = p1;
		var p2 = F.PRIORITY.read();
		//if (p1 != p2) {
		//getOwnerShipDetails();
		if (F.APPROVE_CAR_INITIATION.read() == 1) {
			var k = F.STP.getRowCount();
			for (var i = 1; i <= k; i++)
				F.STEP_DUE_DATE.writeValue('', '', i);
			//F.HID_RESP_DPT_DUMMY.callInfolet();
			//p3 = p2;
		}

	}

});
//onchange of CAR Manager 6th step owner should be defaulted as manager and change of manager need to select transferownership
F.MANAGER.onChange(function () {

	if (currentStage == 'MGR' && (mgrStored1 != F.MANAGER.read() && F.USER_ACTION.read() != 13) && r11 == 0 && r1 == F.RESP_DEPT.read()) {

		alert(jsAlertMessages["MGR_CHANGE_SELECT_TRANS"]);
		F.MANAGER.writeValue(mgrStored1, mgrDisp1);

	}

	F.FINAL_APPROVER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue());
	F.FINAL_APPROVER_ORG.writeValue(F.RESP_DEPT.read(), F.RESP_DEPT.readDisplayedValue());
	if (F.STP.getRowCount() > 6 && F.STEP_OWNER.read(6) == '')
		F.STEP_OWNER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue(), 6);
});

//Based on Selection From Drop Down Do you approve the initiation of CAR
F.APPROVE_CAR_INITIATION.onChange(function () {
	approveCARValidation();

});

//onChange of CAROwner Field auto populate step owners same as CAR owner and step owner is changed manually then selection of new owner can't reflect for those fields

F.CAR_OWNER.onChange(function () {
	//if(old_own=='')
	//old_own=carOwnerStoredName;
	//F.STEP_DESC.disableAll();
	var carOwnerStoredName = F.CAR_OWNER.read();
	var carOwnerFullName = F.CAR_OWNER.readDisplayedValue();
	F.HID_MGR_OWN_SAME.write('');

	if (hid_step_no == 0) {

		if (F.MANAGER.read() == carOwnerStoredName)
			F.HID_MGR_OWN_SAME.write('Y');
		else
			F.HID_MGR_OWN_SAME.write('');
	}
	//alert(carOwnerFullName);
	/*if (carOwnerStoredName != '') {
	var j = F.STP.getRowCount();
	for (var i = 1; i <= j; i++) {
	//F.STEP_DUE_DATE.writeInDataGrid(F.STEP_DUE_DATE.read(i).slice(0,10),i);
	//F.STEP_DUE_DATE.write(F.STEP_DUE_DATE.read(i).slice(0,10),i);
	F.STP.showPage(i);
	var b = F.STEP_DESC.readDisplayedValue(i);
	var a = F.STEP_DESC.read(i);
	F.STEP_DESC.writeValue(a, b, i);

	if (i == j) {

	//F.DUE_DATE.writeValue(F.STEP_DUE_DATE.read(i), F.STEP_DUE_DATE.read(i));
	}
	//F.STEP_DUE_DATE.writeInDataGrid(F.STEP_DUE_DATE.read(i),);
	//F.STEP_DUE_DATE.write(getDates(F.STEP_DUE_DATE.read(i)),i);
	if (i == 6) {
	//F.STP.showPage(i);
	F.STEP_OWNER.writeValue(F.MANAGER.read(), F.MANAGER.readValue(), parseInt(i));
	} else {

	if (F.STEP_OWNER.read(i) == '') {
	//F.STP.showPage(i);
	F.STEP_OWNER.writeValue(carOwnerStoredName, carOwnerFullName, i);
	} else if (old_own == F.STEP_OWNER.read(i)) {
	//F.STP.showPage(i);
	F.STEP_OWNER.writeValue(carOwnerStoredName, carOwnerFullName, i);
	}

	}
	}
	} */
	//alert('car owner');
	defaultvalidations();
	old_own = F.CAR_OWNER.read();
});

//L1_approver is selected then L2_approver is enabled in StP region1

F.STEP_L1_APPROVER.onChange(function (row) {
	//alert('L1 Approver'+row);
	if (F.STEP_L1_APPROVER.read(row) != '') {
		F.STEP_L2_APPROVER.enable(row);
	} else {
		F.STEP_L2_APPROVER.writeValue('', '', row);
		F.STEP_L2_APPROVER.disable(row);
	}
});
//onchange of step due date auto populating header due date with last step date
rk = 1;
rk1 = 1;
row1 = 0;
F.STEP_DUE_DATE.onChange(function (row) {
	//alert('count'+(rk++));
	if (row1 != row) {
		//alert('count in'+(rk1++));
		//console.log('cout step_DUE_DATE'+count++);
		var i = F.STP.getRowCount();
		if (row == i && F.STEP_DUE_DATE.read(i) != '') {

			F.DUE_DATE.writeValue(F.STEP_DUE_DATE.read(i), F.STEP_DUE_DATE.read(i));
		}
		//this is for writing the same date into the same field in grid to reslove grid issue.
		F.STP.showPage(row);
		if (F.STEP_DUE_DATE.read(row) != '')
			F.STEP_DUE_DATE.writeInDataGrid(F.STEP_DUE_DATE.read(row).slice(0, 10), row);
		//$('.STEP_DUE_DATE :eq(row)').find($('.cellContent')).text(F.STEP_DUE_DATE.read(row).slice(0, 10));
		//$('.STEP_DUE_DATE').filter('td:eq('+(row-1)+')').find($('.cellContent')).text(F.STEP_DUE_DATE.read(row).slice(0, 10));
		row1 = row;
	}

});

//Handling Dates for Inclusion and Exclusion
F.INCLUSION_EXCLUSION.onChange(function (row) {
	//alert('incl_excl'+incl_excl);
	if (incl_excl == 2) {
		//alert('hmmmm');

		if ($('.editable.sortable.renderable.INCLUSION_EXCLUSION').eq(row).find('input').attr('checked') == 'checked') {
			//if(F.INCLUSION_EXCLUSION.read(i) == 'yes'){
			F.INCLUSION_EXCLUSION.write('yes', row);
			F.INCLUSION_EXCLUSION.writeValue('yes', 'yes', row);
			makeFieldRequired('STEP_OWNER', parseInt(row), 'Y');

		} else {
			//alert('no');
			F.INCLUSION_EXCLUSION.write(null, row);
			F.INCLUSION_EXCLUSION.writeValue(null, null, row);
			makeFieldRequired('STEP_OWNER', parseInt(row), 'N');
			//F.STEP_OWNER.makeNotRequired(i);
		}
		//alert('comp opt '+opt);
		//alert('incl excl '+F.INCLUSION_EXCLUSION.read(row));
		//	alert('opt '+opt[row]);
		//alert('val'+opt[row] != F.INCLUSION_EXCLUSION.read(row));
		if (opt[row] != F.INCLUSION_EXCLUSION.read(row)) {
			//if((opt[row]=='' && F.INCLUSION_EXCLUSION.read(row)!='') || (opt[row]!='' && F.INCLUSION_EXCLUSION.read(row)=='')){
			{
				//alert('in here');
				var g = 0;
				var day_cnt = 0;
				inc_cnt1++;
				g = F.HID_STP_DUE_DATE_HELP.read(row);
				//alert('hey');
				if (F.INCLUSION_EXCLUSION.read(row) != 'yes') {
					//alert('hey');
					//inc_cnt=0;

					//alert('first'+g);
					for (var i = (row - 1); i >= 1; i--) {

						if (F.INCLUSION_EXCLUSION.read(i) == 'yes' && day_cnt == 0) {
							day_cnt = day_cnt + F.HID_STP_DUE_DATE_HELP.read(i);
						}
					}
					//alert('break' +day_cnt);
					g = g - day_cnt;

					//alert('sec'+g);

					//F.HID_STP_DUE_DATE_HELP.write(g,row);
					var xg = F.STP.getRowCount();
					for (var i = (row + 1); i <= xg; i++) {
						//debugger;

						var val = 0;
						val = F.HID_STP_DUE_DATE_HELP.read(i);
						//alert('val'+val);
						val = val - g;
						F.STP.showPage(i);
						if (F.INCLUSION_EXCLUSION.read(i) == 'yes') {
							F.HID_STP_DUE_DATE_HELP.write(val, i);
						}
						//alert(F.HID_STP_DUE_DATE_HELP.read(i));

					}
				}

				if (F.INCLUSION_EXCLUSION.read(row) == 'yes') {
					//inc_cnt=0;
					//g=F.HID_STP_DUE_DATE_HELP.read(row);
					//alert('include'+g);
					for (var i = (row - 1); i >= 1; i--) {

						if (F.INCLUSION_EXCLUSION.read(i) == 'yes' && day_cnt == 0) {
							day_cnt = parseInt(day_cnt) + parseInt(F.HID_STP_DUE_DATE_HELP.read(i));
						}
					}

					//alert('mid'+g);

					//F.HID_STP_DUE_DATE_HELP.write(g,row);
					for (var i = (row + 1); i <= F.STP.getRowCount(); i++) {
						var val = F.HID_STP_DUE_DATE_HELP.read(i);
						//alert('prev'+val);
						val = parseInt(val) + parseInt(g);
						//F.HID_STP_DUE_DATE_HELP.writeInDataGrid(val, i);
						if (F.INCLUSION_EXCLUSION.read(i) == 'yes') {
							F.HID_STP_DUE_DATE_HELP.write(val, i);
						}
						//alert('new'+F.HID_STP_DUE_DATE_HELP.read(i));
					}
					g = parseInt(g) + parseInt(day_cnt);
				}

				//F.HID_STP_DUE_DATE_HELP.writeInDataGrid(g,row);
				//F.HID_RESP_DPT_DUMMY.callInfolet();
				F.STP.showPage(row);
				F.HID_STP_DUE_DATE_HELP.write(g, row);
				//$('#MSAI_TD_HID_STP_DUE_DATE_HELP_'+row).find('#HID_STP_DUE_DATE_HELP_field__div').text(g);
				//$('.HID_STP_DUE_DATE_HELP:eq('+row+')').find($('.cellContent')).text(g);

				//$('.HID_STP_DUE_DATE_HELP:eq('+row+')').find($('.cellContent')).text(g);
			}
			inc_cnt1 = 1;
			opt[row] = F.INCLUSION_EXCLUSION.read(row);
		}
		/*for(var i=1;i<=F.STP.getRowCount();i++){
		if(F.INCLUSION_EXCLUSION.read(i)!='yes'){
		makeFieldRequired('STEP_OWNER', parseInt(i), 'N');
		} else{
		makeFieldRequired('STEP_OWNER', parseInt(i), 'Y');
		}
		}*/
	}
	F.HID_RESP_DPT_DUMMY.callInfolet();
});

//new step owner change
F.NEW_STEP_OWNER.onChange(function () {
	mgr_flag = true;
	if (F.NEW_STEP_OWNER.read() != '') {
		if (F.NEW_STEP_OWNER.read() == F.STEP_OWNER.read(hid_step_no)) {
			alert(jsAlertMessages["SAME_STEP_OWNER"]);
			F.NEW_STEP_OWNER.writeValue('', '');
		}
	}
});

/* The below function is used to make sure that the same role-user in identify team doesn't repeat */
F.PTM_NAME.onChange(function (row) {
	if (F.PTM_NAME.read(row) != '') {
		var k = F.PTM.getRowCount();
		for (i = 1; i <= k; i++) {
			if (row != i) {
				if (F.PTM_NAME.read(row) == F.PTM_NAME.read(i)) {
					if (F.PTM_ROLE.read(row) == F.PTM_ROLE.read(i)) {
						alert(jsAlertMessages["SM_ROLE_USER"]);
						//alert('You cannot have the same person added twice for the same role');
						F.PTM_NAME.writeValue('', '', row);
					}
				}
			}
		}
	}

});

F.PTM_ROLE.onChange(function (row) {
	if (F.PTM_ROLE.read(row) != '') {
		var k = F.PTM.getRowCount();
		for (i = 1; i <= k; i++) {
			if (row != i) {
				if (F.PTM_ROLE.read(row) == F.PTM_ROLE.read(i)) {
					if (F.PTM_NAME.read(row) == F.PTM_NAME.read(i)) {
						alert(jsAlertMessages["SM_ROLE_USER"]);
						//alert('You cannot have the same person added twice for the same role');
						F.PTM_ROLE.writeValue('', '', row);
					}
				}
			}
		}
	}

});

F.EFFECTIVENESS_AUTHORITY_CHANGE.onChange(function () {
	var stored = F.EFFECTIVENESS_AUTHORITY_CHANGE.read();
	var displayed = F.EFFECTIVENESS_AUTHORITY_CHANGE.readDisplayedValue();
	if (stored != '')
		F.EFFECT_CHECK_AUTHORITY.writeValue(stored, displayed);
});
F.SEVERITY_OF_IMPACT.onChange(function () {
	rpnCalculation();
});
F.LH_OF_OCCURRENCE.onChange(function () {
	rpnCalculation();
});
F.LH_OF_DETECTION.onChange(function () {
	rpnCalculation();
});
F.NEED_EFFECT_VERIFICATION.onChange(function () {
	verificationActions();

});
//this onchange function for checking the effective due date should be less than step6 due date
F.EFFECT_CHECK_DUE_DATE.onChange(function () {
	var eff = F.EFFECT_CHECK_DUE_DATE.read();
	var b = F.STEP_DUE_DATE.read(6);
	if (eff > b) {
		eff_alert = confirm(jsAlertMessages["EFF_DUE_DATE"]);
		if (!eff_alert) {
			alert(jsAlertMessages["CHANGE_DUE_DATE"]);
			F.EFFECT_CHECK_DUE_DATE.write('');
		}
	}
	if (validate_start_and_end_date(new Date(), new Date(eff)) == -1) {
		alert(jsAlertMessages["DUE_DATE_LT_CUR_DATE"]);
		F.EFFECT_CHECK_DUE_DATE.write('');

	}
});
//This block of code is for step 6 based on NEED_EFFECT_VERIFICATION drop down
F.NEED_EFFECT_VERIFICATION.onChange(function () {

	needEffectVerification();
});
F.FOLLOW_UP_TASKS.onChange(function () {
	followUpTask();
});

F.TASK_DUE_DATE.onChange(function (row) {
	if (F.TASK_SCH_DATE.read(row) > F.TASK_DUE_DATE.read(row)) {
		F.TASK_DUE_DATE.write('', row);
		alert(jsAlertMessages["TASK_SCHEDULE_DATE"]);
	}

});
//task schdule date should be less than due date of CAR
F.TASK_SCH_DATE.onChange(function (row) {
	//alert('test');
	F.TASK_DUE_DATE.write('', row);
	if (F.TASK_SCH_DATE.read(row) < F.DUE_DATE.read()) {
		F.TASK_SCH_DATE.write('', row);

		alert(jsAlertMessages["TASK_SCH_DATE"]);
	}
});
/* Action date validations*/

F.ACTION_ITEM_DUE_DATE.onChange(function (row) {
	if (F.ACTION_STEP_HIDDEN.read(row) == '')
		actionItemEndDtValidate(row);
});

//Used when Action item owner and step owner are same
F.ACTION_OWNER.onChange(function (row) {
	if (F.ACTION_OWNER.read(row) == F.DD_CURRENT_USER_NAME.read()) {
		F.ACTION_APPROVER.disable(row);
		F.ACT.showPage(row);
		F.ACTION_APPROVER.write('', row);
		F.ACTION_RESPONSE.enable(row);
		//F.ACTION_STEP_HIDDEN.write('Y');
		makeFieldRequired('ACTION_RESPONSE', row, 'Y');
		//F.ACTION_RESPONSE.makeRequired(row);
	} else {
		F.ACTION_RESPONSE.disable(row);
		F.ACT.showPage(row);
		F.ACTION_APPROVER.enable(row);
		F.ACTION_RESPONSE.write('', row);
		makeFieldRequired('ACTION_RESPONSE', row, 'N');
		var a = hid_step_no;
		F.ACTION_APPROVER.writeValue(F.STEP_OWNER.read(a), F.STEP_OWNER.readDisplayedValue(a), row);
		//F.ACTION_RESPONSE.makeNotRequired(row);
	}

});
//Onclick of the Tabs following validations should be done
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_42')).click(function () { //Details Tab
	//alert('detls');
	detailsTabvalidations();
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_43')).click(function () { //Ownership details
	//alert('own');
	ownerShipTabvalidations();
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_99')).click(function () { //Identify Team
	//alert('identify');
	identifyTeamTabvalidations();
	$('#msai_multirow_datagrid_' + F.PTM.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '140px');
	$('.nonEditable-string-cell').css('text-align', 'center');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_127')).click(function () { //Define Problem
	//alert('define prob');
	defineProbleTabvalidations();
	$('#msai_multirow_datagrid_' + F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('.nonEditable-string-cell').css('text-align', 'center');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_166')).click(function () { //containment Action
	//alert('containment');
	containmentActionTabvalidations();
	$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '150px');
	$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(2)').attr('width', '500px');
	$('.nonEditable-string-cell').css('text-align', 'center');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_197')).click(function () { //Root Cause Analysis
	$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(2)').attr('width', '300px');
	//$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(2)').attr('width', '200px');
	rootCauseTabvalidations();
	//alert('root cause');
	$('.nonEditable-string-cell').css('text-align', 'center');
	$('#MSAI_TD_RPN_1').css('text-align', 'center');
	//making the equal size for Root cause related dropdowns
	$('#SEVERITY_OF_IMPACT_field__div').find('select').css('width', '148px');
	$('#LH_OF_DETECTION_field__div').find('select').css('width', '148px');
	$('#LH_OF_OCCURRENCE_field__div').find('select').css('width', '148px');

});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_242')).click(function () { //Corrective Action
	//alert('corrective ac');
	correctiveActionTabvalidations();
	$('.nonEditable-string-cell').css('text-align', 'center');
	$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '150px');
	$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(3)').attr('width', '150px');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_283')).click(function () { //verify effective ness
	//alert('verify');
	$('.nonEditable-string-cell').css('text-align', 'center');
verificationTabvalidations();
	if (hid_step_no == 6 && currentStage == 'SOW')
		verificationActions();
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_313')).click(function () { //prevent reccurence
	//alert('prevent');
	preventRecurrenceTabvalidations();
	$('.nonEditable-string-cell').css('text-align', 'center');
	$('#msai_multirow_datagrid_' + F.PRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '180px');
	$('#msai_multirow_datagrid_' + F.PRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(3)').attr('width', '150px');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_350')).click(function () { //congratulate Team
	//alert('congratulate');
	congratulTeamTabvalidations();
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_144')).click(function () { //Action Tab
	//alert('action');
	actionItemTabvalidations();
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('tr:eq(0)').find('th:eq(8)').attr('width', '200px');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('tr:eq(0)').find('th:eq(9)').attr('width', '200px');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('th:eq(0)').find('input').attr('disabled', true);
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_369')).click(function () { //Cost of Poor Quality Tab
	//alert('C OPQ');
	$('#msai_multirow_datagrid_' + F.CPQ.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	var row = F.CPQ.getRowCount();
	if (F.COPQ_CURRENCY.read(row) == '') {
		copqValidation(row);
	}

});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_1323')).click(function () { //Final Review Tab
finalApproveTabvalidations();
	$('#msai_multirow_datagrid_' + F.TSK.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '80px');
	$('#msai_multirow_datagrid_' + F.TSK.getID()).find('thead').find('tr:eq(0)').find('th:eq(4)').attr('width', '300px');
	//alert('final review');
});

//ACtion Based Validations
F.USER_ACTION.onChange(function () {
	var user_act = F.USER_ACTION.read();
	var hid_step_no = F.HID_STEP.read();
	var cur_stage = currentStage;
	var prev_stage = previousStage;

	if (currentStage == 'MGR' && previousStage == 'OWN') {
		if (user_act == 4) {
			//if the Manager reject the request change from the owner
			F.CAR_OWNER.writeValue(ownerStoredName, ownerDisplayValue);
			F.PRIORITY.write(p_priority);
			F.PRIORITY.callInfolet();
			defaultvalidations();
			//alert(jsAlertMessages["OWN_CHANGE_NO"]);
		}
	}

	//Restart CAR should be present in 6th and the final approval stage only
	if (user_act == 10 && (hid_step_no == 6 || hid_step_no == 9)) {
		//alert('reject');
		/*if (hid_step_no == 6) {
		F.HID_CHNG_OWN_FLG.write('1');
		F.EFFECT_FLOW_FLAG.write('');//This field is for storing status as y when effectivenss form is triggered
		F.EFFECT_CHECK_COMP_DATE.writeValue('','');
		//F.HID_VERIFICATION.write('');//This field is for storing status as 1,2
		}

		if (hid_step_no == 9) {
		F.HID_CHNG_OWN_FLG.write('2');
		F.EFFECT_FLOW_FLAG.write('');
		F.EFFECT_CHECK_COMP_DATE.writeValue('','');
		//F.HID_VERIFICATION.write('');
		}*/
		F.RESTART_CAR.writeValue('', '');
		F.RESTART_CAR.show();
		F.RESTART_CAR.enable();
		F.RESTART_CAR.makeRequired();
	} else {
		F.RESTART_CAR.hide();
		F.RESTART_CAR.makeNotRequired();
		F.RESTART_CAR.writeValue('', '');
	}
	//alert('in change action');
	var z = user_act;
	/*if (user_act == 17 && cur_stage == 'MGR') {
	F.APPROVE_CAR_INITIATION.makeNotRequired();
	F.USER_COMMENT.makeRequired();
	}*/
	if (user_act == 2 || user_act == 4 || user_act == 7 || user_act == 6 || user_act == 13 || user_act == 10 || user_act == 17) { //2-cancel,4-Seek additional info,7-change ownership,6-request for change,13transfer of ownership
		F.USER_COMMENT.makeRequired();
	} else {
		F.USER_COMMENT.makeNotRequired();
		if ((cur_stage == 'INT' && prev_stage == 'MGR') || (cur_stage == 'MGR' && prev_stage == 'OWN'))
			F.USER_COMMENT.makeRequired();
	}
	if (user_act == 2 || user_act == 17 || user_act == 13) {
		if (cur_stage == 'MGR')
			//F.DUE_DATE.makeNotRequired();
			if (cur_stage == 'MGR' && prev_stage == 'INT') {
				STPmakeNotRequire();
			}
		//alert('action');
	} else {
		if (cur_stage == 'MGR' && prev_stage == 'INT') {
			STPmakeRequire();
		}
	}
	//Retaining Manager value after selecting transfer of owner ship again other options selected
	if ((user_act == 2 || user_act == 17 || user_act == '') && (cur_stage == 'MGR')) {
		//alert('hello');
		F.MANAGER.writeValue(mgrStored1, mgrDisp1);
	}
	//This code is for Ask for Manager name change when manager want to request for ownership change
	if (user_act == 7 || user_act == 13 || user_act == 3) { //3-trigger action || user_act == 3
		var mgrStored2 = F.MANAGER.read();
		var mgrDisp2 = F.MANAGER.readDisplayedValue();
		if (cur_stage == 'MGR')
			if (mgrStored1 == mgrStored2) {
				//alert('hello');
				alert(jsAlertMessages["MGR_CHANGE"]);
				F.MANAGER.writeValue('', '');

				//F.USER_ACTION.writeValue('');
				flag = 0;
			} else {
				flag = 1;
				//alert(p1+'here u r'+r1);
				F.PRIORITY.write(p1);
				F.RESP_DEPT.writeValue(r1, d1);
			}

		//when Action is request for Ownership or trigger action items following fields need to optional
		if (hid_step_no == 1) {
			//alert('here');
			var k = F.PTM.getRowCount();
			for (var row = 1; row <= k; row++) {
				//	makeFieldRequired('PTM_NO', parseInt(row), 'N');
				makeFieldRequired('PTM_NAME', parseInt(row), 'N');
				makeFieldRequired('PTM_ROLE', parseInt(row), 'N');
			}
			//F.PTM_NO.makeRequired(row);
		} //when Action is request for Ownership or trigger action items following fields need to optional
		else if (hid_step_no == 2) {
			//alert('on change');
			var k = F.QST.getRowCount();
			for (var row = 1; row <= k; row++) {
				makeFieldRequired('QUESTION', parseInt(row), 'N');
				makeFieldRequired('ANSWER', parseInt(row), 'N');
			}
		} else if (hid_step_no == 3) {
			var k = F.CNT.getRowCount();
			for (var row = 1; row <= k; row++) {
				//makeFieldRequired('CNT_NO', parseInt(row), 'N');
				makeFieldRequired('CNT_ACTION_DESCRIPTION', parseInt(row), 'N');
			}

		} else if (hid_step_no == 4) {
			var k = F.RCA.getRowCount();
			for (var row = 1; row <= k; row++) {
				makeFieldRequired('RCA_NO', parseInt(row), 'N');
				makeFieldRequired('RCA_TYPE', parseInt(row), 'N');
				makeFieldRequired('RCA_DESCRIPTION', parseInt(row), 'N');
			}

		} else if (hid_step_no == 5) {
			F.CRA_PLAN_IMPL_SUMMARY.makeNotRequired();
			var k = F.CRA.getRowCount();
			for (var i = 1; i <= k; i++) {
				//makeFieldRequired('CRA_NO', parseInt(i), 'N');
				makeFieldRequired('CRA_ACTION', parseInt(i), 'N');
			}
		} else if (hid_step_no == 6) {
			F.NEED_EFFECT_VERIFICATION.makeNotRequired();
		} else if (hid_step_no == 7) {
			F.SUMMARY_OF_REC_PREV_PLAN.makeNotRequired();
			var k = F.PRA.getRowCount();
			for (var row = 1; row <= k; row++) {
				//makeFieldRequired('PRA_NO', parseInt(row), 'N');
				makeFieldRequired('PRA_ACTION', parseInt(row), 'N');

			}
		}

	} else {
		if (hid_step_no == 5) {
			F.CRA_PLAN_IMPL_SUMMARY.makeRequired();
		}
	}
	if (user_act == 10) {
		if (hid_step_no == 9)
			tskNotRequireValidation();
	}
	if (user_act == 5) {
		if (hid_step_no == 9 && F.TSK.getRowCount() > 1)
			tskValidation();
	}

	if (user_act == 14) {
		if (cur_stage == 'OWN' && prev_stage == 'SOW') {
			F.NEW_STEP_OWNER.show();
			F.NEW_STEP_OWNER.writeValue('', '');
			F.NEW_STEP_OWNER.enable();
			F.NEW_STEP_OWNER.makeRequired();
			/*for (var i = 1; i <= F.STP.getRowCount(); i++) {
			alert('enable' + i)
			if (F.STEP_STATUS.read(i) == 'R') {
			F.STEP_OWNER.enable(i);
			makeFieldRequired('STEP_OWNER', i, 'N');
			makeFieldRequired('STEP_OWNER', i, 'Y')
			break;*/
		}
	}

	if (user_act == 4) {
		if (cur_stage == 'OWN' && prev_stage == 'SOW') {
			F.NEW_STEP_OWNER.hide();
			F.NEW_STEP_OWNER.makeNotRequired();
			/*F.STEP_OWNER.disableAll();
			for (var i = 1; i <= F.STP.getRowCount(); i++) {
			alert('enable' + i)
			if (F.STEP_STATUS.read(i) == 'R') {

			makeFieldRequired('STEP_OWNER', i, 'N');
			break;
			}
			}*/

		}
	}

	if (user_act == 7 || user_act == 3) {
		if (hid_step_no == 4) {
			RCA_makenotrequired();
		}

	}
	if (user_act == 1) {
		//alert('here2'+user_act);
		if (hid_step_no == 4) {
			if (F.RCA.getRowCount() > 1)
				RCA_makerequired();
		} else if (hid_step_no == 1) {
			if (F.PTM.getRowCount() > 1)
				ptmValidation();
		} else if (hid_step_no == 2) {
			if (F.QST.getRowCount() > 1)
				qstValidations();
		} else if (hid_step_no == 3) {
			if (F.CNT.getRowCount() > 1)
				cntValidation();
		} else if (hid_step_no == 4) {
			if (F.RCA.getRowCount() > 1)
				RCA_Validation();
		} else if (hid_step_no == 5) {
			if (F.CRA.getRowCount() > 1)
				craValidation();
		} else if (hid_step_no == 6) {
			F.NEED_EFFECT_VERIFICATION.makeRequired();
		} else if (hid_step_no == 7) {
			if (F.PRA.getRowCount() > 1)
				praValidation();
			F.SUMMARY_OF_REC_PREV_PLAN.makeRequired()
		}
	}

	//alert('out'+user_act);

	if ((cur_stage == 'MGR' && prev_stage == 'INT')) //|| (cur_stage == 'MGR' && prev_stage == 'OWN')) {
	{
		if (cnt == 0)
			if (user_act == '' && F.APPROVE_CAR_INITIATION.read() == '') {
				//if(formStatus!=1)
				removeFromAction();
				//alert('2564');
				cnt++;
			}
	}
	if ((user_act == '' && F.APPROVE_CAR_INITIATION.read() == 2) && (cur_stage == 'MGR')) {
		if (cnt1 == 0) {
			//if(formStatus!=1)
			F.USER_ACTION.removeFromDropDown(14);
		}
		//alert('2571');
		cnt1++;
	}
	/*if (F.STEP_OWNER.read(hid_step_no) == F.CAR_OWNER.read() && cnt2 == 0) {
	F.USER_ACTION.removeFromDropDown(7);
	//F.USER_ACTION.write('');
	cnt2++;
	}*/

	//alert('end'+user_act);

});

/* --------------------------------------------------- *** **************** *** ---------------------------------------------------*/
/* --------------------------------------------------- *** functions    *** ---------------------------------------------------*/
/* --------------------------------------------------- *** **************** *** ---------------------------------------------------*/
function detailsTabvalidations() {
	//STEP 0 Initiator Validations
	if (F.PRIMARY_EVAL_PERFORMED.read() == 1 && (hid_step_no == 0 || hid_step_no == '')) {
		F.PRIMARY_EVAL_PERFMD_DESC.makeRequired();
	}
	if (F.CAR_CREATED_BY.read() == '') {
		F.CAR_CREATED_BY.write(F.DD_CURRENT_USER_NAME.read()).disable();
	}
	sourceidValidation();
	requestedForValidation(); //This function is for CAR Requested for dropdown based validations
	originBasedValidaion(); //This function is for Origin dropdown based Validations
	primaryEvaluationValidation(); //This function is for primary evaluation performed dropdown based Validations
}

function ownerShipTabvalidations() {
	F.STEP_DESC.disableAll();
	//for disable check boxes
	if (F.HID_STEP.read() > 0) {
		F.INCLUSION_EXCLUSION.disableAll();
		$('#msai_multirow_datagrid_' + F.STP.getID()).find('tbody').find('tr').find('td:eq(5)').find('input').attr('disabled', true);
	}
	if (F.FINAL_APPROVAL_DATE.read() == '') {
		F.FINAL_APPROVAL_DATE.hide();
	} else {
		F.FINAL_APPROVAL_DATE.show();
	}

	//if the Owner want to change the step owner action should be selected as the 14-accept
	if (F.USER_ACTION.read() == 14) {
		if (currentStage == 'OWN' && previousStage == 'SOW') {
			F.NEW_STEP_OWNER.show();
			F.NEW_STEP_OWNER.enable();
			F.NEW_STEP_OWNER.makeRequired();
			F.NEW_STEP_OWNER.writeValue('', '');
		}
	}
	if (hid_step_no == 0) {
		stpL2ApproverValidation();
	}

	if (hid_step_no == 0 || hid_step_no == '') {
		if (F.STP.getRowCount() == 1)
			hideownership();
	}
	if (currentStage == 'OWN' || (currentStage == 'MGR' && previousStage == 'OWN'))
		for (var i = 1; i <= F.STP.getRowCount(); i++)
			if (F.STEP_DESC.read(i) == 8) {
				F.STEP_L1_APPROVER.disable(i);
				F.STEP_L2_APPROVER.disable(i);
			}
	
	}

function identifyTeamTabvalidations() {
	//step1 region validation onload
	if (hid_step_no == 1 && currentStage == 'SOW') {
		if (F.PTM_NAME.read() != '' || F.PTM.getRowCount() > 1) {
			ptmValidation();
		}
	}

	else if (hid_step_no == 1 && currentStage == 'SOW') { //validations for step1 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}

		F.PTM.showFirstPage();
		F.PTM.showPage(1);
		F.disableAll();
		F.PTM_NO.enableAll();
		F.PTM_NAME.enableAll(); //L1 and L2 approvers ,stepowner
		F.PTM_ROLE.enableAll();
		F.STEP1_L1_APPROVED_ON.enable();
		F.STEP1_L2_APPROVED_ON.enable();
		F.STEP1_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		//copqValidation();

	} 
	}

function defineProbleTabvalidations() {
	if (hid_step_no == 2 && currentStage == 'SOW') {
		qstValidations();
	}
	if (hid_step_no == 2 && currentStage == 'SOW') { //validations for step2 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			//document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //IDENTIFY TEAM
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		//$("#msai_data_grid_container_100053").find('div:eq(0)').hide(); //for hiding  add and delete buttons of Identify Team
		//$('.toolbarContainer:eq(0)').hide();//for hiding  add and delete buttons of Identify Team
		var questions = F.HID_QUESTIONS.read();
		question = questions.split(',');
		for (var i = 0; i < question.length; i++) {

			if (i > 0 && F.QST.getRowCount() < question.length)
				F.QST.addRow(true, true);
			j = i + 1;
			F.QST_NO.writeValue(j, j, j);
			F.QUESTION.write(question[i], i + 1);
		}
		//F.QST.showFirstPage();
		//F.QST.showPage(1);
		F.disableAll();
		//F.QUESTION.enableAll();
		F.QST_NO.enableAll();
		F.ANSWER.enableAll();
		F.STEP2_L1_APPROVED_ON.enable();
		F.STEP2_L2_APPROVED_ON.enable();
		F.STEP2_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		//copqValidation();
	}  
	
	
}
function containmentActionTabvalidations() {
	//step3 region validation onload
	if (hid_step_no == 3 && currentStage == 'SOW') {
		if (F.CNT_ACTION_DESCRIPTION.read() != '' || F.CNT.getRowCount() > 1)
			cntValidation();
	}
	
	else if (hid_step_no == 3 && currentStage == 'SOW') { //validations for step3 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}

		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			//document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //IDENTIFY TEAM
			//document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //DIFINE PROBLM
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
		}
		F.disableAll();
		//F.CNT.showFirstPage();
		//F.CNT.showPage(1);
		F.CNT_NO.enableAll();
		F.CNT_ACTION_DESCRIPTION.enableAll();
		F.PROCESS_CONTAINED.enableAll();
		F.IMPACTED_POPULATION.enableAll();
		F.STEP3_L1_APPROVED_ON.enable();
		//F.STEP3_L1_APPROVED_BY.enable();
		F.STEP3_L2_APPROVED_ON.enable();
		//F.STEP3_L2_APPROVED_BY.enable();
		F.STEP3_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		//enableStepOwner();
		F.SUMMARY_OF_CNTNMNT_ACTION.enable();
		F.USER_COMMENT.enable();
		//copqValidation();

	} 
}
function rootCauseTabvalidations() {
	//step4 region validation onload
	if (hid_step_no == 4 && currentStage == 'SOW') {
		if (F.RCA.getRowCount() > 1 || (F.RCA_TYPE.read() != '' || F.RCA_DESCRIPTION.read() != ''))
			RCA_Validation();
	}
	
	else if (hid_step_no == 4 && currentStage == 'SOW') { //validations for step4 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			//document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			//document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			//document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //CNT ACTION add and delete button
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		F.disableAll();
		F.RAC_NUMBER.enableAll();
		F.RCA_SUMMARY.enableAll();
		F.SEVERITY_OF_IMPACT.enable();
		F.LH_OF_OCCURRENCE.enable();
		F.LH_OF_DETECTION.enable();
		F.RPN.enable();
		F.RCA_TYPE.enableAll();
		F.RCA_DESCRIPTION.enableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		RCA_makerequired();
		F.STEP4_GEN_ATTACHMENTS.enable();
		//copqValidation();
	}
}
function correctiveActionTabvalidations() {
	//step5 region validation onload
	if (hid_step_no == 5 && currentStage == 'SOW') {
		if (F.CRA.getRowCount() > 1)
			craValidation();
	}
	else if (hid_step_no == 5 && currentStage == 'SOW') { //validations for step5 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.RCA.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		F.disableAll();
		//F.CRA.showFirstPage();
		//F.CRA.showPage(1);
		F.CRA_NO.enableAll();
		F.CRA_ACTION.enableAll();
		F.CRA_RCA_NO.enableAll();
		F.CRA_PLAN_IMPL_SUMMARY.enable();
		F.STEP5_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.CRA_PLAN_IMPL_SUMMARY.makeRequired();
		//copqValidation();
	} 
}
function verificationTabvalidations() {
	needEffectVerification();
	if ((F.HID_CHNG_OWN_FLG.read() == '1' || F.HID_CHNG_OWN_FLG.read() == '2') && hid_step_no == 6 && currentStage == 'SOW' && F.EFFECT_FLOW_FLAG.read() == '')
		F.NEED_EFFECT_VERIFICATION.write('');
	if (F.NEED_EFFECT_VERIFICATION.read() == '')
		F.EFFECT_FLOW_FLAG.write('');
		
		//HID_VERIFICATION for reject and restart  EFFECT_FLOW_FLAG-set to 'Y' when effectiveness check is triggered
	if ((F.HID_CHNG_OWN_FLG.read() == '1' && hid_step_no == 6 && F.EFFECT_FLOW_FLAG.read() == '') || (F.HID_CHNG_OWN_FLG.read() == '2' && hid_step_no == 6 && F.EFFECT_FLOW_FLAG.read() == '')) {
		F.NEED_EFFECT_VERIFICATION.enable();
		if (F.NEED_EFFECT_VERIFICATION.read() != '' && F.EFFECT_FLOW_FLAG.read() != '')
			F.NEED_EFFECT_VERIFICATION.write('');
		needEffectVerification();
		F.EFFECT_CHECK_DUE_DATE.write('');
		F.EFFECT_CHECK_DUE_DATE.enable();
		F.EFFECT_CHECK_AUTHORITY.enable();
		if (currentStage == 'SOW') {
			F.USER_ACTION.removeFromDropDown(10);
			F.USER_ACTION.removeFromDropDown(1);
		}
		//F.EFFECT_CHECK_COMP_DATE.writeValue('','');
	}
	else if (hid_step_no == 6 && currentStage == 'SOW') { //validations for step6 step owner
		if (F.NEED_EFFECT_VERIFICATION.read() == 2 || F.NEED_EFFECT_VERIFICATION.read() == '') {
			F.EFFECT_CHECK_AUTHORITY.hide();
			F.EFFECT_CHECK_DUE_DATE.hide();
			F.EFFECT_CHECK_COMP_DATE.hide();
			$('#MSAI_294').hide();
			$('#MSAI_295').hide();
		}
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.RCA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CRA.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		F.disableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.NEED_EFFECT_VERIFICATION.enable();
		F.NEED_EFFECT_VERIFICATION.makeRequired();
		if (F.EFFECT_FLOW_FLAG.read() != 'Y') {
			F.EFFECT_CHECK_AUTHORITY.enable();
			F.EFFECT_CHECK_DUE_DATE.enable();
		}
		F.STEP6_GEN_ATTACHMENTS.enable();
		verificationActions();
		//copqValidation();
		var car = F.CAR_ID.read();
		//F.HID_DUMMY_CARID.write(car);
		//F.HID_DUMMY_CARID.callInfolet();
		if (F.EFFECT_FLOW_FLAG.read() == 'Y') {
			F.USER_ACTION.removeFromDropDown(9);
			F.EFFECT_CHECK_AUTHORITY.disable();
			F.EFFECT_CHECK_DUE_DATE.disable();
			F.NEED_EFFECT_VERIFICATION.disable();
		}

		//if (F.NEED_EFFECT_VERIFICATION.read() == 1 && F.HID_VERIFICATION.read() != '')
		//F.NEED_EFFECT_VERIFICATION.disable();

	} 
	
}
function preventRecurrenceTabvalidations() {
	//step7 region validation onload
	if (hid_step_no == 7) {
		if (F.PRA_ACTION.read() != '' || F.PRA.getRowCount() > 1) {
					praValidation();
					else if (hid_step_no == 7 && currentStage == 'SOW') { //validations for step1 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.RCA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CRA.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //effectiveness check link(step6)
		F.disableAll();
		F.PRA_ACTION.enableAll();
		F.PRA_RCA_NO.enableAll();
		F.USER_ACTION.enable();
		F.SUMMARY_OF_REC_PREV_PLAN.enable();
		F.SUMMARY_OF_REC_PREV_PLAN.makeRequired();
		F.USER_COMMENT.enable();
		F.STEP7_GEN_ATTACHMENTS.enable();
		//copqValidation();
	} 
		}
	}
	function congratulTeamTabvalidations() {
	if (hid_step_no == 8 && currentStage == 'SOW') { //validations for step8 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {
			//F.CONGRATULATORY_NOTE.write((((jsAlertMessages["CONG_NOTE"]).replace('@', F.CAR_ID.read()).replace(',', ',</br>')).replace('!', '</br>')) + "</br>" + F.MANAGER.readDisplayedValue());
			F.CONGRATULATORY_NOTE.write((((F.CONGRATULATORY_NOTE.read()).replace('@', F.CAR_ID.read()).replace(',', ',</br>')).replace('!', '</br>')) + "</br>" + F.MANAGER.readDisplayedValue());
			F.CONGRATULATORY_NOTE.disable();
			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}
		followUpTask();

		tskNotRequireValidation();
		F.CONGRATULATORY_NOTE.makeRequired();
		F.RECIPIENTS.makeRequired();
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.RCA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CRA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.PRA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.TSK.getID()).find($('button.btn.btn-primary')).hide();
		}
		$('.msai_hyperlink').hide();
		F.disableAll();
		F.CONGRATULATORY_NOTE.enable();
		F.RECIPIENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.STEP8_GEN_ATTACHMENTS.enable();
		//copqValidation();
	} 
	}
	function finalApproveTabvalidations() {
		//step9 region validation onload
		if (hid_step_no == 9 && F.TSK.getRowCount() > 1) {
			tskValidation();
		}
else if (hid_step_no == 9) {
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			F.ORG_FOR_TASK.write(F.RESP_DEPT.read());
			F.ORG_FOR_TASK.callInfolet();
			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			$("#msai_data_grid_container_" + F.PTM.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.QST.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CNT.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.RCA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.CRA.getID()).find($('button.btn.btn-primary')).hide();
			$("#msai_data_grid_container_" + F.PRA.getID()).find($('button.btn.btn-primary')).hide();
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link(step6)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		F.disableAll();
		followUpTask(); //for hiding the task region
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.TASK_TITLE.enableAll();
		F.TASK_OWNER.enableAll();
		F.TASK_APPROVER.enableAll();
		F.TASK_SCH_DATE.enableAll();
		F.TASK_DUE_DATE.enableAll();
		F.TASK_DESCRIPTION.enableAll();
		//copqValidation();
		F.TASK_ATTACHMENT.enable();
		F.FOLLOW_UP_TASKS.enable();

	}
	}
	function actionItemTabvalidations() {
		/*For Action tab */
		var getrwcnt = F.ACT.getRowCount();
		if (getrwcnt >= 1 && (F.ACTION_STEP_HIDDEN.read() == 'Y' || F.ACTION_STEP_HIDDEN.read() == 'N')) {
			//alert('rowcount'+getrwcnt);
			for (var i = 1; i <= getrwcnt; i++) {
				$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + (i - 1) + ')').hide();
				actionValidate(i);
				enableActionItems(i);
			}
		}
	}



$(".msai_tabs").click(function () {
	SetPositionOfField('CREATION_TYPE,PRIORITY,DUE_DATE', 10, 4, 15);
	SetPositionOfField('RESP_DEPT,MANAGER', 10, 7, 15);
});

function focustabs() {
	//SetPositionOfField('CREATION_TYPE,PRIORITY,DUE_DATE', 10, 4, 15);
	//SetPositionOfField('RESP_DEPT,MANAGER', 10, 7, 15);
	//Focusing the Tabs for the corresponding step
	//alert('called');
	//F.USER_ACTION.removeFromDropDown(3);
	/*$("#USER_ACTION_field__div option").each(function()
{ //$("#USER_ACTION_field__div option").empty();
	alert($(this).val());
	//if($(this).val()==3)
	//$(this).remove();
	//F.USER_ACTION.removeFromDropDown(3);
	});*/if (hid_step_no == 0 ||hid_step_no ==''){
	
	if(F.DD_CURRENT_STAGE.read()=='' ||F.DD_CURRENT_STAGE.read()=='INT'){
	F.getTab('MSAI_41').goToTab(1);
	detailsTabvalidations(); 
	}
	else if(F.DD_CURRENT_STAGE.read()=='OWN' ||F.DD_CURRENT_STAGE.read()=='MGR'){
	F.getTab('MSAI_41').goToTab(2);
	ownerShipTabvalidations();
	
	}
	}else if (hid_step_no == 1) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab('MSAI_41').goToTab(3);
		F.getTab(Tabs.IDNTFY_TEAM).show();
		$('#msai_multirow_datagrid_' + F.PTM.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '140px');
		$('.nonEditable-string-cell').css('text-align', 'center');
		identifyTeamTabvalidations();
	} //Identify Team
	else if (hid_step_no == 2) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab('MSAI_41').goToTab(4);
		F.getTab(Tabs.DFN_PRBLM).show();
		$('#msai_multirow_datagrid_' + F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
		$('.nonEditable-string-cell').css('text-align', 'center');
		defineProbleTabvalidations(); 
	} //Define Problem
	else if (hid_step_no == 3) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab('MSAI_41').goToTab(5);
		F.getTab(Tabs.CNTMT_ACT).show();
		$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '150px');
		$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(2)').attr('width', '500px');
		$('.nonEditable-string-cell').css('text-align', 'center');
		containmentActionTabvalidations();

	} //Containment action
	else if (hid_step_no == 4) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab(Tabs.ROOT_CAUSE).show();
		F.getTab('MSAI_41').goToTab(6);
		$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
		$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(2)').attr('width', '500px');
		$('#MSAI_TD_RPN_1').css('text-align', 'center');
		$('.nonEditable-string-cell').css('text-align', 'center');
		$('#SEVERITY_OF_IMPACT_field__div').find('select').css('width', '148px');
		$('#LH_OF_DETECTION_field__div').find('select').css('width', '148px');
		$('#LH_OF_OCCURRENCE_field__div').find('select').css('width', '148px');
		rootCauseTabvalidations();

	} //Root Cause
	else if (hid_step_no == 5) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab(Tabs.CORRECTIVE_ACT).show();
		F.getTab('MSAI_41').goToTab(7);

		$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '150px');
		$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(3)').attr('width', '150px');
		$('.nonEditable-string-cell').css('text-align', 'center');
		correctiveActionTabvalidations();

	} //Corrective Actions
	else if (hid_step_no == 6) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab(Tabs.VERIFY_EFF).show();
		F.getTab('MSAI_41').goToTab(8);

		$('.nonEditable-string-cell').css('text-align', 'center');
		if (hid_step_no == 6 && currentStage == 'SOW')
			verificationActions();
			verificationTabvalidations();

	} //verify Effectiveness
	else if (hid_step_no == 7) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3)
		F.getTab(Tabs.PREV_REC).show();
		F.getTab('MSAI_41').goToTab(9);
		$('#msai_multirow_datagrid_' + F.PRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '180px');
		$('#msai_multirow_datagrid_' + F.PRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(3)').attr('width', '150px');
		$('.nonEditable-string-cell').css('text-align', 'center');
		preventRecurrenceTabvalidations();
	} //prevent recurrence
	else if (hid_step_no == 8) {
		//if (F.USER_ACTION.read() != 3)
		F.USER_ACTION.removeFromDropDown(3);
		F.getTab(Tabs.CONG_TEAM).show();
		F.getTab('MSAI_41').goToTab(11);
		congratulTeamTabvalidations();

	} //congratulate team
	else if (hid_step_no == 9) { //Final Review
		F.getTab('MSAI_41').goToTab(10);
		$('#msai_multirow_datagrid_' + F.TSK.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '80px');
		$('#msai_multirow_datagrid_' + F.TSK.getID()).find('thead').find('tr:eq(0)').find('th:eq(4)').attr('width', '300px')
	finalApproveTabvalidations();
	}

	if (currentStage == 'OWN' && previousStage == 'SOW'){
		F.getTab('MSAI_41').goToTab(2);
		ownerShipTabvalidations();
		}
}

function hideTabs() {

	// hiding all tabs
	/*F.getTab(Tabs.OWN_DETLS).hide(); // ownershp Details Tab
	F.getTab(Tabs.IDNTFY_TEAM).hide(); //step1 Tab
	F.getTab(Tabs.DFN_PRBLM).hide(); //ste2 Tab
	F.getTab(Tabs.ACTION).hide(); //action Tab
	F.getTab(Tabs.CNTMT_ACT).hide(); //ste3 Tab
	F.getTab(Tabs.ROOT_CAUSE).hide(); //ste4 Tab
	F.getTab(Tabs.CORRECTIVE_ACT).hide(); //ste5 Tab
	F.getTab(Tabs.VERIFY_EFF).hide(); //ste6 Tab
	F.getTab(Tabs.PREV_REC).hide(); //ste7 Tab
	F.getTab(Tabs.CONG_TEAM).hide(); //ste8 Tab
	F.getTab(Tabs.COPQ).hide(); //copq Tab
	F.getTab(Tabs.FINAL).hide(); //Final Review*/
	var tabsInfo = F.HID_TABS_INFO.read().split(",");
	if (tabsInfo != '' && currentStage != 'INT') //except for step0 Initiator stage
	{
		var count = 0;
		var count1 = 0;

		for (var k = 0; k < tabsInfo.length; k++) {
			//var str = tabsInfo[parseInt(k)];
			var str = "Tabs.".concat(tabsInfo[parseInt(k)]);
			if (str != 'Tabs.CONG_TEAM') {
				if (str == 'Tabs.ACTION') {
					count = count + 1;
					if (count == 1)
						var tabId = eval("(" + str + ")");
					//var TabId=eval("str = (" + str + ")");
					//var tabId = eval("(" + str + ")");
					//var tabId = eval(str);
					var act_rows = F.ACT.getRowCount();
					if (act_rows >= 1 && (F.ACTION_ITEM_TITLE.read() != '' && F.ACTION_RELATES_TO.read() != '' && F.ACTION_OWNER.read() != ''))
						F.getTab(tabId).show();
				} else if (str == 'Tabs.COPQ') {
					count1 = count1 + 1;
					if (count1 == 1)
						var tabId = eval("(" + str + ")");
					//var TabId=eval("str = (" + str + ")");
					//

					//var tabId = eval(str);
					F.getTab(tabId).show();
				} else {
					var tabId = eval("(" + str + ")");
					//var TabId=eval("str = (" + str + ")");
					//var tabId = eval(str);
					F.getTab(tabId).show();
				}
				//alert('currentstage' + currentStage);
				//alert('previous' + previousStage);
				//alert('step' + hid_step_no);}

			}

		}
		if (hid_step_no == 9 || hid_step_no == 8) {
			F.getTab(Tabs.FINAL).show();
		}
		if (hid_step_no == 8) {
			//alert('cong team')
			F.getTab(Tabs.CONG_TEAM).show();
		}
	}
	focustabs();
}

function originBasedValidaion() {
	if (F.ORIGIN.read() == 1) { //1 for Customer
		F.CUSTOMER_NAME.show();
		if (currentStage == 'INT' || currentStage == '') {
			F.CUSTOMER_NAME.makeRequired();

			F.THRDPRTY_ORG_NME.makeNotRequired();

		}
		F.THRDPRTY_ORG_NME.hide()
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');
	} else if (F.ORIGIN.read() == 2) {
		if (currentStage == 'INT' || currentStage == '') {
			F.INTERNAL_DEPARTMENT_NAME.makeRequired();
			F.INTERNAL_DEPARTMENT_CONTACT.makeRequired();
		}
		F.CUSTOMER_NAME.hide(); //2 For Internal
		F.THRDPRTY_ORG_NME.hide();
		F.CUSTOMER_NAME.makeNotRequired();
		F.THRDPRTY_ORG_NME.makeNotRequired();
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.CUSTOMER_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.show();
		F.INTERNAL_DEPARTMENT_CONTACT.show();

	} else if (F.ORIGIN.read() == 3) {
		F.CUSTOMER_NAME.hide(); //3 for ThirdParty
		F.CUSTOMER_NAME.writeValue('', '');

		F.THRDPRTY_ORG_NME.show()

		if (currentStage == 'INT' || currentStage == '') {
			F.THRDPRTY_ORG_NME.makeRequired();

		}
		F.CUSTOMER_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');

	} else {
		F.CUSTOMER_NAME.hide(); //2 For Internal
		F.THRDPRTY_ORG_NME.hide();
		F.CUSTOMER_NAME.makeNotRequired();
		F.THRDPRTY_ORG_NME.makeNotRequired();
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.CUSTOMER_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');
	}
}

function requestedForValidation() {

	//alert('hello');

	if (F.REQUESTED_FOR.read() == 2) { //2-Product
		F.SRC_PROCESS_NAME.hide();
		F.PRODUCT_ID.show();
		F.UOM.show();
		F.TOTAL_QUANTITY.show();
		F.PRODUCT_ID.writeValue('', '');
		F.SRC_PROCESS_NAME.writeValue('', '');
		if (currentStage == 'INT' || currentStage == '') {
			F.PRODUCT_ID.makeRequired();
			F.SRC_PROCESS_NAME.makeNotRequired();
		}
		$("#MSAI_TD_REQUESTED_FOR_1").after($("#MSAI_TD_TOTAL_QUANTITY_1"));
		$("#MSAI_TD_SRC_PROCESS_NAME_1").after($("#MSAI_TD_PRODUCT_ID_1"));
	} else if (F.REQUESTED_FOR.read() == 1) { //1-Process
		/*var MSAI1773 = document.getElementById('MSAI_TD_PRODUCT_ID_1').innerHTML;
		document.getElementById('MSAI_TD_PRODUCT_ID_1').innerHTML = document.getElementById('MSAI_TD_TOTAL_QUANTITY_1').innerHTML;
		document.getElementById('MSAI_TD_TOTAL_QUANTITY_1').innerHTML = MSAI1773;*/
		F.PRODUCT_ID.makeNotRequired();
		F.PRODUCT_ID.writeValue('', '');
		//F.SRC_PROCESS_NAME.writeValue('', '');
		F.SRC_PROCESS_NAME.show();
		//	$('#SRC_PROCESS_NAME_label__div').css('display','');
		//$('#SRC_PROCESS_NAME_field__div').css('display','');
		F.PRODUCT_ID.show();
		F.UOM.show();
		F.TOTAL_QUANTITY.show();
		if (currentStage == 'INT' || currentStage == '') {
			F.SRC_PROCESS_NAME.makeRequired();
		}
		$("#MSAI_TD_REQUESTED_FOR_1").after($("#MSAI_TD_PRODUCT_ID_1"));
		$("#MSAI_TD_SRC_PROCESS_NAME_1").after($("#MSAI_TD_TOTAL_QUANTITY_1"));

	} else {

		F.PRODUCT_ID.hide();
		F.PRODUCT_ID.writeValue('', '');
		F.SRC_PROCESS_NAME.writeValue('', '');
		F.SRC_PROCESS_NAME.hide();
		F.UOM.hide();
		F.UOM.write('');
		F.TOTAL_QUANTITY.write('');
		F.TOTAL_QUANTITY.hide();
		//	$('#SRC_PROCESS_NAME_label__div').css('display','none');
		//$('#SRC_PROCESS_NAME_field__div').css('display','none');
		F.SRC_PROCESS_NAME.makeNotRequired();
		F.PRODUCT_ID.makeNotRequired();
		//$("#MSAI_TD_PRODUCT_ID_1").offset({top:product_id.top,left:17});
		//$("#MSAI_TD_TOTAL_QUANTITY_1").offset({top:total_qty.top,left:total_qty.left});
	}
}

//This function is based on selection of PRIMARY_EVAL_PERFORMED
function primaryEvaluationValidation() {
	if (F.PRIMARY_EVAL_PERFORMED.read() == 1) { //1-yes
		F.PRIMARY_EVAL_PERFMD_DESC.show();
	} else {
		F.PRIMARY_EVAL_PERFMD_DESC.hide();
	}
}

//showing the due date field if the value is present
function duedatehide() {
	if (F.RESP_DEPT.read() != '' && F.PRIORITY.read() != '') {
		F.DUE_DATE.show();

	} else
		F.DUE_DATE.hide();
	SetPositionOfField('DUE_DATE', 10, 4, 15);
}

//hide the sourceID if the source is Adhoc or null and type='Adhoc'
function sourceidValidation() {
	if ((F.SOURCE_SYSTEM_ID.read() == '' || F.SOURCE_SYSTEM_ID.read() == 'ADH') && (F.CREATION_TYPE.read() == 2)) {
		//F.SOURCE_SYSTEM_OBJECT_ID.hide();
		$('#SOURCE_SYSTEM_OBJECT_ID_field__div').css('display', 'none');
		$('#SOURCE_SYSTEM_OBJECT_ID_label__div').css('display', 'none');

	}
	//alert('if');}
	else {
		$('#SOURCE_SYSTEM_OBJECT_ID_field__div').css('display', '');
		$('#SOURCE_SYSTEM_OBJECT_ID_label__div').css('display', '');
		//F.SOURCE_SYSTEM_OBJECT_ID.show();

	}

}
//This Function is to Default the  Ownership Details multirow
function getOwnerShipDetails() {
	//alert('own ');
	var str = F.HID_OWN_TAB.read();
	var str1 = str.split(";");
	var s = F.STP.getRowCount()
		for (var i = s + 1; i <= str1.length; i++) {
			F.STP.addRow(true, true);
			//alert('added');
		}

		if (currentStage == 'MGR') {
			//setTimeout(function () {
			//debugger;

			var _stepsDetails = F.HID_OWN_TAB.read().split(";");
			for (var i = 1; i <= _stepsDetails.length; i++) {
				//alert('i' + i);
				F.STP.showPage(i);
				if (F.STEP_L1_APPROVER.read(i) == '')
					F.STEP_L2_APPROVER.disable(i);
				//selecting yes by default in the inclusion
				//$('.selectcell.editable.sortable.renderable.INCLUSION_EXCLUSION').find($('select')).prop('selectedIndex', 1);
				//$('.STEP_DUE_DATE').unbind('change');
				F.INCLUSION_EXCLUSION.write('yes', i);
				opt[i] = F.INCLUSION_EXCLUSION.read(i);
				incl_excl = 1;
				var _stepDetails1 = _stepsDetails[i - 1].split(",");
				var stpNo = _stepDetails1[0];
				var days = _stepDetails1[4];
				F.STEP.write(stpNo, i);
				F.STEP_DESC.disable(i);
				//F.STEP_DESC.writeInDataGrid(F.STEP_DESC.read(i),i);
				F.HID_RESP_DPT_DUMMY.write(F.RESP_DEPT.read());
				F.HID_STP_DUE_DATE_HELP.write(days, i);
				if (stpNo == 8) {
					F.STEP_L1_APPROVER.disable(i);
					F.STEP_L2_APPROVER.disable(i);
				} else {
					F.STEP_L1_APPROVER.enable(i);
				}

				var a = F.STEP.read(i);
				var b = stpObject[a];
				F.STEP_DESC.writeValue(a, b, i);
				//MM/dd/yyyy HH:mm:ss
				//F.STEP_DUE_DATE.writeValue(new Date(_stepDetails1[1]),new Date( _stepDetails1[1]), parseInt(i)); //.disable(i);
				F.STEP_SEQ_NO.write(_stepDetails1[2], parseInt(i));
				F.NEXT_WF_CODE.write(_stepDetails1[3], parseInt(i));
				F.STEP.callInfolet(i);
				//alert('call infolet 1259');
			}
			incl_excl = 2;
			//alert('call  infolet 1261');
			F.HID_RESP_DPT_DUMMY.callInfolet();

			// }, 10);
		}
		//F.STEP_DESC.disableAll();
		//align the numbers in the center
		//$('.nonEditable-string-cell').css('text-align', 'center');
}

//This Function is for Hiding the Ownership details in STP Region by Default and for Ownership stage
function hideownership() {
	//if (F.STEP_OWNER.read(1)=!"") {}
	OwnershipDetailsValidation();
}

function approveCARValidation() {
	//alert('formStatus'+formStatus);

	if (F.APPROVE_CAR_INITIATION.read() == 1) //1-yes
	{
		if (F.MANAGER.read() == '')

			F.MANAGER.writeValue(mgrStored1, mgrDisp1);
		F.USER_ACTION.enable();
		F.USER_ACTION.addToDropDown(14, jsAlertMessages["ACCEPT"]);
		F.USER_ACTION.removeFromDropDown(2);
		F.USER_ACTION.removeFromDropDown(17);
		F.USER_ACTION.removeFromDropDown(13);
		if (F.HID_OWN_TAB.read() == '') {
			alert(jsAlertMessages["STEPS_INFO"]);
		}
		getOwnerShipDetails();
		OwnershipDetailsValidation();
		//STPmakeRequire();
	} else if (F.APPROVE_CAR_INITIATION.read() == 2) //no
	{
		if (F.STEP_OWNER.read(1) != '' || F.STP.getRowCount() > 1) {
			if (formStatus == 0 || formStatus == 5) {
				var resp = confirm(jsAlertMessages["APPROVE_CAR"]);
			} else {
				//alert('rsp');
				resp = true;
			}
			if (resp) {
				clearOwnership();
			} else {
				F.APPROVE_CAR_INITIATION.writeValue(1);
				F.USER_ACTION.removeFromDropDown(2);
				F.USER_ACTION.removeFromDropDown(17);
				F.USER_ACTION.removeFromDropDown(13);
				F.USER_ACTION.addToDropDown(14, jsAlertMessages["ACCEPT"]);
				return;

			}
		}
		F.USER_ACTION.enable();
		F.USER_ACTION.removeFromDropDown(1);
		F.USER_ACTION.removeFromDropDown(14);
		F.USER_ACTION.addToDropDown(2, jsAlertMessages["CANCEL"]);
		F.USER_ACTION.addToDropDown(17, jsAlertMessages["SEEK_ADD_INFO"]);
		F.USER_ACTION.addToDropDown(13, jsAlertMessages["TRANSFER_OWN"]);
		OwnershipDetailsValidation();
		STPmakeNotRequire();
	} else {
		clearOwnership();
		F.STP.hide();
		F.CAR_OWNER.hide();
		F.FINAL_APPROVER_ORG.hide();
		F.FINAL_APPROVER_ORG.makeNotRequired();
		F.FINAL_APPROVER.hide();
		F.FINAL_APPROVER.makeNotRequired();
		//F.FINAL_APPROVAL_DATE.hide();
		//F.FINAL_APPROVAL_DATE.makeNotRequired();
		F.USER_ACTION.removeFromDropDown(2);
		F.USER_ACTION.removeFromDropDown(17);
		F.USER_ACTION.removeFromDropDown(13);
		F.USER_ACTION.removeFromDropDown(14);
		STPmakeNotRequire();

	}
}
function OwnershipDetailsValidation() {
	if (F.APPROVE_CAR_INITIATION.read() == 1) { //1-yes
		F.STP.show();
		F.CAR_OWNER.show();
		//F.FINAL_APPROVAL_DATE.show();
		F.FINAL_APPROVER.show();
		F.FINAL_APPROVER_ORG.show();
		F.CAR_OWNER.makeRequired();
		F.FINAL_APPROVER.makeRequired();
		F.FINAL_APPROVER_ORG.makeRequired();
		if (F.STEP_OWNER.read() == '' && F.STP.getRowCount() == 1) {
			//alert('commented+1342'); //getOwnerShipDetails();
		}
		STPmakeRequire();
	} else {
		F.STP.hide();
		F.FINAL_APPROVER.hide();
		F.FINAL_APPROVER_ORG.hide();
		F.CAR_OWNER.hide();
		F.FINAL_APPROVER.makeNotRequired();
		F.FINAL_APPROVER_ORG.makeNotRequired();
		F.CAR_OWNER.makeNotRequired();
		STPmakeNotRequire();

	}
}

//Make Required For STP region
function STPmakeRequire() {
	var k = F.STP.getRowCount();
	for (var row = 1; row <= k; row++) {
		//alert(row);
		//makeFieldRequired('STEP_DUE_DATE', parseInt(row), 'Y');
		if (F.INCLUSION_EXCLUSION.read(row) == 'yes') {
			makeFieldRequired('STEP_OWNER', parseInt(row), 'Y');
		} else {
			makeFieldRequired('STEP_OWNER', parseInt(row), 'N');
		}
		//makeFieldRequired('STEP_DESC', parseInt(row), 'Y');
		makeFieldRequired('INCLUSION_EXCLUSION', parseInt(row), 'Y');
		//F.STEP_DUE_DATE.makeRequired(row);
		//F.STEP_OWNER.makeRequired(row);
		//F.STEP.makeRequired(row);
	}
}
//Makenot required for STP
function STPmakeNotRequire() {
	var k = F.STP.getRowCount();
	for (var row = 1; row <= k; row++) {
		//alert(row);
		//makeFieldRequired('STEP_DUE_DATE', parseInt(row), 'N');
		makeFieldRequired('STEP_OWNER', parseInt(row), 'N');
		//makeFieldRequired('STEP_DESC', parseInt(row), 'N');
		makeFieldRequired('INCLUSION_EXCLUSION', parseInt(row), 'N');
		//F.STEP_DUE_DATE.makeNotRequired(row);
		//F.STEP_OWNER.makeNotRequired(row);
		//F.STEP.makeNotRequired(row);
	}
}

//this function is for clearing the STP region details
function clearOwnership() {

	F.CAR_OWNER.writeValue('', '');
	var k = F.STP.getRowCount();
	for (var i = 1; i <= k; i++) {
		F.STEP_DESC.writeValue('', '', i);
		F.STEP_OWNER.writeValue('', '', i);
		F.STEP_L1_APPROVER.writeValue('', '', i);
		F.STEP_L2_APPROVER.writeValue('', '', i);
		F.STEP_SEQ_NO.write('', i);
		F.STEP_STATUS.write('', i);
		//F.STEP_DUE_DATE.write(new Date(), i);
		F.STEP_DUE_DATE.write('', i);
		F.NEXT_WF_CODE.write('', i);
	}
}
function stpmarkDelete() {
	var k = F.STP.getRowCount();
	for (var i = 1; i <= k; i++) {
		if (F.STEP_ID.read(i) == '') {
			var relID = F.STP.getID();
			setMarkedDeleteRow(relID, parseInt(i), parseInt(i));
			F.STP.disableRow(parseInt(i));
		}
		//F.STP.markRowForDelete(i);
	}

	/*F.STP.allowZeroRows();
	F.STP.deleteAllRows();
	F.STP.makeEmpty();*/
}
//to delete the rows in the ownership details tab region
function deleteStpRows() {
	var k = F.STP.getRowCount();
	for (var row = 1; row < k; row++) {
		setTimeout(function () {
			F.STP.deleteRow(row);
			//F.STP.showPage(row);
			//$('#msai_multirow_datagrid_100034').find('tbody').find('tr:eq('+row+')').remove();
		}, 1);
	}
}

//L1_approver is selected then L2_approver is enabled this function is called onclick of Ownership details tab
function stpL2ApproverValidation() {
	F.STEP_L2_APPROVER.disableAll();
	var k = F.STP.getRowCount();
	for (var i = 1; i <= k; i++) {
		if (F.STEP_L1_APPROVER.read(i) != '') {
			F.STEP_L2_APPROVER.enable(i);
			//alert('enable' + i);
		}
	}
}
function removeFromAction() {
	//alert('actions removed');
	F.USER_ACTION.removeFromDropDown(2); //cancel
	F.USER_ACTION.removeFromDropDown(17); //reject
	F.USER_ACTION.removeFromDropDown(13); //own change
	F.USER_ACTION.removeFromDropDown(14); //submit
}
//Make Required for PTM region
function ptmValidation() {
	//alert('haha');
	var k = F.PTM.getRowCount();
	for (var row = 1; row <= k; row++) {
		F.MEMBER_ID.write('NONE', row);
		//F.PTM_NO.write(row, row);
		//F.PTM_NO.write(1, 1);
		F.PTM_NO.writeValue(row, row, row);
	}
	//alert(F.PTM_NO.read(row));
	ptmMakeRequire();
	//F.PTM_NO.makeRequired(row);
	//F.PTM_NAME.makeRequired(row);
	//F.PTM_ROLE.makeRequired(row);
	//F.PTM_NO.disableAll();
}

function ptmMakeRequire() {
	var k = F.PTM.getRowCount();
	for (var row = 1; row <= k; row++) {
		//makeFieldRequired('PTM_NO', parseInt(row), 'N');
		//makeFieldRequired('PTM_NO', parseInt(row), 'Y');
		makeFieldRequired('PTM_NAME', parseInt(row), 'Y');
		makeFieldRequired('PTM_ROLE', parseInt(row), 'Y');
	}
}

function qstMakeRequire() {
	var k = F.QST.getRowCount();
	for (var row = 1; row <= k; row++) {
		//makeFieldRequired('QST_NO', parseInt(row), 'N');
		//makeFieldRequired('QST_NO', parseInt(row), 'Y');
		//makeFieldRequired('ANSWER',parseInt(row),'N');
		makeFieldRequired('ANSWER', parseInt(row), 'Y');
	}
}
//This function is for validations on QST region
function qstValidations() {
	var k = F.QST.getRowCount();
	for (var row = 1; row <= k; row++) {
		F.QUESTION_ID.write('NONE', row);
		//alert(row);
		//F.QST_NO.write(row, parseInt(row));
		F.QST_NO.writeValue(row, row, row);
		//F.QST_NO.makeRequired(row);
		//F.ANSWER.makeRequired(row);
		qstMakeRequire();

		if (row > question.length) {
			makeFieldRequired('QUESTION', parseInt(row), 'Y');
			F.QUESTION.enable(row);
		}
		//	F.QUESTION.makeRequired(row);
	}
}

//This function is for validations on CNT region
function cntValidation() {
	for (var row = 1; row <= F.CNT.getRowCount(); row++) {
		F.CNT_ACT_ID.write('NONE', row);
		F.CNT_NO.writeValue(row, row, row);
	}
	//F.CNT_NO.write(1, 1);
	//alert(F.CNT_NO.read());
	cntMakeRequire();
	//F.CNT_NO.makeRequired(row);
	//F.CNT_ACTION_DESCRIPTION.makeRequired(row);
	//F.CNT_NO.disableAll();
}

function cntMakeRequire() {
	var k = F.CNT.getRowCount();
	for (var row = 1; row <= k; row++) {
		//makeFieldRequired('CNT_NO', parseInt(row), 'Y');
		makeFieldRequired('CNT_ACTION_DESCRIPTION', parseInt(row), 'Y');
	}
}
//corrective Actions region validations
function craValidation() {
	var k = F.CRA.getRowCount();
	for (var i = 1; i <= k; i++) {

		//makeFieldRequired('CRA_NO', parseInt(i), 'N');
		//makeFieldRequired('CRA_NO', parseInt(i), 'Y');
		makeFieldRequired('CRA_ACTION', parseInt(i), 'Y');
		F.CRA_NO.write(i, i);

		//F.CRA_NO.makeRequired(i);
		//F.CRA_ACTION.makeRequired(i);
	}
}
//preventive recurrence region validations
function praValidation() {
	var k = F.PRA.getRowCount();
	for (var row = 1; row <= k; row++) {
		//makeFieldRequired('PRA_ACTION', parseInt(row), 'N');
		makeFieldRequired('PRA_ACTION', parseInt(row), 'Y');
		//makeFieldRequired('PRA_NO', parseInt(row), 'Y');
		F.PRA_NO.writeValue(row, row, row);
		F.PRA_NO.enable(row);
	}
}

function rpnCalculation() {
	var sev_of_impac = F.SEVERITY_OF_IMPACT.read();
	var like_of_occu = F.LH_OF_OCCURRENCE.read();
	var like_of_detect = F.LH_OF_DETECTION.read();
	var rpn = sev_of_impac * like_of_occu * like_of_detect;
	F.RPN.writeValue(rpn, rpn);
}
//function is used to make required fields in step4
function RCA_makerequired() {
	//alert('entered RCA_makereq');
	F.RCA_SUMMARY.makeRequired();
	F.SEVERITY_OF_IMPACT.makeRequired();
	F.LH_OF_OCCURRENCE.makeRequired();
	F.LH_OF_DETECTION.makeRequired();
	//F.RPN.makeRequired();
}

function RCA_makenotrequired() {
	//alert('entered RCA_makereq');
	F.RCA_SUMMARY.makeNotRequired();
	F.SEVERITY_OF_IMPACT.makeNotRequired();
	F.LH_OF_OCCURRENCE.makeNotRequired();
	F.LH_OF_DETECTION.makeNotRequired();
	//F.RPN.makeNotRequired();
}

//function is used to add RCA number
function RCA_Validation() {
	//alert('entered RCA_Valid');
	var rows = F.RCA.getRowCount();
	for (row = 1; row <= rows; row++) {
		//F.RCA_NO.writeValue(row, row, row);
		F.RAC_NUMBER.writeValue(row, row, row);
		//makeFieldRequired('RCA_NO', parseInt(row), 'N');
		//makeFieldRequired('RCA_NO', parseInt(row), 'Y');
		makeFieldRequired('RCA_TYPE', parseInt(row), 'Y');
		makeFieldRequired('RCA_DESCRIPTION', parseInt(row), 'Y');

		//F.RCA_NO.makeRequired();
		//F.RCA_TYPE.makeRequired();
		//F.RCA_DESCRIPTION.makeRequired();
		F.RCA_NO.disableAll();
	}
}
function needEffectVerification() {

	if (F.NEED_EFFECT_VERIFICATION.read() == 1) {
		F.EFFECT_CHECK_AUTHORITY.makeRequired();
		F.EFFECT_CHECK_DUE_DATE.makeRequired();
		//F.USER_ACTION.removeFromDropDown(1);
		//F.USER_ACTION.addToDropDown(9, jsAlertMessages["VERIFY_EFFECTIVENESS"]);

	} else {
		F.EFFECT_CHECK_AUTHORITY.makeNotRequired();
		F.EFFECT_CHECK_DUE_DATE.makeNotRequired();
		//F.USER_ACTION.removeFromDropDown(9);
	}

	if (F.NEED_EFFECT_VERIFICATION.read() == 2 || F.NEED_EFFECT_VERIFICATION.read() == '') {
		F.EFFECT_CHECK_AUTHORITY.hide();
		F.EFFECT_CHECK_DUE_DATE.hide();
		F.EFFECT_CHECK_COMP_DATE.hide();
		$('#MSAI_294').hide();
		$('#MSAI_295').hide();
	} else {
		F.EFFECT_CHECK_AUTHORITY.show();
		F.EFFECT_CHECK_DUE_DATE.show();
		F.EFFECT_CHECK_COMP_DATE.show();
		$('#MSAI_294').show();
		$('#MSAI_295').show();
	}
}
function verificationActions() {

	if (F.NEED_EFFECT_VERIFICATION.read() == 1 && F.EFFECT_FLOW_FLAG.read() == '') {
		F.USER_ACTION.addToDropDown(9, jsAlertMessages["VERIFY_EFFECTIVENESS"]);
		F.USER_ACTION.removeFromDropDown(1);
		F.USER_ACTION.removeFromDropDown(7);
		F.USER_ACTION.removeFromDropDown(10);
	} else if (F.NEED_EFFECT_VERIFICATION.read() == 2) {
		F.USER_ACTION.removeFromDropDown(9);
		F.USER_ACTION.addToDropDown(1, jsAlertMessages["SUBMIT"]);
		F.USER_ACTION.addToDropDown(7, jsAlertMessages["REQ_OWN_CHNG"]);
		F.USER_ACTION.addToDropDown(10, jsAlertMessages["REJ_RESTRT_PRO"]);
	} else if (F.NEED_EFFECT_VERIFICATION.read() == 1 && F.EFFECT_FLOW_FLAG.read() != '') {
		F.USER_ACTION.addToDropDown(1, jsAlertMessages["SUBMIT"]);
		F.USER_ACTION.removeFromDropDown(9);
		F.USER_ACTION.removeFromDropDown(7);
		F.USER_ACTION.removeFromDropDown(10);
		//F.NEED_EFFECT_VERIFICATION.disable();

	} else {
		F.USER_ACTION.removeFromDropDown(9);
		F.USER_ACTION.removeFromDropDown(1);
		F.USER_ACTION.removeFromDropDown(7);
		F.USER_ACTION.removeFromDropDown(10);
	}
	if (F.EFFECT_CHECK_COMP_DATE.read() != '' && F.NEED_EFFECT_VERIFICATION.read() == 1) {
		F.USER_ACTION.addToDropDown(1, jsAlertMessages["SUBMIT"]);
		F.USER_ACTION.addToDropDown(10, jsAlertMessages["REJ_RESTRT_PRO"]);
		F.USER_ACTION.removeFromDropDown(9);
		F.USER_ACTION.removeFromDropDown(7);
		//F.USER_ACTION.addToDropDown(9,jsAlertMessages["VERIFY_EFFECTIVENESS"]);
	}
	/*if (F.HID_VERIFICATION.read() != '') {
	F.USER_ACTION.removeFromDropDown(9);
	F.NEED_EFFECT_VERIFICATION.disable();
	F.USER_ACTION.addToDropDown(1, jsAlertMessages["SUBMIT"]);
	//F.USER_ACTION.removeFromDropDown(7);
	//F.USER_ACTION.removeFromDropDown(10);
	}*/

}

function followUpTask() {
	if (F.FOLLOW_UP_TASKS.read() == 1) {
		F.TSK.show();
		tskValidation();
	} else {
		F.TSK.hide();
		tskNotRequireValidation();
	}
}

//Task region validations after add row
function tskValidation() {
	var k = F.TSK.getRowCount();
	//F.TSK.showPage(k);
	//F.TASK_APPROVER.writeValue(F.MANAGER.read(),F.MANAGER.readDisplayedValue(),k);
	for (var row = 1; row <= k; row++) {

		//makeFieldRequired('TASK_NO', parseInt(row), 'N');
		//makeFieldRequired('TASK_NO', parseInt(row), 'Y');
		makeFieldRequired('TASK_TITLE', parseInt(row), 'Y');
		makeFieldRequired('TASK_OWNER', parseInt(row), 'Y');
		makeFieldRequired('TASK_APPROVER', parseInt(row), 'Y');
		makeFieldRequired('TASK_SCH_DATE', parseInt(row), 'Y');
		makeFieldRequired('TASK_DUE_DATE', parseInt(row), 'Y');
		makeFieldRequired('TASK_DESCRIPTION', parseInt(row), 'Y');
		F.TASK_NO.writeValue(row, row, row).disable(row);
	}
}
function tskNotRequireValidation() {
	var k = F.TSK.getRowCount();
	for (var row = 1; row <= k; row++) {

		//makeFieldRequired('TASK_NO', parseInt(row), 'N');
		makeFieldRequired('TASK_TITLE', parseInt(row), 'N');
		makeFieldRequired('TASK_OWNER', parseInt(row), 'N');
		makeFieldRequired('TASK_APPROVER', parseInt(row), 'N');
		makeFieldRequired('TASK_SCH_DATE', parseInt(row), 'N');
		makeFieldRequired('TASK_DUE_DATE', parseInt(row), 'N');
		makeFieldRequired('TASK_DESCRIPTION', parseInt(row), 'N');
	}
}

//This function is for COPQ Region validation
function copqValidation(row) {

	if (F.COPQ_CURRENCY.read(row) == '') {
		F.CPQ.showPage(row);
		F.COPQ_RELATES_TO_STEP.writeValue(hid_step_no, stpObject[hid_step_no], row);
		F.COPQ_UPDATED_BY.writeValue(F.STEP_OWNER.read(hid_step_no), F.STEP_OWNER.readDisplayedValue(hid_step_no), row);
		F.COPQ_UPDATED_BY.disable(row);
		//F.COPQ_RELATES_TO_STEP.disable(row);
	}

	//if(F.COPQ_RELATES_TO_STEP.read(row)!=hid_step_no){
	F.COPQ_NUMBER.enable(row);
	F.COPQ_CATEGORY.enable(row);
	F.COPQ_DESCRIPTION.enable(row);
	F.COPQ_CURRENCY.enable(row);
	F.COPQ_AMOUNT.enable(row);
	//F.COPQ_RELATES_TO_STEP.enable(row);
	//F.COPQ_UPDATED_BY.enable(row);


	//}
	if (F.CPQ.getRowCount() > 1) {
		var k = F.CPQ.getRowCount();
		for (var r = 1; r <= k; r++) {
			F.COPQ_NUMBER.write(r, r);
			//makeFieldRequired('COPQ_NUMBER', parseInt(r), 'N');
			//makeFieldRequired('COPQ_NUMBER', parseInt(r), 'Y');
			F.COPQ_NUMBER.enable(r);
			makeFieldRequired('COPQ_CATEGORY', parseInt(r), 'Y');
			makeFieldRequired('COPQ_CURRENCY', parseInt(r), 'Y');
			makeFieldRequired('COPQ_AMOUNT', parseInt(r), 'Y');
			//makeFieldRequired('COPQ_UPDATED_BY', parseInt(r), 'Y');
			//commented now
			/* if (F.COPQ_RELATES_TO_STEP.read(r) != hid_step_no) {
			F.COPQ_CATEGORY.disable(r);
			F.COPQ_DESCRIPTION.disable(r);
			F.COPQ_CURRENCY.disable(r);
			F.COPQ_AMOUNT.disable(r);
			F.COPQ_RELATES_TO_STEP.disable(r);
			F.COPQ_UPDATED_BY.disable(r);
			} */
			/*if (F.COPQ_UPDATED_BY.read(r) == '') {
			//F.COPQ_UPDATED_BY.writeValue(F.STEP_OWNER.read(hid_step_no), F.STEP_OWNER.readDisplayedValue(hid_step_no), r);

			F.COPQ_UPDATED_BY.write(F.STEP_OWNER.readDisplayedValue(hid_step_no), r);

			}*/

		}
	}
	var t1 = F.CPQ.getRowCount();
	F.TOTAL_COPQ.write(t1);
	F.TOTAL_COPQ.disable();
	F.COPQ_GEN_ATTACHMENT.enable();

}
//All steps validation
function allStepsValidation() {

	//F.STEP_DESC.disableAll();
	if (hid_step_no == 0) {
		if ((currentStage == '' && previousStage == '') || (currentStage == 'INT' && previousStage == 'MGR')) //for Step0 and initiator Stage
		{

			//alert('Iam in initiator Stage');
			if (F.getFormParameter('link_rpt_ro') != 'yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_INITIATE"]); //setting the title based on step and stage
			}
			/*if (F.CAR_STATUS.read() == '') {
			//F.CAR_STATUS.writeValue(10, jsAlertMessages["INT_STATUS"]);
			}*/
			if (F.DUE_DATE.read() == '') {
				F.DUE_DATE.hide();
			} else {
				F.DUE_DATE.show();
				SetPositionOfField('DUE_DATE', 10, 4, 15);
			}
			F.CREATION_TYPE.write(2); //defaulted to adhoc
			F.CREATION_TYPE.disable();
			//F.CAR_CREATED_BY.makeRequired();
			F.CREATOR_DEPT.makeRequired();
			F.ORIGIN.makeRequired();
			//F.CAR_STATUS.makeRequired();
			//F.CREATION_TYPE.makeRequired();
			//F.HID_CURRENT_DATE.read()
			if (F.CAR_CREATED_ON.read() == '')
				F.CAR_CREATED_ON.writeValue(F.HID_CURRENT_DATE.read(), F.HID_CURRENT_DATE.read());
			F.PRIORITY.makeRequired();
			F.RESP_DEPT.makeRequired();
			F.MANAGER.makeRequired();
			F.PROBLEM_DESC.makeRequired();
			F.SOURCE_SYSTEM_ID.makeRequired();
			F.getTab('MSAI_41').goToTab(1);

		} else if ((currentStage == 'MGR' && previousStage == 'INT') || (currentStage == 'MGR' && previousStage == 'OWN')) //for  step0  manager Stage

		{

			/*p1 = F.PRIORITY.read();
			r1 = F.RESP_DEPT.read();
			d1 = F.RESP_DEPT.readDisplayedValue();*/
			F.FINAL_APPROVER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue());
			F.FINAL_APPROVER_ORG.writeValue(F.RESP_DEPT.read(), F.RESP_DEPT.readDisplayedValue());
			//alert('Iam in MGR Stage');
			if (F.getFormParameter('link_rpt_ro') != 'yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_REVIEW"]);
			}
			//F.STP.showFirstPage();
			//F.STP.showPage(1);
			F.APPROVE_CAR_INITIATION.makeRequired();

			makeRequiredAndDisableFields(); //
			if (F.APPROVE_CAR_INITIATION.read() == '' || F.APPROVE_CAR_INITIATION.read() == 2) {
				hideownership(); //for hiding the STP region by default
				STPmakeRequire();
			}
			F.getTab(Tabs.OWN_DETLS).show();
			F.getTab('MSAI_41').goToTab(2); //Ownership DueDates

			//Action drop down validations

			if ((currentStage == 'MGR' && previousStage == 'INT')) //|| (currentStage == 'MGR' && previousStage == 'OWN')) {
			{
				if (F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == '') {
					removeFromAction();

				}
			}
			if (currentStage == 'MGR' && previousStage == 'OWN') {
				F.APPROVE_CAR_INITIATION.disable();
				F.MANAGER.disable();
				F.RESP_DEPT.disable();
			}
		} else if (currentStage == 'OWN' && previousStage == 'MGR') //For Step0 Owner Stage
		{
			F.getTab('MSAI_41').goToTab(2); //Ownership DueDates
			STPmakeRequire();
			/* F.STEP_DUE_DATE.disableAll(); */
			F.CAR_OWNER.disable();
			//alert('Iam in Owner Stage');
			if (F.getFormParameter('link_rpt_ro') != 'yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_REVIEW"]);
			}
			//F.STP.showFirstPage();
			//F.STP.showPage(1);
			F.RESP_DEPT.disable();
			for (var i = 1; i < F.STP.getRowCount(); i++) {
				if (F.STEP_L1_APPROVER.read(i) == '')
					F.STEP_L2_APPROVER.disable(i);
			}

			F.MANAGER.disable();
			F.PRIORITY.disable();
			//F.DUE_DATE.disable();
			makeRequiredAndDisableFields();
			//hideownership();
			F.APPROVE_CAR_INITIATION.disable();
			for (var i = 1; i < F.STP.getRowCount(); i++) {
				if (F.STEP_L1_APPROVER.read(i) != '') {
					F.STEP_L2_APPROVER.enable(i);
				}
			}

		}
	} 
}

//Validations of Identify Team when selecting transfer of ownership and trigger  action items
function onSubmitValidations() {

	if (F.USER_ACTION.read() == 7) { //|| F.USER_ACTION.read() == 3
		//alert('onsubmit');
		if (hid_step_no == 1) {
			var count = 0;
			for (var i = 1; i <= F.PTM.getRowCount(); i++) {
				if (F.PTM.isMarkedForDeletion(i) == true)
					count++;
			}
			if (F.PTM.getRowCount() - count > 1) {
				alert(jsAlertMessages["DELETE_ROWS_PTM"]);
				return false;
			} else {
				return true;
			}
		} else if (hid_step_no == 2) {
			var count = 0;
			for (var i = 1; i <= F.QST.getRowCount(); i++) {
				if (F.QST.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.QST.getRowCount() - count;
			if (k >= 3) {
				for (var j = 1; j <= k; j++)
					if (F.ANSWER.read(j) != '') {
						alert(jsAlertMessages["DELETE_ROWS_QST"]);
						return false;
					} else {
						return true;
					}
			}
		} else if (hid_step_no == 3) {
			var count = 0;
			for (var i = 1; i <= F.CNT.getRowCount(); i++) {
				if (F.CNT.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.CNT.getRowCount() - count;
			if (k >= 1) {
				for (var j = 1; j <= k; j++) {
					if (F.CNT_ACTION_DESCRIPTION.read(j) != '' || F.PROCESS_CONTAINED.read(j) != '' || F.IMPACTED_POPULATION.read(j) != '') {
						alert(jsAlertMessages["DELETE_ROWS_CNT"]);
						return false;
					} else {
						return true;
					}
				}
			}
		} else if (hid_step_no == 4) {
			var count = 0;
			for (var i = 1; i <= F.RCA.getRowCount(); i++) {
				if (F.RCA.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.RCA.getRowCount() - count;
			if (k >= 1) {
				for (var j = 1; j <= k; j++)
					if (F.RCA_TYPE.read(j) != '' || F.RCA_DESCRIPTION.read(j) != '') {
						alert(jsAlertMessages["DELETE_ROWS_RCA"]);
						return false;
					} else {
						return true;
					}
			}
		} else if (hid_step_no == 5) {
			var count = 0;
			for (var i = 1; i <= F.CRA.getRowCount(); i++) {
				if (F.CRA.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.CRA.getRowCount() - count;
			if (k >= 1) {
				for (var j = 1; j <= k; j++)
					if (F.CRA_ACTION.read(j) != '') {
						alert(jsAlertMessages["DELETE_ROWS_CRA"]);
						return false;
					} else {
						return true;
					}
			}
		} else if (hid_step_no == 6) {
			if (F.EFFECT_CHECK_AUTHORITY.read() != '' || F.NEED_EFFECT_VERIFICATION.read() != '' && F.EFFECT_CHECK_DUE_DATE.read()) {
				alert(jsAlertMessages["CLEAR_VERIFY_EFFECTIVENESS"]);
				return false;
			} else {
				return true;
			}
		} else if (hid_step_no == 7) {
			var count = 0;
			for (var i = 1; i <= F.PRA.getRowCount(); i++) {
				if (F.PRA.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.PRA.getRowCount() - count;
			if (k >= 1) {
				for (var j = 1; j <= k; j++)
					if (F.PRA_ACTION.read(j) != '' || k > 1) {
						alert(jsAlertMessages["DELETE_ROWS_PRA"]);
						return false;
					} else {
						return true;
					}
			}

		}
	}
	//alert(F.STEP_DUE_DATE.readAll());

	if (F.USER_ACTION.read() == 1 && hid_step_no == 6 && F.EFFECT_CHECK_COMP_DATE.read() == '' && F.HID_VERIFICATION.read() != '' && F.NEED_EFFECT_VERIFICATION.read() == 1) {
		alert(jsAlertMessages["VERIFICATION_IN_PROGRESS"]);
		return false;
	}

}

//ACtion Item related functions

//This function is for showing Action Tab when click on Initiate Action Item
function showActionTab() {
	//alert('1809');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('tr:eq(0)').find('th:eq(8)').attr('width', '200px');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('tr:eq(0)').find('th:eq(9)').attr('width', '200px');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('th:eq(0)').find('input').attr('disabled', true);
	F.USER_ACTION.removeFromDropDown(7);
	F.USER_ACTION.removeFromDropDown(6);
	F.USER_ACTION.removeFromDropDown(10);
	F.USER_ACTION.removeFromDropDown(9);
	F.USER_ACTION.removeFromDropDown(1); //remove submit when we select initiate action link
	F.USER_ACTION.addToDropDown(3, jsAlertMessages["TRIGGER_ACTION_ITEM"]);
	if (hid_step_no == 6) {
		F.USER_ACTION.removeFromDropDown(7);
		F.USER_ACTION.removeFromDropDown(10);
	}
	//F.getTab('MSAI_41').goToTab(12);
	//document.getElementById('MSAI_1150').innerHTML ='<a id=MSAI_1150 class=msai_flexi_button tabindex="0" title = "Refresh" onclick="javascript:checkResponse()" aside_onclick="javascript:checkResponse()"><img src="/ext/resources/images/default/msi/appstudio/refresh_action.gif" width=18 height=18 align = right>';

	var getrwcnt = F.ACT.getRowCount();
	if (getrwcnt > 0) {
		for (var i = 1; i <= getrwcnt; i++) {
			actionValidate(i);
			//alert('showactiontab fun called');
		}
	}

	if (F.ACTION_ITEM_START_DATE.read() == '') {
		F.ACT.showPage(1);
		F.ACTION_ITEM_START_DATE.write(getDates(F.getUserDate()));
		var a = hid_step_no;
		//F.ACTION_APPROVER.writeValue(F.STEP_OWNER.read(a), F.STEP_OWNER.readDisplayedValue(a), n);
	}
	F.getTab(Tabs.ACTION).show();
	//F.ACTION_ITEM_NO.enable();
	F.ACTION_ITEM_TITLE.enableAll();
	F.ACTION_OWNER.enableAll();
	F.ACTION_PRIORITY.enableAll();
	F.ACTION_APPROVER.enableAll();
	//F.ACTION_RELATES_TO.enableAll();
	F.ACTION_ITEM_START_DATE.enableAll();
	F.ACTION_ITEM_DUE_DATE.enableAll();
	F.ACTION_DESC.enableAll();
	//F.ACTION_RESPONSE.enableAll();
	F.getTab('MSAI_41').goToTab(12); //MSAI_41 Id for All tabs
	//gridHandler('ACTION_RELATES_TO', 'ACTION_RELATES_TO', 'ACT');
	actionRelatesTo();
	var row1 = F.ACT.getRowCount();
	if (F.ACTION_ITEM_NO.read(row1) != '' && F.ACTION_ITEM_TITLE.read(row1) != '' && F.ACTION_OWNER.read(row1) != '') {
		F.ACT.addRow(true, true);
		//var row = F.ACT.getRowCount();
		//var step = parseInt(hid_step_no);
		// F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
	} else {
		var row = F.ACT.getRowCount();
		var step = parseInt(hid_step_no);
		F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
	}

	/*var rows=F.ACT.getRowCount();
	for(var i=1;i<rows;i++){
	if(F.ACTION_STEP_HIDDEN.read(i)=='Y'){
	F.ACT.disableRow(i);
	}
	}*/

}

function actionItemStDtValidate(row) {
	var fromDate = new Date(F.ACTION_ITEM_START_DATE.read(row));
	fromDate = fromDate.format("m/d/Y");
	//today = createDate();
	if (validate_start_and_end_date(new Date(), new Date(F.ACTION_ITEM_START_DATE.read(row))) == -1) {
		alert(jsAlertMessages["FROM_DATE_GT_CUR_DATE"]);
		F.ACTION_ITEM_START_DATE.write('', row);
	} else if (validate_start_and_end_date(new Date(F.ACTION_ITEM_START_DATE.read(row)), new Date(F.ACTION_ITEM_DUE_DATE.read(row))) == -1) {
		alert(jsAlertMessages["FROM_DATE_LT_END_DATE"]);
		F.ACTION_ITEM_START_DATE.write('', row);
	} else if (validate_start_and_end_date(new Date(F.ACTION_ITEM_START_DATE.read(row)), new Date(F.STEP_DUE_DATE.read(F.ACTION_RELATES_TO.read(row)))) == -1) {
		//alert('date should be less than step due date');
		//alert(jsAlertMessages["FROM_DATE_LT_STEP_DATE"]);
		//F.ACTION_ITEM_START_DATE.write('', row);
	}
}

function actionItemEndDtValidate(row) {
	var fromDate = new Date(F.ACTION_ITEM_START_DATE.read(row));
	fromDate = fromDate.format("m/d/Y");
	var toDate = new Date(F.ACTION_ITEM_DUE_DATE.read(row));
	toDate = toDate.format("m/d/Y");
	if (fromDate == '' && toDate != '') {
		alert(jsAlertMessages["PLS_INP_FROM_DATE"]);
		F.ACTION_ITEM_DUE_DATE.write('', row);
		return false;
	} else if (validate_start_and_end_date(new Date(F.ACTION_ITEM_START_DATE.read(row)), new Date(F.ACTION_ITEM_DUE_DATE.read(row))) == -1) {
		alert(jsAlertMessages["END_DATE_GT_FROM_DATE"]);
		F.ACTION_ITEM_DUE_DATE.write('', row);
	} else if (validate_start_and_end_date(new Date(), new Date(F.ACTION_ITEM_DUE_DATE.read(row))) == -1) {
		alert(jsAlertMessages["END_DATE_GT_CUR_DATE"]);
		F.ACTION_ITEM_DUE_DATE.write('', row);
	} else if (validate_start_and_end_date(new Date(F.ACTION_ITEM_DUE_DATE.read(row)), new Date(F.STEP_DUE_DATE.read(F.ACTION_RELATES_TO.read(row)))) == -1) {
		alert(jsAlertMessages["END_DATE_GT_STEP_DATE"]);
		//alert('Due date should be less than or equal to step Due date.');
		F.ACTION_ITEM_DUE_DATE.write('', row);
	}

}

function validate_start_and_end_date(check_dt, cre_dt) {
	var ret_value = '1';
	var my_chk_date = new Date(check_dt);
	var my_cre_date = new Date(cre_dt);
	var ed_month = my_chk_date.getMonth();
	var ed_date = my_chk_date.getDate();
	var ed_year = my_chk_date.getYear();
	var curr_month = my_cre_date.getMonth();
	var curr_date = my_cre_date.getDate();
	var curr_year = my_cre_date.getYear();
	if (ed_year > curr_year) {
		ret_value = '-1';
	} else {
		if (ed_year == curr_year) {
			if (ed_month > curr_month) {
				ret_value = '-1';
			} else {
				if (ed_month == curr_month) {
					if (ed_date > curr_date) {
						ret_value = '-1';
					}

				}
			}
		}
	}
	return ret_value;
}
// should be called on add row,onlclick of link and onload /
function enableActionItems(q) {
	if ((F.ACTION_RELATES_TO.read(q) == hid_step_no) && F.ACTION_STEP_HIDDEN.read(q) == '') {
		//alert('F.ACTION_RELATES_TO.read(q)' + F.ACTION_RELATES_TO.read(q));
		//alert('hid_step_no' + hid_step_no);
		//alert('enab act');
		//F.ACT.enableRow(q);
		F.ACTION_ITEM_TITLE.enable(q);
		F.ACTION_PRIORITY.enable(q);
		F.ACTION_OWNER.enable(q);
		F.ACTION_APPROVER.enable(q);
		F.ACTION_ITEM_START_DATE.enable(q);
		F.ACTION_ITEM_DUE_DATE.enable(q);
		F.ACTION_DESC.enable(q);

		//$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(q)').find('td:eq(0)').find('input').attr('disabled', false);
	} else {
		if (F.ACTION_STEP_HIDDEN.read(q) == 'Y' || F.ACTION_STEP_HIDDEN.read(q) == 'N') {
			//F.ACT.disableRow(q);
			F.ACTION_ITEM_TITLE.enable(q);
			F.ACTION_PRIORITY.disable(q);
			F.ACTION_OWNER.disable(q);
			F.ACTION_APPROVER.disable(q);
			F.ACTION_ITEM_START_DATE.disable(q);
			F.ACTION_ITEM_DUE_DATE.disable(q);
			F.ACTION_DESC.disable(q);

		}

		//$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(q)').find('td:eq(0)').find('input').attr('disabled', true);
	}
}

/*Action Response validation*/
function checkResponse() {
	//alert('in here');
	var x = F.HID_ACTION_HELPER.read();
	if (F.HID_ACTION_HELPER.read() != '' && F.HID_ACTION_HELPER.read() != 'i') {
		//alert(F.HID_ACTION_HELPER.read());
		F.HID_ACTION_HELPER.callInfolet();
		setTimeout(function () {
			//alert('hi');
			var x = 0;
			var fin_action;
			var actions = F.HID_ACTION_HELPER.read();
			actions = actions.split(',');
			//alert(actions[0]);
			//alert(F.HID_ACTION_RESPONSE.read());
			//alert(F.HID_ACTION_RESPONSE.read().length);
			if (F.HID_ACTION_RESPONSE.read().length > 4 || F.HID_ACT_OWNER_CHANGE.read().length > 4) {
				//alert('wrong place');
				//alert(F.HID_ACTION_RESPONSE.read());
				var _content = eval('(' + F.HID_ACTION_RESPONSE.read() + ')');
				var _contents = eval('(' + F.HID_ACT_OWNER_CHANGE.read() + ')');
				//alert(F.HID_ACTION_RESPONSE.read());
				// _content is an array of objects
				for (var i = 0; i < _content.length; i++) {
					var _actObject = _content[i];
					var _actObjects = _contents[i];
					var actionID = _actObject.ID;
					var actionStatus = _actObject.STATUS;
					var actionResponse = _actObject.RESPONSE;
					var _actObjects = _contents[i];
					var actionIDs = _actObjects.ID;
					var actionOwner = _actObjects.OWNER;
					var actionApprover = _actObjects.APPROVER;
					//alert(actionID+' '+actionStatus+' '+actionResponse);
					//F.ACTION_RESPONSE.makeRequired(i);


					//var z=F.ACTION_ITEM_NO.findRow(actionID);
					for (z = 1; z <= F.ACT.getRowCount(); z++) {
						//alert(z);
						F.ACT.showPage(z);
						//alert('action ID'+F.ACT_NO.read(z)+'in str'+actionID+'status'+actionStatus+'num'+z);
						if (F.ACT_NO.read(z) == actionID && actionStatus == '67') {
							for (var l = 0; l < actions.length; l++) {
								if (actions[l] == actionID) {
									//alert(actions[l]);
									actions[l] = 'i';
									//alert(actions[l]);
									//alert(actions.toString());
								}
							}
							//alert(z);

							F.ACTION_RESPONSE.write('done', z);
						}
						if (F.ACT_NO.read(z) == actionIDs && F.ACTION_OWNER.read(z) != actionOwner) {
							// alert('owner'+actionOwner);
							F.ACTION_OWNER.write(actionOwner, z);

						}
						if (F.ACT_NO.read(z) == actionIDs && F.ACTION_APPROVER.read(z) != actionApprover) {
							// alert('owner'+actionApprover);
							//F.ACTION_APPROVER.write(actionApprover, z);
						}

					}

				}

			}
			// alert('hey');
			var mx = actions.toString();
			var mx = mx.replace(/i,/g, "");
			var mx = mx.replace(/,i/g, "");
			//alert('actions');
			//alert('mx'+mx);

			F.HID_ACTION_HELPER.write(mx);
			//alert('hid_act_helper'+F.HID_ACTION_HELPER.read());
			F.HID_ACTION_RESPONSE.write('');
			F.HID_ACT_OWNER_CHANGE.write('');
		}, 200);
	} else {
		clearInterval(act_time_interval);
	}
	actionCheckboxValidation();
}

function actionValidate(x) {
	//alert('actionValidate fun called'+x);
	//debugger;
	F.ACTION_ITEM_TITLE.makeRequired(x);
	//F.ACTION_ITEM_TITLE.disable(x);
	//F.ACTION_ITEM_NO.disable(x);
	F.ACTION_OWNER.makeRequired(x);
	//F.ACTION_ITEM_START_DATE.makeRequired(x);
	F.ACTION_ITEM_DUE_DATE.makeRequired(x);
	F.ACTION_DESC.makeRequired(x);
	F.ACTION_PRIORITY.makeRequired(x);
	//F.ACTION_ITEM_NO.makeRequired(x);
	F.ACTION_RESPONSE.disable(x);
	F.ACTION_RELATES_TO.disable(x);
	actionCheckboxValidation();
	/*if (F.ACTION_STEP_HIDDEN.read(x) == 'Y' || F.ACTION_STEP_HIDDEN.read(x) == 'N') {
	F.ACT.disableRow(x);
	//fn_checkbox_disabling();
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + x + ')').find('td:eq(0)').find('input').attr('disabled', true);*/
}

//based on the step actions triggered the field action relates to is defaulted
function actionRelatesTo(ax) {

	//alert('ax'+ax);
	//alert('in relates to');
	var step = hid_step_no;
	//alert(step+' '+ax+' '+stpObject[step]);
	F.ACT.showPage(ax);
	F.ACTION_RELATES_TO.writeValue(step, stpObject[step], ax);
	//alert(F.ACTION_RELATES_TO.read(ax));

}

function actionCheckboxValidation() {

	disableActions();
	for (var x = 1; x <= F.ACT.getRowCount(); x++) {
		if (F.ACTION_STEP_HIDDEN.read(x) == 'Y' || F.ACTION_STEP_HIDDEN.read(x) == 'N') {
			//F.ACT.disableRow(x);
			F.ACTION_ITEM_TITLE.enable(x);
			F.ACTION_PRIORITY.disable(x);
			F.ACTION_OWNER.disable(x);
			F.ACTION_APPROVER.disable(x);
			F.ACTION_ITEM_START_DATE.disable(x);
			F.ACTION_ITEM_DUE_DATE.disable(x);
			F.ACTION_DESC.disable(x);
			//$('#msai_multirow_datagrid_'+F.ACT.getID()).find('tbody').find('tr:eq('+(x-1)+')').hide();
			//fn_checkbox_disabling();
			//$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + x + ')').find('td:eq(0)').find('input').attr('disabled', true);
		}
	}
}

//To validate IMPACTED_POPULATION to be a positive whole number
F.IMPACTED_POPULATION.onChange(function (row) {
	F.CNT.showPage(row);

	//alert(F.IMPACTED_POPULATION.read(row)%1 !=0);
	if (((F.IMPACTED_POPULATION.read(row) % 1) != 0) || (F.IMPACTED_POPULATION.read(row) < 0)) {
		alert(jsAlertMessages["ENT_PSTV_NO"]);
		//alert('Please enter a whole number');
		F.IMPACTED_POPULATION.write('', row);
	}

});

//diisable the check box after the assignment is triggered
function disableActions() {
	for (var x = 1; x <= F.ACT.getRowCount(); x++) {
		if (F.ACTION_STEP_HIDDEN.read(x) == 'Y' || F.ACTION_STEP_HIDDEN.read(x) == 'N') {
			$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + (x - 1) + ')').hide();

		}
	}

}
/* --- This function once called will group the grid, if called for second time it will Ungroup the grid
groupBy   --> Group By Field
rowField  --> A field which will always contain some value in multiRow
multiRowName --> Multirow Name
--- */
var groupController = false;
var localFlag = false;
gridHandler = function (groupBy, rowField, multiRowName) {
	if (F[rowField].read(1) != '' /* && groupController == false */
	) {
		//alert('hello there');
		F[multiRowName].dataGridGroupBy(groupBy);
		if (localFlag == true) {
			F[multiRowName].dataGridGroupBy(groupBy);
		}
		groupController = true;
		localFlag = true;
	}
	return;
}

//Date Format functions
//This Function is to get the Current Date in MM/DD/YYYY HH:MM:SS format
//MM/dd/yyyy HH:mm:ss
function getDates(date) {

	var now = new Date(date);
	year = now.getFullYear();
	month = (now.getMonth() + 1);
	day = now.getDate();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();
	return month + "/" + day + "/" + year;
	//return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
}
//This function is for getting Date in MM/DD/YYYY format
function getRoundedDate(date) {

	var now = new Date(date);
	year = now.getFullYear();
	month = (now.getMonth() + 1);
	day = now.getDate();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();

	return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
}

function urlfunction() {

	var proc_insta_id = F.HIDDEN_FIELD_EFFECT.read().split(",");

	var url = SERVLET_URL + "/Pushinfolet?id=" + proc_insta_id[0] + "&proc=" + proc_insta_id[1] + "&instid=" + proc_insta_id[2] + "&submit_back=no&flag=0&emd=1" + "&wrapper=no" + "&from_link=yes";
	var sOptions = 'target=_blank,width=800px,height=680px,resizable=yes,scroll=yes,toolbar=no,top=0,left=0';
	//popupWindow = showPopup(url, '', sOptions);
	showPopup(url, 'instance@uniqueid@ + rc', '', 1000, 680, 'yes', 300, 300, 'yes', 'yes');
}
function gettemplatelink() {
	linktext = "$!{WEBROOT}/MS_CAP/MS_CAP_CAR_JS.vm";
	window.open(linktext);
}

function makeRequiredAndDisableFields() { //common Function for MGR and OWN stage to make require and disable Fiels
	F.DETAILS_ATTACHMENTS.disable();
	F.CAR_CREATED_BY.disable()
	F.MANAGER.makeRequired();
	F.PRIORITY.makeRequired();
	F.RESP_DEPT.makeRequired();
	F.PRODUCT_ID.disable();
	F.PRODUCT_ID.makeNotRequired();
	F.SOURCE_SYSTEM_ID.disable();
	F.ORIGIN.disable();
	F.CREATOR_DEPT.disable();
	F.REQUESTED_FOR.disable();
	F.CREATION_TYPE.disable();
	F.UOM.disable();
	F.TOTAL_QUANTITY.disable();
	F.CUSTOMER_NAME.disable();
	F.CUSTOMER_NAME.makeNotRequired();
	F.PRIMARY_EVAL_PERFMD_DESC.disable();
	F.ISSUE_LOCATION.disable();
	F.PRIMARY_EVAL_PERFORMED.disable();
	F.PROBLEM_DESC.disable();
	F.THRDPRTY_ORG_NME.disable();
	F.UOM.disable();
	F.SRC_PROCESS_NAME.disable();
	F.SRC_PROCESS_NAME.makeNotRequired();
	F.SOURCE_SYSTEM_OBJECT_ID.disable();
	F.INTERNAL_DEPARTMENT_NAME.disable();
	F.INTERNAL_DEPARTMENT_CONTACT.disable();
	F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
	F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();

}
//This Function is for Making fields Required and disable  Based on Step and Stage

/* --------------------------------------------------- *** *************************  *** ---------------------------------------------------*/
/* --------------------------------------------------- *** After Add Row validations *** ---------------------------------------------------*/
/* --------------------------------------------------- *** **************** ******** *** ---------------------------------------------------*/

F.PTM.afterAddRow(function () {
	ptmValidation();

	$('.nonEditable-string-cell').css('text-align', 'center');
});

//Make Required for QST region
F.QST.afterAddRow(function () {
	qstValidations();

	$('.nonEditable-string-cell').css('text-align', 'center');
});

//Make Required for CNT region
F.CNT.afterAddRow(function () {
	cntValidation();

	$('.nonEditable-string-cell').css('text-align', 'center');
});
F.RCA.afterAddRow(function () {
	RCA_Validation();

	$('.nonEditable-string-cell').css('text-align', 'center');
});

F.CRA.afterAddRow(function () {
	craValidation();

	$('.nonEditable-string-cell').css('text-align', 'center');

});

F.PRA.afterAddRow(function () {
	praValidation();

	$('.nonEditable-string-cell').css('text-align', 'center');
});

F.TSK.afterAddRow(function () {
	tskValidation();

	$('.nonEditable-string-cell').css('text-align', 'center');
});
F.CPQ.afterAddRow(function () {
	var row = F.CPQ.getRowCount();

	copqValidation(row);

	$('.nonEditable-string-cell').css('text-align', 'center');
});

F.ACT.afterAddRow(function (row) {

	var n = F.ACT.getRowCount();
	//alert('n value'+n);
	//n = n + 1;
	var a = hid_step_no;
	F.ACT.showPage(row);
	//F.ACTION_APPROVER.writeValue(F.STEP_OWNER.read(a), F.STEP_OWNER.readDisplayedValue(a), row);
	//alert(F.ACTION_APPROVER.read(row));
	F.ACTION_ITEM_START_DATE.write(getDates(F.getUserDate()), n);

	for (var i = 1; i <= n; i++)
		F.ACTION_ITEM_NO.writeValue(i, i, i);

	actionRelatesTo(n);
	enableActionItems(n);
	//gridHandler('ACTION_RELATES_TO', 'ACTION_RELATES_TO', 'ACT');
	actionValidate(n);

	$('.nonEditable-string-cell').css('text-align', 'center');
});

//on click of the Ownershipdetails Tab
F.getTab('MSAI_41').onClick(function (tabNumber) {
	//hideApprovers();
	//showing the L1 Approved by in L2 approver stage
	try {
		if (currentStage == "L2A") {
			showL1Approver();
		}
		//showing the L1 & L2 Approved  by in next SOW stage
		if (currentStage == "SOW" && hid_step_no > 1) {
			//showApprovers();
		}
		//alert('tabNum'+tabNumber);
		if (hid_step_no >= 1 && hid_step_no <= 7) {
			if ((tabNumber > 2 && tabNumber < 10) && currentStage != 'L1A' && currentStage != 'L2A' && (previousStage != 'SOW' && currentStage != 'OWN')) {
				if (hid_step_no != 6) {
					F.USER_ACTION.addToDropDown(1, jsAlertMessages["SUBMIT"]);
				}

				if (F.USER_ACTION.read() != 3)
					F.USER_ACTION.removeFromDropDown(3);

			}
			if (F.HIDDEN_ASSIGNEE.read() == F.CAR_OWNER.read()) {
				F.USER_ACTION.removeFromDropDown(7);
			} else {
				if (hid_step_no > 0 && currentStage != 'OWN' && previousStage != 'SOW' && hid_step_no != 6 && F.HID_CHNG_OWN_FLG.read() == '')
					F.USER_ACTION.addToDropDown(7, jsAlertMessages["REQ_OWN_CHNG"]);
			}

			if (tabNumber == 12 && currentStage != 'L1A' && currentStage != 'L2A' && (previousStage != 'SOW' && currentStage != 'OWN')) {
				//	alert('2852');
				F.USER_ACTION.removeFromDropDown(1);
				F.USER_ACTION.removeFromDropDown(7);
				F.USER_ACTION.removeFromDropDown(6);
				F.USER_ACTION.removeFromDropDown(10);
				F.USER_ACTION.removeFromDropDown(9);
				F.USER_ACTION.addToDropDown(3, jsAlertMessages["TRIGGER_ACTION_ITEM"]);
			}
		}

		/*else if (tabNumber == 12) {
		/*for (var row = 1; row <= F.ACT.getRowCount(); row++)
		enableActionItems(row);*/
		//alert(row);
		//}
	} catch (error) {
		return true;

	}
	return true;
});

/*F.getTab("MSAI_41").afterTabDisplay(function(tabNumber){
alert(tabNumber);
});*/
//Onload validations

function test(a, b) {
	F.getTab('MSAI_41').goToTab(b);
	var status = F.STEP_STATUS.readAll().split(',');
	//alert('status'+status[b]);
}

$(document).ready(function () {
	$('#MSAI_TD_CREATOR_DEPT_1').css('width', '33.3%');
	$('#MSAI_TD_INTERNAL_DEPARTMENT_NAME_1').css('width', '33.3%');
	$('#MSAI_TD_SOURCE_SYSTEM_OBJECT_ID_1').css('width', '33.3%');
	$('#MSAI_TD_ORIGIN_1').css('width', '33.3%');
	$('#MSAI_TD_REQUESTED_FOR_1').css('width', '33.3%');
	$('#MSAI_TD_PRODUCT_ID_1').css('width', '33.3%');
	$('#MSAI_TD_CREATION_TYPE_1').css('width', '33.3%');
	/*$('#MSAI_TD_STEP1_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP2_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP3_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP4_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP5_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP6_L1_APPROVED_BY_1').css('width', '33.3%');
	$('#MSAI_TD_STEP7_L1_APPROVED_BY_1').css('width', '33.3%');		*/
});

F.onLoad(function () {
	//****change of Organisation  and change of priority in Manager stage******/
	if ((currentStage == 'MGR' && previousStage == 'INT') || (currentStage == 'MGR' && previousStage == 'OWN')) {
		p1 = F.PRIORITY.read();
		r1 = F.RESP_DEPT.read();
		d1 = F.RESP_DEPT.readDisplayedValue();
		mgrStored1 = F.MANAGER.read();
		mgrDisp1 = F.MANAGER.readDisplayedValue();
	}
	// F.switchOffLogging();
	jQuery('#MSAI_1491').hide();
	onloadValidations();

	if ((currentStage == 'INT' && previousStage == 'MGR') || (currentStage == 'MGR' && previousStage == 'OWN')) {
		F.USER_COMMENT.makeRequired();
	}

	if (F.getFormParameter('from_link') == undefined) {
		try {
			window.parent.window.parent.Ext.get("MultipleWindow1").unmask();
		} catch (error) {
			console.log('error' + error);
		}
	} else {

		$('.toolbarContainer').hide();
		$('.msai_hyperlink').hide();
	}

	//giving values to opt
	if (F.DD_CURRENT_STAGE.read() == 'OWN') {
		for (var b = 1; b <= F.STP.getRowCount(); b++) {
			if (F.INCLUSION_EXCLUSION.read(b) == 'no') {
				opt[b] = '';
			} else {
				opt[b] = F.INCLUSION_EXCLUSION.read(b);
			}
			
		}
		incl_excl = 2;
		//alert(opt);
		//alert(opt.length);
	}
	
});

function onloadValidations() {

	//F.CAR_CREATED_BY.disable();
	if (formStatus != 1) {
		F.DD_CURRENT_STAGE.callInfolet();
		//alert('call infolet 3081');
	}

	if (formStatus != 1) {
		F.CAR_NO_INTERNAL.callInfolet();
		//alert('call infolet 3041');
	}
	

	//To set the + symbol next to the filed
	$('#MSAI_1708').hide();
	//SetPositionOfField('CREATION_TYPE,PRIORITY,DUE_DATE', 10, 4, 15);
	//SetPositionOfField('RESP_DEPT,MANAGER', 10, 7, 15);
	//To take out 'Request for ownership change' from the drop down
	
	var arr = $("#MSAI_TD_ORIGIN_1").position();
	F.HID_METRIC_ID.write(F.getInfoletId());
	//$('<tr colspan="10"><td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Details</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Ownership & Due Dates</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Prevent Recurrence</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Final Review</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Congratulate Team</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");
	//to create links in the
	//$('<tr colspan="10"><td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.1])">Details</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Ownership & Due Dates</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Identify Team</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Define Problem</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Containment Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Root Cause Analysis</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Corrective Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Effectiveness Verification</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Prevent Recurrence</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Congratulate Team</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");
	//$('<tr colspan="10"><td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.1])">Details</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.2])">Ownership & Due Dates</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[1])">Identify Team</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[2])">Define Problem</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[3])">Containment Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[4])">Root Cause Analysis</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[5])">Corrective Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[6])">Effectiveness Verification</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[7])">Prevent Recurrence</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[8])">Congratulate Team</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");
	//$('<tr colspan="10"><td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.1],1)">Details</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.2],2)">Ownership & Due Dates</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[1],3)">Identify Team</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[2],4)">Define Problem</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[3],5)">Containment Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[4],6)">Root Cause Analysis</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[5],7)">Corrective Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[6],8)">Effectiveness Verification</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[7],9)">Prevent Recurrence</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[8],10)">Congratulate Team</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");
	//$('<tr colspan="10" id="div_100225"></tr>').insertBefore("#MSAI_8");
	/*for(var i=1;i<=8;i++){
	$('#div_100225').append($('<td colspan="10"><div ><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.1],1)">stpObject[1]</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td>'));
	}*/
	/*
	$('#div_100225').find('a').css({
	color: '#ff0000'
	});
	 */
	//alert('onload');
	//F.CAR_ID.callInfolet();
	docType();
	F.RESTART_CAR.hide();
	F.CAR_STATUS.disable();
	//for making the effectiveness form trigger flag null in another iteration

	F.NEW_STEP_OWNER.hide();

	//alert('commented');

	if (formStatus != 1)
		F.USER_COMMENT.write('');
	//F.STP.setRowsPerPage(10); //for setting 10 rows in the STP region
	var f1 = F.getFormParameter("submit_back");
	if (f1 == 'no') {
		//F.activateToolBar();
		//F.toolBar.show();
		hideTabs();
	}

	

	map_flag = F.FLAG.read();
	F.USER_ACTION.makeRequired();
	if (formStatus == 0)
		F.USER_COMMENT.write("");
	F.HIDDEN_PID.write(F.getPID());
	if (F.CAR_ID.read() == '') {
		F.CAR_ID.write('0');
	}


	if (F.DD_PROCESS_CODE.read() == '') {
		F.DD_PROCESS_CODE.write('MS_CAP_CAR_STEP0_WF');
	}


	allStepsValidation(); //This Function is for Making Fields required
	//Hiding the links in the CAR Form ,For L1 , L2 and for owner when   Approvers no need to show that links
	if (currentStage == 'L1A' || currentStage == 'L2A' || (currentStage == 'OWN' && previousStage == 'SOW')) {
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			$('.toolbarContainer').hide();
			$('.msai_hyperlink').hide();
		}
		F.disableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
	}


	$("#DUE_DATE_label__div").attr('title', 'Auto derived based on CAR Priority'); //Tool tip text for Due Date
	//when step owner and car owner are same change ownership should be removed from dropdown

	if (F.DD_CURRENT_USER_NAME.read() == F.CAR_OWNER.read()) {
		if (F.HID_STEP != 0)
			F.USER_ACTION.removeFromDropDown(7);
	}
	
	
	
	//SetPositionOfField('CREATION_TYPE,PRIORITY,DUE_DATE', 10, 4, 15);
	//SetPositionOfField('RESP_DEPT,MANAGER', 10, 7, 15);

	if (F.CAR_ID.read() == '0')
		$('#CAR_ID_field__div').hide();
	else
		$('#CAR_ID_field__div').show();

	// executes when complete page is fully loaded, including all frames, objects and images
	if (F.CAR_NO_INTERNAL.read() == '') {
		F.CAR_NO_INTERNAL.write('1');
	}
	if (F.STEP_ID.read() == '')
		F.STEP_ID.writeValue('1', 1, 1);
	if (F.PTM_NO.read() == '')
		F.PTM_NO.writeValue(1, 1, 1);
	//F.PTM_NO.write('1', 1);
	if (F.CRA_NO.read() == '')
		F.CRA_NO.writeValue(1, 1, 1);
	if (F.ACTION_ITEM_NO.read() == '')
		F.ACTION_ITEM_NO.writeValue('1', 1, 1);
	if (F.CNT_NO.read() == '')
		F.CNT_NO.writeValue('1', 1, 1);
	if (F.RCA_NO.read() == '')
		F.RCA_NO.writeValue('1', 1, 1);
	if (F.CORR_ACTION_NO.read() == '')
		F.CORR_ACTION_NO.writeValue(1, 1, 1);
	if (F.PREV_ACTION_NO.read() == '')
		F.PREV_ACTION_NO.writeValue(1, 1);
	if (F.TASK_ACTION_NO.read() == '')
		F.TASK_ACTION_NO.writeValue(1, 1);
	if (F.COPQ.read() == '')
		F.COPQ.writeValue(1, 1);
	if (F.PRA_NO.read() == '')
		F.PRA_NO.writeValue(1, 1, 1);
	if (F.RAC_NUMBER.read() == '')
		F.RAC_NUMBER.writeValue(1, 1);
	//F.RECIPIENTS.write(1, 1);
	//F.PRA_RCA_NO.write(1, 1);
	//F.CRA_RCA_NO.write(1, 1);
	//F.RELATED_CARS.write(1, 1);
	//F.PRODUCT_ID.write(1, 1);
	//F.STEP_SEQ_NO.write('NONE', 1);
	if (F.CNT_ACT_ID.read() == '')
		F.CNT_ACT_ID.writeValue('1', 1);
	if (F.MEMBER_ID.read() == '')
		F.MEMBER_ID.writeValue('1', 1);
	if (F.QUESTION_ID.read() == '')
		F.QUESTION_ID.writeValue('1', 1);
	//debugger;
	if (F.COPQ_NUMBER.read() == '')
		F.COPQ_NUMBER.writeValue(1, 1, 1);
	if (F.TASK_NO.read() == '')
		F.TASK_NO.writeValue(1, 1, 1);
	if (F.ACT_NO.read() == '')
		F.ACT_NO.writeValue(1, 1);
	if (formStatus == 5 || formStatus == 0 || formStatus == 1) {
		 //This function is for Ownership details validation
		 else if (hid_step_no == 6 && currentStage == 'SOW') {
			//verificationActions();
			//alert('3166 verificationActions')
			//F.EFFECT_CHECK_AUTHORITY.writeValue(F.STEP_OWNER.read(6),F.STEP_OWNER.readDisplayedValue(6));

		} 
		} 
	


	}

}

//setting the default value 1 for first row each multirow field
$(window).load(function () {


	if (hid_step_no > 0)
		hideApprovers(); //hid_step_no
	//used to obtain actions
	if (F.HID_ACTION_HELPER.read() != '') {
		F.HID_ACTION_RESPONSE.write('');
		act_time_interval = setInterval(function () {
				checkResponse();
			}, 3000);
		//alert(F.HID_ACTION_RESPONSE.read());
		//checkResponse();
	}

	//To trigger checkResponse every 5 minutes


	//$('body').css('overflow-x','hidden');

	if ((F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == 2) && (currentStage == 'MGR')) {
		F.USER_ACTION.removeFromDropDown(14);

	}

	if (currentStage == 'MGR') {
		approveCARValidation();
	}

	if (formStatus == 5 || formStatus == 1) {
		hideTabs();
	}
	SetPositionOfField('CREATION_TYPE,PRIORITY,DUE_DATE', 10, 4, 15);
	SetPositionOfField('RESP_DEPT,MANAGER', 10, 7, 15);
	//focustabs();
	if (F.ACT.getRowCount() > 1)
		F.getTab(Tabs.ACTION).show(); 

	// if the stepowner and the CAR owner are same then request for the ownershipchange is not available
	if (F.STEP_OWNER.read(hid_step_no) == F.CAR_OWNER.read()) {
		F.USER_ACTION.removeFromDropDown(7);
	}

	//REMOVE REQUEST FOR OWNERSHIP CHANGE UPON REJECT AND RESTART
	if (F.HID_CHNG_OWN_FLG.read() == '1' && hid_step_no <= 6) {
		F.USER_ACTION.removeFromDropDown(7);
	}
	if (F.HID_CHNG_OWN_FLG.read() == '2' && hid_step_no <= 9) {
		F.USER_ACTION.removeFromDropDown(7);
	}
	//for making the comments mandatory based on action drop down
	if (F.USER_ACTION.read() == 2 || F.USER_ACTION.read() == 4 || F.USER_ACTION.read() == 7 || F.USER_ACTION.read() == 6 || F.USER_ACTION.read() == 13 || F.USER_ACTION.read() == 10 || F.USER_ACTION.read() == 17) { //2-cancel,4-Seek additional info,7-change ownership,6-request for change,13transfer of ownership ,17-seek aditional info
		F.USER_COMMENT.makeRequired();
	} else { {
			F.USER_COMMENT.makeNotRequired();
			if ((currentStage == 'INT' && previousStage == 'MGR') || (currentStage == 'MGR' && previousStage == 'OWN'))
				F.USER_COMMENT.makeRequired();

		}

	}

	/*Toolbar creation */

	if (F.getFormParameter('link_rpt_ro') == 'yes') {
		$('.toolbarContainer').hide();
		$('.msai_hyperlink').hide();
		jQuery('#MSAI_1484').show();
		F.disableAll();
		//document.getElementById('MSAI_1484').cells[0].innerHTML = '<a id=msai_cancel class=msai_hyperlink tabindex=0 title = "Cancel" href="javascript:top.window.close()"><img src="/ext/resources/images/default/msi/appstudio/cancel_new.gif" width=16 height=16 align =right></img></a>';

	} else if (F.getFormParameter('link_rpt_ro') != 'yes') {
		//alert('hey');
		F.activateToolBar().show();
		toolBarConfiguration(); //for adding tool bar
		//jQuery('#MSAI_1484').hide();
	}

	//disable the form if the CAR is closed or cancelled
	if (F.CAR_STATUS.read() == 65 || F.CAR_STATUS.read() == 66) {
		F.disableAll();
		$('.toolbarContainer').hide();
		$('.msai_hyperlink').hide();
	}
});
F.NEED_EFFECT_VERIFICATION.onChange(function () {
	//if ((F.HID_CHNG_OWN_FLG.read() == '1' && hid_step_no == 6 && F.EFFECT_CHECK_DUE_DATE.read()=='') || (F.HID_CHNG_OWN_FLG.read() == '2' && hid_step_no == 6 &&F.EFFECT_CHECK_DUE_DATE.read()=='' && F.EFFECT_CHECK_DUE_DATE.read()=='')) {
	F.EFFECT_CHECK_COMP_DATE.writeValue('', '');
});

if (editFlag == 'Y') {
	F.toolBar.hideControl("submit");
	F.toolBar.hideControl("save");
	F.toolBar.hideControl("saveandclose");
	F.toolBar.showControl("edit");

}
if (editFlag == 'N') {
	$('.toolbarContainer').hide();
	$('.msai_hyperlink').hide();
	F.toolBar.hideControl("submit");
	F.toolBar.hideControl("save");
	F.toolBar.hideControl("saveandclose");
	F.toolBar.hideControl("edit");
	F.toolBar.showControl("cancel");
	F.disableAll();

}

iteration = 0;
F.onSubmit(function () {

	//writing 1 into the step-id to generate primary key
	if (F.STEP_ID.read(1) == '' && currentStage == 'MGR') {
		for (var i = 1; i <= F.STP.getRowCount(); i++)
			if (F.STEP_ID.read(i) == '')
				F.STEP_ID.writeValue('1', 1, i);
	}
	//Restart CAR should be present in 6th and the final approval stage only

	if (F.USER_ACTION.read() == 10 && (hid_step_no == 6 || hid_step_no == 9)) {
		if (hid_step_no == 6) {
			F.HID_CHNG_OWN_FLG.write('1');
			F.EFFECT_FLOW_FLAG.write(''); //This field is for storing status as y when effectivenss form is triggered
			F.EFFECT_CHECK_COMP_DATE.writeValue('', '');
			//F.HID_VERIFICATION.write('');//This field is for storing status as 1,2
		}

		if (hid_step_no == 9) {
			F.HID_CHNG_OWN_FLG.write('2');
			F.EFFECT_FLOW_FLAG.write('');
			F.EFFECT_CHECK_COMP_DATE.writeValue('', '');
			//F.HID_VERIFICATION.write('');
		}
	}

	if (currentStage == 'MGR' && (mgrStored1 == F.MANAGER.read() && F.USER_ACTION.read() == 13)) {
		alert(jsAlertMessages["MGR_CHANGE_DIFF"]);
		F.MANAGER.writeValue('', '');
		//return false;
	}

	if (F.STEP_OWNER.read(hid_step_no) == F.CAR_OWNER.read() && F.USER_ACTION.read() == 7) {
		alert(jsAlertMessages["STEP_OWN_CAR_OWN_SAME"]);
		return false;
	}

	if (F.NEW_STEP_OWNER.read() != '') {
		F.STEP_OWNER.writeValue(F.NEW_STEP_OWNER.read(), F.NEW_STEP_OWNER.readDisplayedValue(), hid_step_no);
	}
	if (currentStage == 'OWN' && previousStage == 'SOW') {
		if (F.NEW_STEP_OWNER.read() != '') {
			F.HIDDEN_ASSIGNEE.write(F.NEW_STEP_OWNER.read());
		} else {
			F.HIDDEN_ASSIGNEE.write(hid_assignee);
		}
	}

	if (F.APPROVE_CAR_INITIATION.read() == 2) {
		stpmarkDelete();
		//alert('deleted');
	}

	/* submission when action items are added */
	if (F.HID_ACTION_HELPER.read() != '' && F.HID_ACTION_HELPER.read() != 'i') {
		F.HID_ACTION_RESPONSE.write('');
		//alert(F.HID_ACTION_RESPONSE.read());
		checkResponse();
	}

	if (hid_step_no > 0) {
		//alert('inside');
		var m = 0;
		var trig_act = 0;
		var act_del_cnt = 0;
		var resp_cnt = 0;
		var stp_cnt = 0;
		var stp_own_cnt = 0;
		var stp_own_cnt_2 = 0;
		for (i = 1; i <= F.ACT.getRowCount(); i++) {
			//ACTION_STEP_HIDDEN -flag used to check if action item triggered or not Y/N(both means triggered),when null not triggered
			if (F.ACTION_OWNER.read(i) == F.DD_CURRENT_USER_NAME.read() && F.ACTION_RESPONSE.read(i) != '' && F.ACTION_STEP_HIDDEN.read(i) == 'N') {
				stp_own_cnt_2 = stp_own_cnt_2 + 1;
			}

			if (F.ACTION_OWNER.read(i) == F.DD_CURRENT_USER_NAME.read() && F.ACTION_RESPONSE.read(i) != '' && F.ACTION_STEP_HIDDEN.read(i) == '') {
				F.ACT.showPage(i);
				//if ACTION_STEP_HIDDEN=='Y' assignment will not trigger->in hook it will change to N
				F.ACTION_STEP_HIDDEN.writeInDataGrid('Y', i);
				//alert(F.ACTION_STEP_HIDDEN.read(i));
				stp_own_cnt = stp_own_cnt + 1;
				//alert('stp_own_cnt'+stp_own_cnt);

			}

			if (F.ACTION_RELATES_TO.read(i) == hid_step_no) {
				stp_cnt = stp_cnt + 1;
			}
			if (F.ACTION_RELATES_TO.read(i) == hid_step_no && F.ACTION_RESPONSE.read(i) != '') {
				resp_cnt = resp_cnt + 1;
			}

			if (F.ACTION_RELATES_TO.read(i) == hid_step_no && F.ACTION_RESPONSE.read(i) == '') {
				m = m + 1;
			}
			if (F.ACT.isMarkedForDeletion(i)) {
				act_del_cnt = act_del_cnt + 1;
			}

			if (F.ACTION_STEP_HIDDEN.read(i) == 'N' || F.ACTION_STEP_HIDDEN.read(i) == 'Y') {
				trig_act = trig_act + 1; //alredy triggerd assignments
			}
		}

		if (F.USER_ACTION.read() == 3 && F.ACTION_STEP_HIDDEN.read(1) == '') {
			F.ACT_NO.write('', 1); //to generate id

		}
		//alert('stp_cnt'+stp_cnt);
		var total_act = stp_cnt - act_del_cnt; //actual count of actions for step
		//alert('total_act'+total_act);
		//alert('stp_own_cnt'+stp_own_cnt);
		//alert('trig_act '+trig_act+' stp_own_cnt '+stp_own_cnt);
		trig_act = trig_act - stp_own_cnt;
		//alert('trig_act '+trig_act+' total_act '+total_act);
		//stp_own_cnt to know how many action items has same step owner and action owner
		if ((trig_act == total_act && F.USER_ACTION.read() == 3) || (total_act == 0 && F.USER_ACTION.read() == 3)) {
			alert(jsAlertMessages["ACT_ITEM_NONE"]);
			//alert('No new action items triggered.');
			return false;
		}
		stp_cnt = stp_cnt - act_del_cnt;
		/* Check action responses */

		if (resp_cnt != stp_cnt && F.USER_ACTION.read() == 1) {

			alert(jsAlertMessages["ACTION_RESPONSE"]);
			return false;
		}
	}

	if (hid_step_no >= 1 && hid_step_no <= 8 && iteration == 0 && currentStage == 'SOW' && F.USER_ACTION.read() == 1) {
		var a = confirm(jsAlertMessages["COPQ_ENTER"]);
		if (a) {
			F.getTab(Tabs.COPQ).show();
			F.getTab('MSAI_41').goToTab(13);

			if (F.CPQ.getRowCount() == 1) {
				if (F.COPQ_CATEGORY.read() == '' && F.COPQ_DESCRIPTION.read() == '' && F.COPQ_CURRENCY.read() == '')
					copqValidation(1);
				else {
					F.CPQ.addRow(true, true);
					var row = F.CPQ.getRowCount();
					copqValidation(row);
				}
			} else {
				F.CPQ.addRow(true, true);
				var row = F.CPQ.getRowCount();
				copqValidation(row);
			}
			iteration++;
			return false;
		} else {
			//return true;
		}

	}
	if (F.APPROVE_CAR_INITIATION.read() == 2 && F.STP.getRowCount() > 0) {
		clearOwnership();
		/*F.STP.allowZeroRows();
		F.STP.deleteAllRows();
		F.STP.makeEmpty();*/
		//alert('Cleared STP Region on Submit');
	}

	//alert('after');

	var map_flag1;

	//F.CAR_ID.callInfolet();
	//debugger;
	/*	setTimeout(function () {
	map_flag1 = F.FLAG.read();

	//map_flag1 = F.FLAG.read();
	alert(F.FLAG.read());
	if (map_flag != map_flag1) {
	alert('Changes have been done through the manage CAPA form please reload the form and submit');
	return false;
	}

	}, 500); */
	var bv = onSubmitValidations();
	if (bv == undefined)
		return true;
	if (bv == true)
		return true;

	//return true;
	//return true;

	/*map_flag1 = F.FLAG.read();
	alert(F.FLAG.read());
	if (map_flag != map_flag1) {
	alert('Changes have been done through the manage CAPA form please reload the form and submit');
	return false;
	}*/
});

if (currentStage == 'MGR' && previousStage == 'OWN') {
	//F.MANAGER.disable();
	ownerStoredName = F.CAR_OWNER.read();
	p_priority = F.PRIORITY.read();
	ownerDisplayValue = F.CAR_OWNER.readDisplayedValue();
	F.RESP_DEPT.enable();
	F.PRIORITY.enable();
	F.CAR_OWNER.enable();
	F.USER_ACTION.enable();
	F.USER_ACTION.addToDropDown(14, jsAlertMessages["ACCEPT"]);
	if (F.APPROVE_CAR_INITIATION.read() == 1) {
		STPmakeRequire();
	}
	if (F.APPROVE_CAR_INITIATION.read() == 2) {
		STPmakeNotRequire();
	}
}

if (currentStage == 'MGR' && previousStage == 'INT') {
	F.USER_ACTION.removeFromDropDown(14);
	if (F.APPROVE_CAR_INITIATION.read() == 1) {
		F.USER_ACTION.removeFromDropDown(2);
	}
	if (F.APPROVE_CAR_INITIATION.read() == 1) {
		F.USER_ACTION.removeFromDropDown(1);
	}

	if (F.STP.getRowCount() == 1) {
		F.APPROVE_CAR_INITIATION.writeValue('', '');
	}
}

//This is to handle RTF fields
F.PROBLEM_DESC.checkClob(function (row) {
	return false;
});

F.PRIMARY_EVAL_PERFMD_DESC.checkClob(function (row) {
	return false;
});

F.SUMMARY_OF_CNTNMNT_ACTION.checkClob(function (row) {
	return false;
});

F.CNT_ACTION_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.PROCESS_CONTAINED.checkClob(function (row) {
	return false;
});

F.RCA_SUMMARY.checkClob(function (row) {
	return false;
});

F.CRA_PLAN_IMPL_SUMMARY.checkClob(function (row) {
	return false;
});

F.SUMMARY_OF_REC_PREV_PLAN.checkClob(function (row) {
	return false;
});

F.TASK_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.CONGRATULATORY_NOTE.checkClob(function (row) {
	return false;
});

F.ACTION_DESC.checkClob(function (row) {
	return false;
});

F.ACTION_RESPONSE.checkClob(function (row) {
	return false;
});

F.COPQ_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.HID_ACTION_RESPONSE.checkClob(function (row) {
	return false;
});

F.HID_ACT_OWNER_CHANGE.checkClob(function (row) {
	return false;
});
//This block of code is for creating the download links in the root cause analysis
F.getAccordion('MSAI_198').collapse();
count = 0;
F.getAccordion('MSAI_198').onExpand(function () {
	if (count == 0 && currentStage == 'SOW' && hid_step_no == 4) {
		addTable();
		$('#MSAI_1595').show();
		count++;
	} else {
		if (count == 0)
			$('#MSAI_1595').hide();
	}

	return true;
});

//This function is for creating the links in Root Cause analysis tab
function addTable() {

	var values = F.HYPERLINK.read();
	var val = values.split(',');
	var tableData = '';
	var linktext;
	linktext = "$!{WEBROOT}";
	for (var i = 0; i < val.length; i++) {
		var v = val[i].split('='); //target="_blank"
		var files1 = v[1].substring(v[1].lastIndexOf("/") + 1);
		tableData += '<a href =' + v[1] + '  download=' + files1 + ' class="capa_link" id=' + i + '>' + v[0].fontsize(0.8) + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}
	$('#MSAI_1595').html($('#MSAI_1595').html().replace('link', ''));
	$('#MSAI_1595').append('<table>' + ' ' + tableData + '</table>');

}

//Please wirte all these showFirstPage of all the tabs on the respective step conditions and not all at one shot in on page load, rather do this on tab click event
/*F.STP.showFirstPage();
F.STP.showFirstPage();
F.RCA.showFirstPage();
F.CRA.showFirstPage();
F.PRA.showFirstPage();
F.TSK.showFirstPage();
F.CPQ.showFirstPage();
 */

/* Appstudio Grid Delete Row */
PushFormGroupObject.prototype.deleteRowInDataGridCustom = function (row) {
	if (this.currentView == 'dataGrid') {
		var col = this.gridDataCollection.fullCollection || this.gridDataCollection;
		//var row = this.getRowCount();
		var model = col.where({
				'row' : row
			});
		if (model)
			col.remove(model);
	}
};

//This Function is for making Fields Required for region
function makeFieldRequired(fieldName, rowNum, required) {
	if (required == 'N') {
		disable_mandatory_check(getSeq(F[fieldName].getSequence(), rowNum));
		F[fieldName].makeLabelNotRequired(rowNum);
	} else {
		enable_mandatory_check(getSeq(F[fieldName].getSequence(), rowNum));
		F[fieldName].makeLabelRequired(rowNum);
	}
}

//For defaulting in STP region
function defaultvalidations() {

	var a = F.HID_STP_DEFAULTING.read();
	//alert('a'+a);
	var c = a.split(";");
	for (var i = 0; i < c.length; i++) {
		for (var j = 0; j < F.STP.getRowCount(); j++) {
			var b = c[i].split(",");
			F.STP.showPage(j + 1);
			var d = F.STEP_DESC.read(j + 1);
			if (b[0] == 'Y') {
				if (b[3] == d) {
					//if(b[1] == 'SOW'+d && b[2] == 'CO'){
					if (b[2] == 'CO') {
						F.STEP_OWNER.writeValue(F.CAR_OWNER.readStoredValue(), F.CAR_OWNER.readDisplayedValue(), j + 1);
					} //else if(b[1] == 'SOW'+d && b[2] == 'CM'){
					else if (b[2] == 'CM') {
						F.STEP_OWNER.writeValue(F.MANAGER.readStoredValue(), F.MANAGER.readDisplayedValue(), j + 1);
					}
				}
			}

			if (b[4] == 'Y') {
				if (b[7] == d) {
					//F.STP.showPage(j+1);
					if (b[6] == 'CM') {
						if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')
							F.STEP_L2_APPROVER.writeValue(F.MANAGER.readStoredValue(), F.MANAGER.readDisplayedValue(), j + 1);
					} else if (b[6] == 'CO') {
						if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')
							F.STEP_L2_APPROVER.writeValue(F.CAR_OWNER.readStoredValue(), F.CAR_OWNER.readDisplayedValue(), j + 1);
					}
				}
			}

			if (b[8] == 'Y') {
				if (b[11] == d) {
					if (b[10] == 'CM') {
						if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')
							F.STEP_L1_APPROVER.writeValue(F.MANAGER.readStoredValue(), F.MANAGER.readDisplayedValue(), j + 1);
					} else if (b[10] == 'CO') {
						if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')
							F.STEP_L1_APPROVER.writeValue(F.CAR_OWNER.readStoredValue(), F.CAR_OWNER.readDisplayedValue(), j + 1);
					}
				}
			}
		}
	}
}
//optimisation for mgr


//alert('mgr actions commented 2471');
/*if (currentStage == 'MGR' && previousStage == 'INT') {
if (F.APPROVE_CAR_INITIATION.read() == 1) {
F.USER_ACTION.enable();
F.USER_ACTION.addToDropDown(1, jsAlertMessages["ACCEPT"]);
F.USER_ACTION.removeFromDropDown(13);
F.USER_ACTION.removeFromDropDown(17);
F.USER_ACTION.removeFromDropDown(14);
//getOwnerShipDetails();
alert('getOwnerShipDetails commented' + 3288);
OwnershipDetailsValidation();
} else if (F.APPROVE_CAR_INITIATION.read() == 2) //no{
F.USER_ACTION.enable();
F.USER_ACTION.removeFromDropDown(14);
F.USER_ACTION.addToDropDown(2, jsAlertMessages["CANCEL"]);
F.USER_ACTION.addToDropDown(17, jsAlertMessages["SEEK_ADD_INFO"]);
F.USER_ACTION.addToDropDown(13, jsAlertMessages["TRANSFER_OWN"]);

}

}*/
