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
var map_flag;
editFlag = F.getFormParameter('edit_flag');
old_own = '';
stpObject = {
	1 : "Identify Team",
	2 : "Define Problem",
	3 : "Containment Action",
	4 : "Root Cause Analysis",
	5 : "Corrective Action",
	6 : "Verification",
	7 : "Prevent Recurrence",
	8 : "Congratulate Team"
};
cnt1 = 0;
cnt2 = 0;
cnt = 0;
mgr_flag = false;
pr_count = 0;
dept_count = 0;
//For Hiding the Tabs
/*F.getTab(Tabs.OWN_DETLS).hide(); //ownershp Details Tab
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
//This function is for setting the rows per Page in multirow
PushFormGroupObject.prototype.setRowsPerPage = function (pageSize) {

	getRef("mrrpid" + this.id).value = pageSize;

};

//for L1 and L2 approvers


//****change of Organisation  and change of priority in Manager stage******/
if ((F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') || (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) {
	p1 = F.PRIORITY.read();
	r1 = F.RESP_DEPT.read();
	d1 = F.RESP_DEPT.readDisplayedValue();
	mgrStored1 = F.MANAGER.read();
	mgrDisp1 = F.MANAGER.readDisplayedValue();
}

function duedatehide() {
	if (F.RESP_DEPT.read() != '' && F.PRIORITY.read() != '')
		F.DUE_DATE.show();
	else
		F.DUE_DATE.hide();
}
function sourceidValidation() {
	if ((F.SOURCE_SYSTEM_ID.read() == '' || F.SOURCE_SYSTEM_ID.read() == 'ADH') && (F.CREATION_TYPE.read() == 2)) {
		F.SOURCE_SYSTEM_OBJECT_ID.hide();
	}
	//alert('if');}
	else {
		F.SOURCE_SYSTEM_OBJECT_ID.show();
		//alert('else');}
	}
}

//L1_approver is selected then L2_approver is enabled this function is called onclick of Ownership details tab
function stpL2ApproverValidation() {
	F.STEP_L2_APPROVER.disableAll();
	for (var i = 1; i <= F.STP.getRowCount(); i++) {
		if (F.STEP_L1_APPROVER.read(i) != '') {
			F.STEP_L2_APPROVER.enable(i);
			//alert('enable' + i);
		}
	}
}
//on click of the Ownershipdetails Tab
F.getTab('MSAI_41').onClick(function (tabNumber) {
	//alert('tabNum'+tabNumber);
	if (tabNumber == 2) {

		//F.STP.setRowsPerPage(10); //for setting 10 rows in the STP region
		/*F.STP.showFirstPage();
		if (F.HID_STEP.read() == 0) {
		stpL2ApproverValidation();
		}*/

	}
	/*else if (tabNumber == 12) {
	/*for (var row = 1; row <= F.ACT.getRowCount(); row++)
	enableActionItems(row);*/
	//alert(row);
	//}
	return true;
});

/*F.getTab("MSAI_41").afterTabDisplay(function(tabNumber){
alert(tabNumber);
});*/
//Onload validations
F.onLoad(function () {
	if (F.ACTION_STEP_HIDDEN.read() == '') {
		F.ACT.setDataGridConfig = {
			"ACTION_ITEM_TITLE" : {
				"text" : {
					"displayValue" : "Act1"
				}
			}
		};
		F.ACT.dataGrid.body.refresh();
	}

	docType();
	F.STEP_DESC.disableAll();
	F.CAR_STATUS.disable();

	$('#msai_multirow_datagrid_' + F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.PTM.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
	$('#msai_multirow_datagrid_' + F.CPQ.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');

	//F.CAR_NO_INTERNAL.callInfolet();
	//alert('infolet');
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('th:eq(0)').find('input').attr('disabled', true);
	//$('#msai_multirow_datagrid_' + F.ACT.getID()).find('thead').find('th:eq(0)').hide();
	F.NEW_STEP_OWNER.hide();
	if (F.HID_STEP.read() == 6) {
		if (F.EFFECT_FLOW_FLAG.read() == 'Y')
			F.USER_ACTION.removeFromDropDown(9);
	}

	if (formStatus != 1)
		F.USER_COMMENT.write('');
	//F.STP.setRowsPerPage(10); //for setting 10 rows in the STP region
	F.STP.showFirstPage();
	var f1 = F.getFormParameter("submit_back");
	//alert('hello' + f1);
	if (f1 == 'no') {
		//F.activateToolBar();
		//F.toolBar.show();
		//alert('hello');
		hideTabs();
	}
	if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '')
		if (F.CREATION_TYPE.read() == '2') {
			//F.SOURCE_SYSTEM_OBJECT_ID.hide();
		}
	if (F.PRIMARY_EVAL_PERFORMED.read() == 1) {
		F.PRIMARY_EVAL_PERFMD_DESC.makeRequired();
	}
	if (F.FINAL_APPROVAL_DATE.read() == '') {
		F.FINAL_APPROVAL_DATE.hide();
	} else {
		F.FINAL_APPROVAL_DATE.show();
	}

	map_flag = F.FLAG.read();

	var effDate = F.EFFECT_CHECK_COMP_DATE.read();
	if (effDate == '') {
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link
	} else {
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'visible'; //effectiveness check link
	}

	F.USER_ACTION.makeRequired();
	if (F.HID_ACTION_HELPER.read() != '') {

		checkResponse();
	}
	//Action grid grouping
	if (F.HID_STEP.read() >= 1)
		gridHandler('ACTION_RELATES_TO', 'ACTION_RELATES_TO', 'ACT');
	if (formStatus == 5 || formStatus == 1) {
		hideTabs();
		//(F.DD_CURRENT_STAGE.read() == ''||F.DD_CURRENT_STAGE.read() == 'INT')
		//F.CAR_STATUS.writeValue(10, jsAlertMessages["INT_STATUS"]);
	}
	if (formStatus == 0)
		F.USER_COMMENT.write("");
	if (formStatus == 5 || formStatus == 0 || formStatus == 1) {
		//hideTabs();
		if (F.DD_CURRENT_STAGE.read() != 'INT' && F.HID_PREVIOUS_STAGE.read() != 'MGR')
			if (F.DD_CURRENT_STAGE.read() == '' || F.DD_CURRENT_STAGE.read() == 'INT')
				//F.SOURCE_SYSTEM_ID.addToDropDown('ADH', 'Adhoc'); //Source adhoc
				//Action Refresh icon
				//document.getElementById('MSAI_1150').innerHTML = '<a id=MSAI_1150 class=msai_flexi_button tabindex="0" title = "Refresh" onclick="javascript:checkResponse()" aside_onclick="javascript:checkResponse()"><img src="/ext/resources/images/default/msi/appstudio/refresh_action.gif" width=18 height=18 align = right>';
				//creationTypeValidation(); //This function for validation based on creation Type dropdown
				//step2 region validation onload
				if (F.HID_STEP.read() == 2 && F.DD_CURRENT_STAGE.read() == 'SOW') {
					//if (F.ANSWER.read() != '')
					qstValidations();
				}
		//step3 region validation onload
		if (F.HID_STEP.read() == 3 && F.DD_CURRENT_STAGE.read() == 'SOW') {
			if (F.CNT_ACTION_DESCRIPTION.read() != '' || F.CNT.getRowCount() > 1)
				cntValidation();
		}
		//step1 region validation onload
		if (F.HID_STEP.read() == 1 && F.DD_CURRENT_STAGE.read() == 'SOW') {
			//F.USER_ACTION.addToDropDown(14,'Accept');
			//alert('submit');
			if (F.PTM_NAME.read() != '' || F.PTM.getRowCount() > 1) {
				ptmValidation();
			}
		}
		//step4 region validation onload
		if (F.HID_STEP.read() == 4 && F.DD_CURRENT_STAGE.read() == 'SOW') {
			if (F.RCA.getRowCount() > 1 || (F.RCA_TYPE.read() != '' || F.RCA_DESCRIPTION.read() != ''))
				RCA_Validation();
		}

		//step5 region validation onload
		if (F.HID_STEP.read() == 5 && F.DD_CURRENT_STAGE.read() == 'SOW') {
			if (F.CRA.getRowCount() > 1)
				craValidation();
		} //step7 region validation onload
		if (F.HID_STEP.read() == 7) {
			if (F.PRA_ACTION.read() != '' || F.PRA.getRowCount() > 1) {
				praValidation();
			}
		} //step9 region validation onload
		if (F.HID_STEP.read() == 9) {
			tskValidation();
		} //step0 region validation onload
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			if (F.STP.getRowCount() == 1)
				hideownership();
		} //This function is for Ownership details validation
		requestedForValidation() //This function is for CAR Requested for dropdown based validations
		originBasedValidaion(); //This function is for Origin dropdown based Validations
		primaryEvaluationValidation(); //This function is for primary evaluation performed dropdown based Validations

		/*Toolbar creation */
		if (F.getFormParameter('link_rpt_ro') == 'yes') {
			//alert('in dup toolbar');
			jQuery('#MSAI_1484').show();
			//document.getElementById('MSAI_1484').cells[0].innerHTML = '<a id=msai_cancel class=msai_hyperlink tabindex=0 title = "Cancel" href="javascript:top.window.close()"><img src="/ext/resources/images/default/msi/appstudio/cancel_new.gif" width=16 height=16 align =right></img></a>';

		} else if (F.getFormParameter('link_rpt_ro') != 'yes') {
			//alert('hey');
			F.activateToolBar().show();
			toolBarConfiguration(); //for adding tool bar
			//jQuery('#MSAI_1484').hide();
		}

	}
	//alert(F.CAR_NO_INTERNAL.read());
	if (formStatus != 1) {
		F.CAR_NO_INTERNAL.callInfolet();
	}
	//alert(F.CAR_NO_INTERNAL.read());
	//F.HID_STEP.write('2');
	//debugger;
	if (F.CAR_NO_INTERNAL.read() == '') {
		F.CAR_NO_INTERNAL.write('1');
	}

	F.CAR_CREATED_ON.disable();
	//F.USER_ACTION.addToDropDown(207,"Action Trigger");
	F.USER_ACTION.enable();

	//alert('dd_process_code=' + F.DD_PROCESS_CODE.read());
	F.HIDDEN_PID.write(F.getPID());
	if (F.CAR_ID.read() == '') {
		F.CAR_ID.write('0');
	}

	if (F.CAR_CREATED_BY.read() == '') {
		F.CAR_CREATED_BY.write(F.DD_CURRENT_USER_NAME.read()).disable();
	}
	//F.STEP_ID.write('1', 1);
	//these steps are hardcoded for running flow I will remove after
	if (F.STEP_ID.read(1) == '' && F.DD_CURRENT_STAGE.read() == 'MGR') {
		for (var i = 1; i <= F.STP.getRowCount(); i++)
			if (F.STEP_ID.read(i) == '')
				F.STEP_ID.write('1', i);
	}
	if (F.PTM_NO.read() == '')
		F.PTM_NO.writeValue(1, 1, 1);
	//F.PTM_NO.write('1', 1);


	if (F.ACTION_ITEM_NO.read() == '')
		F.ACTION_ITEM_NO.writeValue('1', 1, 1);
	if (F.CNT_NO.read() == '')
		F.CNT_NO.writeValue('1', 1);
	if (F.RCA_NO.read() == '')
		F.RCA_NO.write(1, 1);
	if (F.CORR_ACTION_NO.read() == '')
		F.CORR_ACTION_NO.write(1, 1);
	if (F.PREV_ACTION_NO.read() == '')
		F.PREV_ACTION_NO.write(1, 1);
	if (F.TASK_ACTION_NO.read() == '')
		F.TASK_ACTION_NO.write(1, 1);
	if (F.COPQ.read() == '')
		F.COPQ.write(1, 1);
	F.RECIPIENTS.write(1, 1);
	F.PRA_RCA_NO.write(1, 1);
	F.CRA_RCA_NO.write(1, 1);
	F.RELATED_CARS.write(1, 1);
	F.PRODUCT_ID.write(1, 1);
	//F.STEP_SEQ_NO.write('NONE', 1);
	if (F.CNT_ACT_ID.read() == '')
		F.CNT_ACT_ID.write('1', 1);
	if (F.MEMBER_ID.read() == '')
		F.MEMBER_ID.write('1', 1);
	if (F.QUESTION_ID.read() == '')
		F.QUESTION_ID.write('1', 1);
	//debugger;
	if (F.ACT_NO.read() == '')
		F.ACT_NO.write(1, 1);
	if (F.DD_PROCESS_CODE.read() == '') {
		F.DD_PROCESS_CODE.write('MS_CAP_CAR_STEP0_WF');
	}
	//Focusing the Tabs for the corresponding step
	if (F.HID_STEP.read() == 1)
		F.getTab('MSAI_41').goToTab(3); //Identify Team
	if (F.HID_STEP.read() == 2)
		F.getTab('MSAI_41').goToTab(4); //Define Problem
	if (F.HID_STEP.read() == 3)
		F.getTab('MSAI_41').goToTab(5); //Containment action
	if (F.HID_STEP.read() == 4)
		F.getTab('MSAI_41').goToTab(6); //Root Cause
	if (F.HID_STEP.read() == 5)
		F.getTab('MSAI_41').goToTab(7); //Corrective Actions
	if (F.HID_STEP.read() == 6)
		F.getTab('MSAI_41').goToTab(8); //verify Effectiveness
	if (F.HID_STEP.read() == 7)
		F.getTab('MSAI_41').goToTab(9); //prevent recurrence
	if (F.HID_STEP.read() == 8)
		F.getTab('MSAI_41').goToTab(11); //congratulate team
	if (F.HID_STEP.read() == 9) //Final Review
		F.getTab('MSAI_41').goToTab(10);

	//This block is for when step owner request for ownership change and it should be sent to owner
	if (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'SOW') {
		hid_assignee = F.HIDDEN_ASSIGNEE.read();
		F.disableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		//alert('tab focsed');
		F.getTab('MSAI_41').goToTab(2); //Ownership DueDates
	}
	allStepsValidation(); //This Function is for Making Fields required
	//F.STEP_DUE_DATE.disableAll();
	F.CAR_CREATED_BY.disable();
	F.DUE_DATE.disable();
	if (formStatus != 1) {
		F.DD_CURRENT_STAGE.callInfolet();
	}

	/*alert('kannan1'||F.HID_STEP.read());
	alert('kannan2'||F.MANAGER.read());
	alert('kannan3'||F.CAR_OWNER.read());

	if(F.HID_STEP.read()==0){
	if(F.MANAGER.read()==F.CAR_OWNER.read())
	F.HID_MGR_OWN_SAME.write('Y');
	}*/
	/*if(F.HID_STEP.read()=6)
	if (F.NEED_EFFECT_VERIFICATION.read() == 1) {
	F.USER_ACTION.addToDropDown(9,'Verify Effectiveness');
	}*/

	/*For Action tab */
	var getrwcnt = F.ACT.getRowCount();
	if (getrwcnt >= 1 && (F.ACTION_STEP_HIDDEN.read() == 'Y' || F.ACTION_STEP_HIDDEN.read() == 'N')) {
		//alert('rowcount'+getrwcnt);
		for (var i = 1; i <= getrwcnt; i++) {

			actionValidate(i);
			enableActionItems(i);
			//alert('for loop'+getrwcnt);
		}
	}

	//Hiding the links in the CAR Form ,For L1 , L2 and for owner when   Approvers no need to show that links
	if (F.DD_CURRENT_STAGE.read() == 'L1A' || F.DD_CURRENT_STAGE.read() == 'L2A' || (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'SOW')) {
		//|| F.DD_CURRENT_STAGE.read() == 'OWN'
		//alert('hide all buttons');
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden';
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[4].style.visibility = 'hidden'; //root cause analysis add and delete button
			document.getElementsByClassName('toolbarContainer')[5].style.visibility = 'hidden'; //corrective Actions add and delete button
			document.getElementsByClassName('toolbarContainer')[6].style.visibility = 'hidden'; //Prevent recurrence Tab add and delete button
			document.getElementsByClassName('toolbarContainer')[8].style.visibility = 'hidden'; //Create Action items add and delete button
			document.getElementsByClassName('toolbarContainer')[7].style.visibility = 'hidden'; //Final Review Tab Task button add and delete button
		}
		//document.getElementsByClassName('toolbarContainer')[9].style.visibility = 'hidden'; //COPQ add and delete button
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		document.getElementsByClassName('msai_hyperlink')[8].style.visibility = 'hidden'; //verify effectiveness actions link(step6)
		document.getElementsByClassName('msai_hyperlink')[9].style.visibility = 'hidden'; //preventive recurrence actions link(step7)
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link(step6)
		F.disableAll();
		//alert('disabled all');
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
	}
	$("#DUE_DATE_label__div").attr('title', 'Auto derived based on CAR Priority'); //Tool tip text for Due Date
	//when step owner and car owner are same change ownership should be removed from dropdown

	if (F.DD_CURRENT_USER_NAME.read() == F.CAR_OWNER.read()) {
		if (F.HID_STEP != 0)
			F.USER_ACTION.removeFromDropDown(7);
	}

	if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') {
		if (F.APPROVE_CAR_INITIATION.read() == 1) {
			F.USER_ACTION.addToDropDown(1, "Accept");
			F.USER_ACTION.removeFromDropDown(13);
			F.USER_ACTION.removeFromDropDown(17);
			F.USER_ACTION.removeFromDropDown(14);
			getOwnerShipDetails();
			OwnershipDetailsValidation();
		} else if (F.APPROVE_CAR_INITIATION.read() == 2) //no
		{
			F.USER_ACTION.removeFromDropDown(14);
			F.USER_ACTION.addToDropDown(2, "Cancel");
			F.USER_ACTION.addToDropDown(17, "Seek Additional Info");
			F.USER_ACTION.addToDropDown(13, "Transfer Ownership");

		}

	}
	if (F.HID_STEP.read() == 0) {
		stpL2ApproverValidation();
	}

	//for making the comments mandatory based on action drop down
	if (F.USER_ACTION.read() == 2 || F.USER_ACTION.read() == 4 || F.USER_ACTION.read() == 7 || F.USER_ACTION.read() == 6 || F.USER_ACTION.read() == 13 || F.USER_ACTION.read() == 10 || F.USER_ACTION.read() == 17) { //2-cancel,4-Seek additional info,7-change ownership,6-request for change,13transfer of ownership ,17-seek aditional info
		F.USER_COMMENT.makeRequired();
	} else { {
			F.USER_COMMENT.makeNotRequired();
			if ((F.DD_CURRENT_STAGE.read() == 'INT' && F.HID_PREVIOUS_STAGE.read() == 'MGR') || (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN'))
				F.USER_COMMENT.makeRequired();

		}

	}
	if ((F.DD_CURRENT_STAGE.read() == 'INT' && F.HID_PREVIOUS_STAGE.read() == 'MGR') || (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) {

		F.USER_COMMENT.makeRequired();

	}

	//Action drop down validations

	if ((F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')) //|| (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) {
	{
		if (F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == '') {
			removeFromAction();

		}
	}
	if ((F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == 2) && (F.DD_CURRENT_STAGE.read() == 'MGR')) {
		F.USER_ACTION.removeFromDropDown(14);

	}
	if (F.STEP_OWNER.read(F.HID_STEP.read()) == F.CAR_OWNER.read()) {

		F.USER_ACTION.removeFromDropDown(7);

	}
	sourceidValidation();
	if (F.CAR_STATUS.read() == 65 || F.CAR_STATUS.read() == 66) {
		F.disableAll()
	}
	F.STEP_DESC.disableAll();
});



/*F.USER_ACTION.onChange(function () {
var cnt=0;
if ((F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')) //|| (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) {{   if(cnt==0)
if (F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == ''){
removeFromAction();
cnt++;
}
}
if ((F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == 2) && (F.DD_CURRENT_STAGE.read() == 'MGR')){
if(cnt==0)
F.USER_ACTION.removeFromDropDown(14);
cnt++;
}
if (F.STEP_OWNER.read(F.HID_STEP.read()) == F.CAR_OWNER.read()) {
if(cnt==0)
F.USER_ACTION.removeFromDropDown(7);
cnt++;
}

});
 */

if (editFlag == 'Y') {
	F.toolBar.hideControl("submit");
	F.toolBar.hideControl("save");
	F.toolBar.hideControl("saveandclose");
	F.toolBar.showControl("edit");

}
if (editFlag == 'N') {
	F.toolBar.hideControl("submit");
	F.toolBar.hideControl("save");
	F.toolBar.hideControl("saveandclose");
	F.toolBar.hideControl("edit");
	F.toolBar.showControl("cancel");
	F.disableAll();

}

function gettemplatelink() {
	linktext = "$!{WEBROOT}/MS_CAP/MS_CAP_CAR_JS.vm";
	window.open(linktext);
}

//This code is for getting the values to be auto selected based on CAR Owner Value
/*F.STEP_OWNER.writeValue = function(storedValue,displayedValue,row) {
if(!row) row=1;

if(arguments[3] != 'dataGrid')
this.writeInDataGrid(displayedValue,row);

if(editableArr[this.sequence-1] == false) {
writeViewOnlyFieldValue(getSeq(this.sequence,row),storedValue,displayedValue);
} else {
write(getSeq(this.sequence,row),storedValue);
write_lov(getSeq(this.sequence,row),displayedValue);
}

logger.log("[writeValue] Field : " + this.label + " [Row="+row+"] : Value changed to : " + displayedValue);
return this;
}*/


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
		/*else {
		var s = F.STP.getRowCount();
		for (var k = s; k <= str1.length - 1; k++)
		F.STP.addRow(true, true);
		}*/

		if (F.DD_CURRENT_STAGE.read() == 'MGR') {
			setTimeout(function () {
				//debugger;
				if (F.STEP_L1_APPROVER.read() == '')
					F.STEP_L2_APPROVER.disableAll();
				var _stepsDetails = F.HID_OWN_TAB.read().split(";");
				//F.STEP_L2_APPROVER.disableAll();
				//if (F.STEP_OWNER.read() == '')
				for (var i = 1; i <= _stepsDetails.length; i++) {
					//alert('i' + i);
					var _stepDetails1 = _stepsDetails[i - 1].split(",");
					var stpNo = _stepDetails1[0];
					var days = _stepDetails1[4];
					//F.STEP.writeValue(stpNo, stpObject[stpNo], i);
					F.STEP.write(stpNo, i);
					F.STEP.callInfolet(i);
					F.STEP_DESC.disable(i);
					F.HID_RESP_DPT_DUMMY.write(F.RESP_DEPT.read());
					F.HID_STP_DUE_DATE_HELP.write(days, i);
					//alert(F.HID_STP_DUE_DATE_HELP.read(i));
					//F.HID_RESP_DPT_DUMMY.callInfolet();
					//F.STEP.write(stpNo, parseInt(i));
					//for Step8 L1 and L2 Approvers are not Required
					if (F.STEP.read(i) == 8) {
						F.STEP_L1_APPROVER.disable(i);
						F.STEP_L2_APPROVER.disable(i);
					}

					/*if(i==_stepsDetails.length){
					F.DUE_DATE.writeValue(F.STEP_DUE_DATE.read(i),F.STEP_DUE_DATE.read(i));
					//alert('tset'+_stepDetails1[1]);
					}*/
					//MM/dd/yyyy HH:mm:ss
					//F.STEP_DUE_DATE.writeValue(new Date(_stepDetails1[1]),new Date( _stepDetails1[1]), parseInt(i)); //.disable(i);
					//var stp_date=getDates(_stepDetails1[1]);
					//	F.STEP_DUE_DATE.writeValue(stp_date,stp_date,parseInt(i)); //.disable(i);
					F.STEP_SEQ_NO.write(_stepDetails1[2], parseInt(i));
					F.NEXT_WF_CODE.write(_stepDetails1[3], parseInt(i));
					//F.STEP_STATUS.write('NONE',i);
					/*if (i == 6) { //for step 6 CAPA Manager is Default
					//F.STEP_OWNER.writeValue(F.MANAGER.read(), F.MANAGER.readValue(), parseInt(i));
					//F.STEP_OWNER.write(F.MANAGER.readStoredValue(), i);
					} else {
					//F.STEP_OWNER.writeValue(F.CAR_OWNER.readStoredValue(), F.CAR_OWNER.readValue(), parseInt(i));
					//F.STEP_OWNER.write(F.CAR_OWNER.readStoredValue(), i);
					}*/
				}
				F.HID_RESP_DPT_DUMMY.callInfolet();

			}, 10);
		}
		F.STEP_DESC.disableAll();
}

/*/
/ Getting the Due Date based on the CAR Last step date
F.HID_OWN_TAB.onChange(function () {
	var _stepsDetails = F.HID_OWN_TAB.read().split(";");
	var i = _stepsDetails.length;
	var _stepDetails1 = _stepsDetails[i - 1].split(",");
	if (_stepDetails1[1] != F.DUE_DATE.read())
		F.DUE_DATE.write(_stepDetails1[1]).disable();
});
 *  /
/*F.APPROVE_CAR_INITIATION.onChange(function(){
for(var i=1;i<=F.STP.getRowCount();i++){
if(F.STEP.read(i)!=''){
alert(F.STEP.read(i));
F.STEP.callInfolet(i);
}}});*/
/*F.STEP.onChange(function(row){
//for(var i=1;i<=F.STP.getRowCount();i++){
if(F.STEP.read(row)!=''){
alert(F.STEP.read(row));
F.STEP.callInfolet(row);
}});
 */


/* 	F.STEP_OWNER.onChange(function (row) {
alert("after"+F.STEP_OWNER.read(row));
}); */


//Validations of Identify Team when selecting transfer of ownership and trigger  action items
function onSubmitValidations() {

	if (F.USER_ACTION.read() == 7) { //|| F.USER_ACTION.read() == 3
		//alert('onsubmit');
		if (F.HID_STEP.read() == 1) {
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
		} else if (F.HID_STEP.read() == 2) {
			var count = 0;
			for (var i = 1; i <= F.QST.getRowCount(); i++) {
				if (F.QST.isMarkedForDeletion(i) == true)
					count++;

			}
			var k = F.QST.getRowCount() - count;
			if (k >= 1) {
				for (var j = 1; j <= k; j++)
					if (F.ANSWER.read(j) != '') {
						alert(jsAlertMessages["DELETE_ROWS_QST"]);
						return false;
					} else {
						return true;
					}
			}
		} else if (F.HID_STEP.read() == 3) {
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
		} else if (F.HID_STEP.read() == 4) {
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
		} else if (F.HID_STEP.read() == 5) {
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
		} else if (F.HID_STEP.read() == 6) {
			if (F.EFFECT_CHECK_AUTHORITY.read() != '' || F.NEED_EFFECT_VERIFICATION.read() != '' && F.EFFECT_CHECK_DUE_DATE.read()) {
				alert(jsAlertMessages["CLEAR_VERIFY_EFFECTIVENESS"]);
				return false;
			} else {
				return true;
			}
		} else if (F.HID_STEP.read() == 7) {
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


}

F.onSubmit(function () {
	//alert('before');
	/*if (!onSubmitValidations()){
	return false;
	alert('onSubmitValidations F');
	}
	else{
	alert('onSubmitValidations T');
	return true;}*/

	// debugger;

	if (F.STEP_OWNER.read(F.HID_STEP.read()) == F.CAR_OWNER.read() && F.USER_ACTION.read() == 7) {
		alert(jsAlertMessages["STEP_OWN_CAR_OWN_SAME"]);
		return false;
	}

	/*if (F.USER_ACTION.read() == 3) {
	if (F.ACTION_ITEM_TITLE.read() == '') {
	alert(jsAlertMessages["TRIGGER_ACTION_FAIL"]);

	//alert('No Action Items chosen');
	return false;
	} else
	return true;
	}*/

	if (F.NEW_STEP_OWNER.read() != '') {
		F.STEP_OWNER.writeValue(F.NEW_STEP_OWNER.read(), F.NEW_STEP_OWNER.readDisplayedValue(), F.HID_STEP.read());
	}
	if (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'SOW') {
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
	/*if(flag==0 && F.USER_ACTION.read() ==7){//this check is for ownership change
	alert('change Manager');
	return false;
	}
	else{
	return true;
	}
	 */

	/* submission when action items are added */

	var m = 0;
	var act_del_cnt = 0;
	for (i = 1; i <= F.ACT.getRowCount(); i++) {
		if (F.ACTION_RELATES_TO.read(i) == F.HID_STEP.read() && F.ACTION_RESPONSE.read(i) == '') {
			m = m + 1;
		}
		if (F.ACT.isMarkedForDeletion(i)) {
			act_del_cnt = act_del_cnt + 1;
		}
	}

	if (m > 0) {
		m = m - act_del_cnt;
		//alert('m'+m+'act'+act_del_cnt);
		if (m > 0 && F.USER_ACTION.read() == 1 && F.HID_ACTION_HELPER.read().length <= 1) {
			alert(jsAlertMessages["ACTION_ITEM_SUBMIT"]);
			return false;
		}
	}

	/* Check action responses */
	if (F.HID_ACTION_HELPER.read().length > 2 && F.USER_ACTION.read() == 1) {
		alert(jsAlertMessages["ACTION_RESPONSE"]);
		return false;
	}

	//alert('step_id'+F.STEP_ID.read());

	// alert(F.USER_ACTION.read());
	/*if (F.HID_STEP.read()==0) {


	if (F.CAR_CREATED_ON.read() > F.DUE_DATE.read()) {

	alert(jsAlertMessages["DATE_INITIATE"]);
	return false;
	}}
	if (F.DD_CURRENT_STAGE.read() == 'INT') {
	if (getRoundedDate(F.CAR_CREATED_ON.read()) < getRoundedDate(F.getUserDate())) {
	alert(jsAlertMessages["DATE_SYSDATE"]);
	return false;
	}
	}*/

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
	/*setTimeout(function () {
	map_flag1 = F.FLAG.read();

	//map_flag1 = F.FLAG.read();
	alert(F.FLAG.read());
	if (map_flag != map_flag1) {
	alert('Changes have been done through the manage CAPA form please reload the form and submit');
	return false;
	}

	}, 500);*/

	if (onSubmitValidations() == undefined)
		return true;
	if (onSubmitValidations() == true)
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
//this function is for clearing the STP region details
function clearOwnership() {

	F.CAR_OWNER.writeValue('', '');

	for (var i = 1; i <= F.STP.getRowCount(); i++) {
		F.STEP.writeValue('', '', i);
		F.STEP_OWNER.writeValue('', '', i);
		F.STEP_L1_APPROVER.writeValue('', '', i);
		F.STEP_L2_APPROVER.writeValue('', '', i);
		F.STEP_SEQ_NO.write('', i);
		F.STEP_STATUS.write('', i);
		F.STEP_DUE_DATE.write(new Date(), i);
		F.NEXT_WF_CODE.write('', i);
	}
}
function stpmarkDelete() {
	for (var i = 1; i <= F.STP.getRowCount(); i++) {
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



function hideTabs() {
	/*/
	/ hiding all tabs
									F.getTab(Tabs.OWN_DETLS).hide(); / / ownershp Details Tab
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
	if (tabsInfo != '' && F.DD_CURRENT_STAGE.read() != 'INT') //except for step0 Initiator stage
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
					if (F.ACT.getRowCount() >= 1 && (F.ACTION_ITEM_TITLE.read() != '' && F.ACTION_RELATES_TO.read() != '' && F.ACTION_OWNER.read() != ''))
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
				//alert('currentstage' + F.DD_CURRENT_STAGE.read());
				//alert('previous' + F.HID_PREVIOUS_STAGE.read());
				//alert('step' + F.HID_STEP.read());}

			}

		}
		if (F.HID_STEP.read() == 9 || F.HID_STEP.read() == 8) {
			F.getTab(Tabs.FINAL).show();
		}
		if (F.HID_STEP.read() == 8) {
			//alert('cong team')
			F.getTab(Tabs.CONG_TEAM).show();
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

if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN') {
	//F.MANAGER.disable();
	F.RESP_DEPT.enable();
	F.PRIORITY.enable();
	F.CAR_OWNER.enable();
	F.USER_ACTION.addToDropDown(14, "Accept");
	if (F.APPROVE_CAR_INITIATION.read() == 1) {
		STPmakeRequire();
	}
	if (F.APPROVE_CAR_INITIATION.read() == 2) {
		STPmakeNotRequire();
	}
}

/*if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') {
if (F.APPROVE_CAR_INITIATION.read() == 1) {
F.USER_ACTION.addToDropDown(1, "Accept");
F.USER_ACTION.removeFromDropDown(13);
F.USER_ACTION.removeFromDropDown(4);
F.USER_ACTION.removeFromDropDown(14);
getOwnerShipDetails();
OwnershipDetailsValidation();
} else if (F.APPROVE_CAR_INITIATION.read() == 2) //no{
F.USER_ACTION.removeFromDropDown(14);
F.USER_ACTION.addToDropDown(2, "Cancel");
F.USER_ACTION.addToDropDown(4, "Reject");
F.USER_ACTION.addToDropDown(13, "Transfer Ownership");

}

}*/

function makeRequiredAndDisableFields() { //common Function for MGR and OWN stage to make require and disable Fiels
	F.DETAILS_ATTACHMENTS.disable();
	F.DUE_DATE.makeRequired();
	F.CAR_CREATED_BY.disable()
	F.CREATOR_DEPT.makeRequired();
	F.CAR_CREATED_BY.makeRequired();
	F.CAR_ID.makeRequired();
	F.CAR_CREATED_ON.disable();
	F.MANAGER.makeRequired();
	F.ORIGIN.makeRequired();
	F.PRIORITY.makeRequired();
	F.CAR_STATUS.makeRequired();
	F.CREATION_TYPE.makeRequired();
	F.CAR_CREATED_ON.makeRequired();
	F.RESP_DEPT.makeRequired();
	F.PRODUCT_ID.disable();
	F.SOURCE_SYSTEM_ID.disable();
	F.CAR_ID.disable();
	F.ORIGIN.disable();
	F.CREATOR_DEPT.disable();
	F.REQUESTED_FOR.disable();
	F.CAR_STATUS.disable();
	F.CREATION_TYPE.disable();
	F.CUSTOMER_NAME.disable();
	F.PRIMARY_EVAL_PERFMD_DESC.disable();
	F.ISSUE_LOCATION.disable();
	F.PRIMARY_EVAL_PERFORMED.disable();
	F.PROBLEM_DESC.disable();
	F.THRDPRTY_ORG_NME.disable()
	F.THIRDPARTY_LOC.disable();
	F.SRC_PROCESS_NAME.disable();
	F.CUSTOMER_LOCATION.disable();
	F.SOURCE_SYSTEM_OBJECT_ID.disable();
	F.INTERNAL_DEPARTMENT_NAME.disable();
	F.INTERNAL_DEPARTMENT_LOCATION.disable();
	F.INTERNAL_DEPARTMENT_CONTACT.disable();

}

if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') {
	F.USER_ACTION.removeFromDropDown(14);
	if (F.STP.getRowCount() > 1) {
		//F.APPROVE_CAR_INITIATION.writeValue('', '');
	}
}
/*F.CAR_STATUS.writeValue = function (storedValue, displayedValue, row) {
if (!row)
row = 1;
if (editableArr[this.sequence - 1] == false) {
writeViewOnlyFieldValue(getSeq(this.sequence, row), storedValue, displayedValue);
} else {
write(getSeq(this.sequence, row), storedValue);
write_lov(getSeq(this.sequence, row), displayedValue);
}
if (arguments[3] != 'dataGrid')
this.writeInDataGrid(displayedValue, row);
logger.log("[writeValue] Field : " + this.label + " [Row=" + row + "] : Value changed to : " + displayedValue);
return this;
};
 */

//this.writeViewOnlyFieldValue(getSeq(this.sequence, row), storedValue, displayedValue);
//This Function is for Making fields Required and disable  Based on Step and Stage
function allStepsValidation() {
	F.STEP_DESC.disableAll();
	if (F.HID_STEP.read() == 0) {

		//F.STEP_DUE_DATE.disableAll();
		if ((F.DD_CURRENT_STAGE.read() == '' && F.HID_PREVIOUS_STAGE.read() == '') || (F.DD_CURRENT_STAGE.read() == 'INT' && F.HID_PREVIOUS_STAGE.read() == 'MGR')) //for Step0 and initiator Stage
		{

			//alert('Iam in initiator Stage');
			if (F.getFormParameter('link_rpt_ro') != 'Yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_INITIATE"]); //setting the title based on step and stage
			}
			if (F.CAR_STATUS.read() == '') {
				//F.CAR_STATUS.writeValue(10, jsAlertMessages["INT_STATUS"]);
			}
			if (F.DUE_DATE.read() == '') {
				F.DUE_DATE.hide();
			} else {
				F.DUE_DATE.show();
			}
			F.CREATION_TYPE.write(2); //defaulted to adhoc
			F.CREATION_TYPE.disable();
			F.CAR_CREATED_BY.makeRequired();
			F.CREATOR_DEPT.makeRequired();
			F.ORIGIN.makeRequired();
			F.CAR_STATUS.makeRequired();
			F.CREATION_TYPE.makeRequired();
			F.CAR_CREATED_ON.write(F.getUserDate());
			F.PRIORITY.makeRequired();
			F.RESP_DEPT.makeRequired();
			F.MANAGER.makeRequired();
			F.PROBLEM_DESC.makeRequired();
			F.SOURCE_SYSTEM_ID.makeRequired();

		} else if ((F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') || (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) //for  step0  manager Stage

		{
			F.getTab('MSAI_41').goToTab(2);
			//Ownership DueDates
			/*p1 = F.PRIORITY.read();
			r1 = F.RESP_DEPT.read();
			d1 = F.RESP_DEPT.readDisplayedValue();*/
			F.FINAL_APPROVER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue());
			F.FINAL_APPROVER_ORG.writeValue(F.RESP_DEPT.read(), F.RESP_DEPT.readDisplayedValue());
			//alert('Iam in MGR Stage');
			if (F.getFormParameter('link_rpt_ro') != 'Yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_REVIEW"]);
			}
			F.STP.showFirstPage();
			F.STP.showPage(1);
			F.APPROVE_CAR_INITIATION.makeRequired();

			makeRequiredAndDisableFields(); //
			if (F.APPROVE_CAR_INITIATION.read() == '' || F.APPROVE_CAR_INITIATION.read() == 2) {
				hideownership(); //for hiding the STP region by default
				STPmakeRequire();
			}

		} else if (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'MGR') //For Step0 Owner Stage
		{
			F.getTab('MSAI_41').goToTab(2); //Ownership DueDates
			STPmakeRequire();
			//F.STEP_DUE_DATE.disableAll();
			F.CAR_OWNER.disable();
			//alert('Iam in Owner Stage');
			if (F.getFormParameter('link_rpt_ro') != 'Yes') {

				toolBarConfiguration(); //for adding tool bar
				jQuery('#MSAI_1484').hide();
				F.toolBar.updateTitle(jsAlertMessages["TITLE_REVIEW"]);
			}
			F.STP.showFirstPage();
			F.STP.showPage(1);
			F.RESP_DEPT.disable();
			F.STEP_L2_APPROVER.disableAll();

			F.MANAGER.disable();
			F.PRIORITY.disable();
			F.DUE_DATE.disable();
			makeRequiredAndDisableFields();
			//hideownership();
			F.APPROVE_CAR_INITIATION.disable();
			for (var i = 1; i < F.STP.getRowCount(); i++) {
				if (F.STEP_L1_APPROVER.read(i) != '') {
					F.STEP_L2_APPROVER.enable(i);
				}
			}

		}
	} else if (F.HID_STEP.read() == 1 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step1 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}

		F.PTM.showFirstPage();
		F.PTM.showPage(1);
		F.disableAll();
		F.RELATED_CARS.enable();
		F.REPEAT_CAR.enable();
		F.PTM_NO.enableAll();
		F.PTM_NAME.enableAll(); //L1 and L2 approvers ,stepowner
		F.PTM_ROLE.enableAll();
		F.STEP1_L1_APPROVED_ON.enable();
		/*F.STEP_DUE_DATE.disableAll();
		F.STEP_OWNER.disableAll();
		F.STEP_L1_APPROVER.disableAll();
		F.STEP_L2_APPROVER.disableAll();*/
		//F.STEP1_L1_APPROVED_BY.enable();
		F.STEP1_L2_APPROVED_ON.enable();
		//F.STEP1_L2_APPROVED_BY.enable();
		F.STEP1_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		/*if (F.STEP_L1_APPROVER.read(1)!='') {

		F.STEP1_L1_APPROVED_ON.makeRequired();
		F.STEP1_L1_APPROVED_BY.makeRequired();
		} else {
		F.STEP1_L1_APPROVED_ON.makeNotRequired();
		F.STEP1_L1_APPROVED_BY.makeNotRequired();
		}
		if (F.STEP_L2_APPROVER.read(1)!='') {
		F.STEP1_L2_APPROVED_ON.makeRequired();
		F.STEP1_L2_APPROVED_BY.makeRequired();
		} else {
		F.STEP1_L2_APPROVED_ON.makeNotRequired();
		F.STEP1_L2_APPROVED_BY.makeNotRequired();
		}*/
		copqValidation();

	} else if (F.HID_STEP.read() == 2 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step2 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		//$("#msai_data_grid_container_100053").find('div:eq(0)').hide(); //for hiding  add and delete buttons of Identify Team
		//$('.toolbarContainer:eq(0)').hide();//for hiding  add and delete buttons of Identify Team
		var questions = F.HID_QUESTIONS.read();
		var question = questions.split(',');
		for (var i = 0; i < question.length; i++) {
			if (i > 0 && F.QST.getRowCount() < 3)
				F.QST.addRow(true, true);
			F.QST_NO.writeValue(i + 1, i + 1, i + 1);
			//F.QST_NO.write(i + 1, i + 1);
			F.QUESTION.write(question[i], i + 1);
		}

		F.QST.showFirstPage();
		F.QST.showPage(1);
		F.disableAll();
		//F.QUESTION.enableAll();
		F.ANSWER.enableAll();
		// enableStepOwner()
		F.STEP2_L1_APPROVED_ON.enable();
		//F.STEP2_L1_APPROVED_BY.enable();
		F.STEP2_L2_APPROVED_ON.enable();
		//F.STEP2_L2_APPROVED_BY.enable();
		F.STEP2_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		/* if (F.STEP_L1_APPROVER.read(2) !='') {

		F.STEP2_L1_APPROVED_ON.makeRequired();
		F.STEP2_L1_APPROVED_BY.makeRequired();
		} else {
		F.STEP2_L1_APPROVED_ON.makeNotRequired();
		F.STEP2_L1_APPROVED_BY.makeNotRequired();
		}
		if (F.STEP_L2_APPROVER.read(2) !='') {
		F.STEP2_L2_APPROVED_ON.makeRequired();
		F.STEP2_L2_APPROVED_BY.makeRequired();
		} else {
		F.STEP2_L2_APPROVED_ON.makeNotRequired();
		F.STEP2_L2_APPROVED_BY.makeNotRequired();
		}*/
		copqValidation();
	} else if (F.HID_STEP.read() == 3 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step3 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}

		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		//$('.toolbarContainer:eq(0)').hide();//for hiding  add and delete buttons of Identify Team
		//$('.toolbarContainer:eq(1)').hide();//for  hiding  add and delete buttons of define problem
		//$('.msai_hyperlink:eq(0)').hide();//define problem initiate action Items link
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM
		}
		F.disableAll();
		F.CNT.showFirstPage();
		F.CNT.showPage(1);
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
		/*if (F.STEP_L1_APPROVER.read(3)!='') {

		F.STEP3_L1_APPROVED_ON.makeRequired();
		F.STEP3_L1_APPROVED_BY.makeRequired();
		} else {
		F.STEP3_L1_APPROVED_ON.makeNotRequired();
		F.STEP3_L1_APPROVED_BY.makeNotRequired();
		}
		if (F.STEP_L2_APPROVER.read(3)!='') {
		F.STEP3_L2_APPROVED_ON.makeRequired();
		F.STEP3_L2_APPROVED_BY.makeRequired();
		} else {
		F.STEP3_L2_APPROVED_ON.makeNotRequired();
		F.STEP3_L2_APPROVED_BY.makeNotRequired();
		}*/
		copqValidation();

	} else if (F.HID_STEP.read() == 4 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step4 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		F.disableAll();
		F.RCA_NO.writeValue(1, 1);
		F.RCA_SUMMARY.enableAll();
		F.SEVERITY_OF_IMPACT.enableAll();
		F.LH_OF_OCCURRENCE.enableAll();
		F.LH_OF_DETECTION.enableAll();
		F.RPN.enableAll();
		F.RCA_TYPE.enableAll();
		F.RCA_DESCRIPTION.enableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		RCA_makerequired();
		F.STEP4_GEN_ATTACHMENTS.enable();
	} else if (F.HID_STEP.read() == 4 && F.DD_CURRENT_STAGE.read() !== 'SOW') {
		//alert('hi');
		//$('.toolbarContainer:eq(3)').hide();

	} else if (F.HID_STEP.read() == 5 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step5 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);

			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //root cause analysis add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		F.disableAll();
		F.CRA.showFirstPage();
		F.CRA.showPage(1);
		F.CRA_NO.enableAll();
		F.CRA_ACTION.enableAll();
		F.CRA_RCA_NO.enableAll();
		F.CRA_PLAN_IMPL_SUMMARY.enable();
		F.STEP5_GEN_ATTACHMENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.CRA_PLAN_IMPL_SUMMARY.makeRequired();

		//if(F.DD_CURRENT_STAGE!='SOW')
		//$('.toolbarContainer:eq(4)').hide();
		//else
		//$('.toolbarContainer:eq(4)').show();
	}
	//else {
	//F.CRA_PLAN_IMPL_SUMMARY.makeNotRequired();
	//}
	else if (F.HID_STEP.read() == 6 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step6 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);

			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //root cause analysis add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		F.disableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.NEED_EFFECT_VERIFICATION.enable();
		F.NEED_EFFECT_VERIFICATION.makeRequired();
		F.EFFECT_CHECK_AUTHORITY.enable();
		F.EFFECT_CHECK_DUE_DATE.enable();
		F.STEP6_GEN_ATTACHMENTS.enable();

	} else if (F.HID_STEP.read() == 7 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step1 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);

			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //root cause analysis add and delete button
			document.getElementsByClassName('toolbarContainer')[4].style.visibility = 'hidden'; //corrective Actions add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link(step6)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		document.getElementsByClassName('msai_hyperlink')[8].style.visibility = 'hidden'; //verify effectiveness actions link(step6)
		F.disableAll();
		F.PRA_ACTION.enableAll();
		F.PRA_RCA_NO.enableAll();
		F.USER_ACTION.enable();
		F.SUMMARY_OF_REC_PREV_PLAN.enable();
		F.SUMMARY_OF_REC_PREV_PLAN.makeRequired();
		F.USER_COMMENT.enable();
	} else if (F.HID_STEP.read() == 8 && F.DD_CURRENT_STAGE.read() == 'SOW') { //validations for step8 step owner
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);
		}
		F.CONGRATULATORY_NOTE.makeRequired();
		F.RECIPIENTS.makeRequired();
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //root cause analysis add and delete button
			document.getElementsByClassName('toolbarContainer')[4].style.visibility = 'hidden'; //corrective Actions add and delete button
			document.getElementsByClassName('toolbarContainer')[5].style.visibility = 'hidden'; //Prevent recurrence Tab add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link(step6)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		document.getElementsByClassName('msai_hyperlink')[8].style.visibility = 'hidden'; //verify effectiveness actions link(step6)
		document.getElementsByClassName('msai_hyperlink')[9].style.visibility = 'hidden'; //preventive recurrence actions link(step7)
		F.disableAll();
		F.CONGRATULATORY_NOTE.enable();
		F.RECIPIENTS.enable();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
	} else if (F.HID_STEP.read() == 9) {
		if (F.getFormParameter('link_rpt_ro') != 'yes') {

			toolBarConfiguration(); //for adding tool bar
			jQuery('#MSAI_1484').hide();
			F.toolBar.updateTitle(jsAlertMessages["TITLE_EXECUTE"]);

			document.getElementsByClassName('toolbarContainer')[0].style.visibility = 'hidden'; //IDENTIFY TEAM add and delete button
			document.getElementsByClassName('toolbarContainer')[1].style.visibility = 'hidden'; //DIFINE PROBLM add and delete button
			document.getElementsByClassName('toolbarContainer')[2].style.visibility = 'hidden'; //CNT ACTION add and delete button
			document.getElementsByClassName('toolbarContainer')[3].style.visibility = 'hidden'; //root cause analysis add and delete button
			document.getElementsByClassName('toolbarContainer')[4].style.visibility = 'hidden'; //corrective Actions add and delete button
			document.getElementsByClassName('toolbarContainer')[5].style.visibility = 'hidden'; //Prevent recurrence Tab add and delete button
		}
		document.getElementsByClassName('msai_hyperlink')[0].style.visibility = 'hidden'; //create actions of Identify Team (step1)
		document.getElementsByClassName('msai_hyperlink')[1].style.visibility = 'hidden'; //create actions of define problem tab(step2)
		document.getElementsByClassName('msai_hyperlink')[2].style.visibility = 'hidden'; // containment action (step 3)
		document.getElementsByClassName('msai_hyperlink')[3].style.visibility = 'hidden'; // fish bone analysis link(step4)
		document.getElementsByClassName('msai_hyperlink')[4].style.visibility = 'hidden'; //why link (step4)
		document.getElementsByClassName('msai_hyperlink')[5].style.visibility = 'hidden'; //root cause analysis actions link (step4)
		document.getElementsByClassName('msai_hyperlink')[7].style.visibility = 'hidden'; //effectiveness check link(step6)
		document.getElementsByClassName('msai_hyperlink')[6].style.visibility = 'hidden'; //corrective actions action link((step5))
		document.getElementsByClassName('msai_hyperlink')[8].style.visibility = 'hidden'; //verify effectiveness actions link(step6)
		document.getElementsByClassName('msai_hyperlink')[9].style.visibility = 'hidden'; //preventive recurrence actions link(step7)
		F.disableAll();
		F.USER_ACTION.enable();
		F.USER_COMMENT.enable();
		F.TASK_TITLE.enableAll();
		F.TASK_OWNER.enableAll();
		F.TASK_APPROVER.enableAll();
		F.TASK_SCH_DATE.enableAll();
		F.TASK_DUE_DATE.enableAll();
		F.TASK_DESCRIPTION.enableAll();
		F.TASK_RESP_USER.enableAll();

	}
}



F.RCA.afterAddRow(function () {
	RCA_Validation();
});

F.CRA.afterAddRow(function () {
	craValidation();

});

F.PRA.afterAddRow(function () {
	praValidation();
});
//preventive recurrence region validations
function praValidation() {
	for (var row = 1; row <= F.PRA.getRowCount(); row++) {
		makeFieldRequired('PRA_ACTION', parseInt(row), 'N');
		makeFieldRequired('PRA_ACTION', parseInt(row), 'Y');
		makeFieldRequired('PRA_NO', parseInt(row), 'Y');
		F.PRA_NO.write(row, row).disable(row);
	}
}
F.TSK.afterAddRow(function () {
	tskValidation();
});
//Task region validations after add row
function tskValidation() {
	for (var row = 1; row <= F.TSK.getRowCount(); row++) {

		makeFieldRequired('TASK_NO', parseInt(row), 'N');
		makeFieldRequired('TASK_NO', parseInt(row), 'Y');
		makeFieldRequired('TASK_TITLE', parseInt(row), 'Y');
		makeFieldRequired('TASK_OWNER', parseInt(row), 'Y');
		makeFieldRequired('TASK_APPROVER', parseInt(row), 'Y');
		makeFieldRequired('TASK_SCH_DATE', parseInt(row), 'Y');
		makeFieldRequired('TASK_DUE_DATE', parseInt(row), 'Y');
		makeFieldRequired('TASK_DESCRIPTION', parseInt(row), 'Y');
		F.TASK_NO.write(row, row).disable(row);
	}
}
function tskNotRequireValidation() {
	for (var row = 1; row <= F.TSK.getRowCount(); row++) {

		makeFieldRequired('TASK_NO', parseInt(row), 'N');
		makeFieldRequired('TASK_TITLE', parseInt(row), 'N');
		makeFieldRequired('TASK_OWNER', parseInt(row), 'N');
		makeFieldRequired('TASK_APPROVER', parseInt(row), 'N');
		makeFieldRequired('TASK_SCH_DATE', parseInt(row), 'N');
		makeFieldRequired('TASK_DUE_DATE', parseInt(row), 'N');
		makeFieldRequired('TASK_DESCRIPTION', parseInt(row), 'N');
	}
}
//corrective Actions region validations
function craValidation() {
	for (var i = 1; i <= F.CRA.getRowCount(); i++) {

		makeFieldRequired('CRA_NO', parseInt(i), 'N');
		makeFieldRequired('CRA_NO', parseInt(i), 'Y');
		makeFieldRequired('CRA_ACTION', parseInt(i), 'Y');
		F.CRA_NO.write(i, i);

		//F.CRA_NO.makeRequired(i);
		//F.CRA_ACTION.makeRequired(i);
	}
}
/*
//COPQ region validations
function copqValidation() {
for (var row = 1; row <= F.CPQ.getRowCount(); row++) {
F.COPQ_NUMBER.write(row, row);
}
}*/
F.CPQ.afterAddRow(function (row) {
	copqValidation(row);
});
//function is used to make required fields in step4
function RCA_makerequired() {
	//alert('entered RCA_makereq');
	F.RCA_SUMMARY.makeRequired();
	F.SEVERITY_OF_IMPACT.makeRequired();
	F.LH_OF_OCCURRENCE.makeRequired();
	F.LH_OF_DETECTION.makeRequired();
	F.RPN.makeRequired();
}

function RCA_makenotrequired() {
	//alert('entered RCA_makereq');
	F.RCA_SUMMARY.makeNotRequired();
	F.SEVERITY_OF_IMPACT.makeNotRequired();
	F.LH_OF_OCCURRENCE.makeNotRequired();
	F.LH_OF_DETECTION.makeNotRequired();
	F.RPN.makeNotRequired();
}

//function is used to add RCA number
function RCA_Validation() {
	//alert('entered RCA_Valid');
	var rows = F.RCA.getRowCount();
	for (row = 1; row <= rows; row++) {
		F.RCA_NO.write(row, row);
		makeFieldRequired('RCA_NO', parseInt(row), 'N');
		makeFieldRequired('RCA_NO', parseInt(row), 'Y');
		makeFieldRequired('RCA_TYPE', parseInt(row), 'Y');
		makeFieldRequired('RCA_DESCRIPTION', parseInt(row), 'Y');

		//F.RCA_NO.makeRequired();
		//F.RCA_TYPE.makeRequired();
		//F.RCA_DESCRIPTION.makeRequired();
		F.RCA_NO.disableAll();
	}
}

//This Function is for Hiding the Ownership details in STP Region by Default and for Ownership stage
function hideownership() {
	//if (F.STEP_OWNER.read(1)=!"") {}
	OwnershipDetailsValidation();
}



function OwnershipDetailsValidation() {
	if (F.APPROVE_CAR_INITIATION.read() == 1) { //1-yes
		F.STP.show();
		F.CAR_OWNER.show();
		//F.FINAL_APPROVAL_DATE.show();
		F.FINAL_APPROVER.show();
		F.FINAL_APPROVER_ORG.show();
		F.CAR_OWNER.makeRequired();
		/*if (formStatus!= 5) {
		F.STP.showFirstPage();
		F.STP.showPage(1);}*/
		//F.FINAL_APPROVAL_DATE.makeRequired();
		/*for(var i=1;i<F.STP.getRowCount();i++)
	{makeFieldRequired('OWNERSHIP_DUE_DATE',i,'Y');
		makeFieldRequired('STEP_OWNER',i,'Y');
		makeFieldRequired('STEPS',i,'Y');
		}*/
		F.FINAL_APPROVER.makeRequired();
		F.FINAL_APPROVER_ORG.makeRequired();
		//F.STP.showPage(1);
		F.STP.showFirstPage();
		if (F.STEP_OWNER.read() == '' && F.STP.getRowCount() == 1) {
			getOwnerShipDetails();
		}
		STPmakeRequire();
	} else {
		F.STP.hide();
		/*for(var i=1;i<F.STP.getRowCount();i++){makeFieldRequired('OWNERSHIP_DUE_DATE',i,'N');
		makeFieldRequired('STEP_OWNER',i,'N');
		makeFieldRequired('STEPS',i,'N');
		}*/
		//F.FINAL_APPROVAL_DATE.hide();
		F.FINAL_APPROVER.hide();
		F.FINAL_APPROVER_ORG.hide();
		F.CAR_OWNER.hide();
		//F.FINAL_APPROVAL_DATE.makeNotRequired();
		F.FINAL_APPROVER.makeNotRequired();
		F.FINAL_APPROVER_ORG.makeNotRequired();
		F.CAR_OWNER.makeNotRequired();
		STPmakeNotRequire();

	}
}


//Make Required For STP region
function STPmakeRequire() {
	for (var row = 1; row <= F.STP.getRowCount(); row++) {
		//alert(row);
		makeFieldRequired('STEP_DUE_DATE', parseInt(row), 'Y');
		makeFieldRequired('STEP_OWNER', parseInt(row), 'Y');
		makeFieldRequired('STEP_DESC', parseInt(row), 'Y');
		//F.STEP_DUE_DATE.makeRequired(row);
		//F.STEP_OWNER.makeRequired(row);
		//F.STEP.makeRequired(row);
	}
}
//Makenot required for STP
function STPmakeNotRequire() {
	for (var row = 1; row <= F.STP.getRowCount(); row++) {
		//alert(row);
		makeFieldRequired('STEP_DUE_DATE', parseInt(row), 'N');
		makeFieldRequired('STEP_OWNER', parseInt(row), 'N');
		makeFieldRequired('STEP_DESC', parseInt(row), 'N');
		//F.STEP_DUE_DATE.makeNotRequired(row);
		//F.STEP_OWNER.makeNotRequired(row);
		//F.STEP.makeNotRequired(row);
	}
}

//Make Required for PTM region
function ptmValidation() {
	//alert('haha');
	for (var row = 1; row <= F.PTM.getRowCount(); row++) {
		F.MEMBER_ID.write('NONE', row);
		//F.PTM_NO.write(row, row);
		//F.PTM_NO.write(1, 1);
		F.PTM_NO.writeValue(row, row, row);
		//alert(F.PTM_NO.read(row));
		ptmMakeRequire();
		//F.PTM_NO.makeRequired(row);
		//F.PTM_NAME.makeRequired(row);
		//F.PTM_ROLE.makeRequired(row);
		F.PTM_NO.disableAll();
	}
}
function ptmMakeRequire() {
	for (var row = 1; row <= F.PTM.getRowCount(); row++) {
		makeFieldRequired('PTM_NO', parseInt(row), 'N');
		makeFieldRequired('PTM_NO', parseInt(row), 'Y');
		makeFieldRequired('PTM_NAME', parseInt(row), 'Y');
		makeFieldRequired('PTM_ROLE', parseInt(row), 'Y');
	}
}
F.PTM.afterAddRow(function () {
	ptmValidation();
});
//Make Required for QST region
F.QST.afterAddRow(function () {
	qstValidations();
});
//This function is for validations on QST region
function qstValidations() {
	for (var row = 1; row <= F.QST.getRowCount(); row++) {
		F.QUESTION_ID.write('NONE', row);
		F.QST_NO.write(row, parseInt(row));
		//F.QST_NO.makeRequired(row);
		//F.ANSWER.makeRequired(row);
		qstMakeRequire();

		//F.QST_NO.disableAll();
		if (row <= 3)
			//F.QUESTION.disable(row);
			if (row > 3) {
				makeFieldRequired('QUESTION', parseInt(row), 'Y');
			}
		//	F.QUESTION.makeRequired(row);
	}
}
function qstMakeRequire() {
	for (var row = 1; row <= F.QST.getRowCount(); row++) {
		makeFieldRequired('QST_NO', parseInt(row), 'N');
		makeFieldRequired('QST_NO', parseInt(row), 'Y');
		//makeFieldRequired('ANSWER',parseInt(row),'N');
		makeFieldRequired('ANSWER', parseInt(row), 'Y');
	}
}
//Make Required for CNT region
F.CNT.afterAddRow(function () {
	cntValidation();
});
//This function is for validations on CNT region
function cntValidation() {
	for (var row = 1; row <= F.CNT.getRowCount(); row++) {
		F.CNT_ACT_ID.write('NONE', row);
		F.CNT_NO.writeValue(row, row, row);
		//F.CNT_NO.write(1, 1);
		//alert(F.CNT_NO.read());
		cntMakeRequire();
		//F.CNT_NO.makeRequired(row);
		//F.CNT_ACTION_DESCRIPTION.makeRequired(row);
		F.CNT_NO.disableAll();
	}
}
function cntMakeRequire() {
	for (var row = 1; row <= F.CNT.getRowCount(); row++) {
		makeFieldRequired('CNT_NO', parseInt(row), 'Y');
		makeFieldRequired('CNT_ACTION_DESCRIPTION', parseInt(row), 'Y');
	}
}
//This function is for COPQ Region validation
function copqValidation(row) {
	F.COPQ_NUMBER.enable(row);
	F.COPQ_CATEGORY.enable(row);
	F.COPQ_DESCRIPTION.enable(row);
	F.COPQ_CURRENCY.enable(row);
	F.COPQ_AMOUNT.enable(row);
	F.COPQ_RELATES_TO_STEP.enable(row);
	F.COPQ_UPDATED_BY.enable(row);
	//
	if (F.CPQ.getRowCount() > 1)
		for (var r = 1; r <= F.CPQ.getRowCount(); r++) {
			F.COPQ_NUMBER.write(r, r);
			makeFieldRequired('COPQ_NUMBER', parseInt(r), 'N');
			makeFieldRequired('COPQ_NUMBER', parseInt(r), 'Y');
			makeFieldRequired('COPQ_CATEGORY', parseInt(r), 'Y');
			makeFieldRequired('COPQ_CURRENCY', parseInt(r), 'Y');
			makeFieldRequired('COPQ_AMOUNT', parseInt(r), 'Y');
			makeFieldRequired('COPQ_UPDATED_BY', parseInt(r), 'Y');

			if (F.COPQ_UPDATED_BY.read(r) == '') {
				F.COPQ_UPDATED_BY.writeValue(F.DD_CURRENT_USER_NAME.read(), F.DD_CURRENT_USER_NAME.read(), r);
			}

		}
	var t1 = F.CPQ.getRowCount();
	F.TOTAL_COPQ.write(t1);
	F.TOTAL_COPQ.disable();

}

//Action Title Link
function callreportdetails(paramone) {
	alert('hee');
	var p1;
	try {
		var parametersForReq = document.contextform.PARAMETERS_FOR_REQ.value;
		parametersForReq = parametersForReq.indexOf('&') > -1 ? encodeURIComponent(parametersForReq) : parametersForReq;
		parametersForReq = parametersForReq.replace(/%25/gi, '%2525');
	} catch (e) {}

	var def_tag1 = "CP_REPORT_ID=@REPORT_ID@&CP_PARAMETERS_FOR_REQ=" + parametersForReq + "&CP_METRIC_ID=@METRIC_ID@&CP_POPUP_FOR_BLANK_PARAMS=true&CP_DATE_CODE=2&CP_name=Infocenter&CP_CURRENT_FORM=2&CP_pN=1&";

	paramone = paramone + '&x_edit_mode=Yes' + "&submit_back=yes&bare=@SERVLET_URL@/Pushreportinline&" + def_tag1;
	p1 = paramone.substring(0, 2000);
	popupWindow = showPopup(p1, '', '_blank', 1200, 1200, 'yes', 1200, 1200, 'yes', 'yes', true);
}

function urlfunction() {

	var proc_insta_id = F.HIDDEN_FIELD_EFFECT.read().split(",");

	var url = SERVLET_URL + "/Pushinfolet?id=" + proc_insta_id[0] + "&proc=" + proc_insta_id[1] + "&instid=" + proc_insta_id[2] + "&submit_back=no&flag=0&emd=1" + "&wrapper=no" + "&from_link=yes";
	var sOptions = 'target=_blank,width=800px,height=680px,resizable=yes,scroll=yes,toolbar=no,top=0,left=0';
	popupWindow = showPopup(url, '', sOptions);

}

//Make Required Based on Selection From Drop Down
/*F.CREATION_TYPE.onChange(function() {

creationTypeValidation();
});*/
//
/*function creationTypeValidation() {
if (F.CREATION_TYPE.read() == 1) { //1-System

F.SOURCE_SYSTEM_OBJECT_ID.show();
if (F.HID_STEP.read() == 0) {
F.SOURCE_SYSTEM_ID.makeRequired();
F.SOURCE_SYSTEM_OBJECT_ID.makeRequired();
}
} else {

F.SOURCE_SYSTEM_ID.makeNotRequired()
//F.SOURCE_SYSTEM_OBJECT_ID.hide();
F.SOURCE_SYSTEM_OBJECT_ID.makeNotRequired();
}
}*/


function requestedForValidation() {
	if (F.REQUESTED_FOR.read() == 2) { //2-Product
		F.PRODUCT_ID.show();
		F.SRC_PROCESS_NAME.hide();
		F.SRC_PROCESS_NAME.writeValue('', '');
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			F.PRODUCT_ID.makeRequired();
			F.SRC_PROCESS_NAME.makeNotRequired();
		}
	} else if (F.REQUESTED_FOR.read() == 1) { //1-Process
		F.PRODUCT_ID.makeNotRequired();
		F.PRODUCT_ID.writeValue('', '');
		F.SRC_PROCESS_NAME.show();
		F.PRODUCT_ID.hide();
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			F.SRC_PROCESS_NAME.makeRequired();
		}

	} else {
		F.PRODUCT_ID.hide();
		F.PRODUCT_ID.writeValue('', '');
		F.SRC_PROCESS_NAME.writeValue('', '');
		F.SRC_PROCESS_NAME.hide();
		F.SRC_PROCESS_NAME.makeNotRequired();
		F.PRODUCT_ID.makeNotRequired();
	}

}

//for enable L1 and L2 Approver Based on Status
/*function enableStepOwner() {
for (var row = 1; row <= F.STP.getRowCount(); row++) {
if (F.STEP_STATUS.read(1) === "") {
F.STEP_OWNER.enable(row);
F.STEP_L1_APPROVER.enable(row);
F.STEP_L2_APPROVER.enable(row);
}
}
}*/


//This function is based on selection of PRIMARY_EVAL_PERFORMED
function primaryEvaluationValidation() {
	if (F.PRIMARY_EVAL_PERFORMED.read() == 1) { //1-yes
		F.PRIMARY_EVAL_PERFMD_DESC.show();
	} else {
		F.PRIMARY_EVAL_PERFMD_DESC.hide();
	}
}


function originBasedValidaion() {
	if (F.ORIGIN.read() == 1) { //1 for Customer
		F.CUSTOMER_NAME.show();
		F.CUSTOMER_LOCATION.show();
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			F.CUSTOMER_NAME.makeRequired();
			F.CUSTOMER_LOCATION.makeRequired();
			F.THRDPRTY_ORG_NME.makeNotRequired();
			F.THIRDPARTY_LOC.makeNotRequired();
		}
		F.THRDPRTY_ORG_NME.hide()
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.THIRDPARTY_LOC.hide();
		F.THIRDPARTY_LOC.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_LOCATION.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_LOCATION.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_LOCATION.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');

	} else if (F.ORIGIN.read() == 2) {
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			F.INTERNAL_DEPARTMENT_NAME.makeRequired();
			F.INTERNAL_DEPARTMENT_LOCATION.makeRequired();
			F.INTERNAL_DEPARTMENT_CONTACT.makeRequired();
		}
		F.CUSTOMER_NAME.hide(); //2 For Internal
		F.CUSTOMER_LOCATION.hide();
		F.THRDPRTY_ORG_NME.hide();
		F.THIRDPARTY_LOC.hide();
		F.CUSTOMER_NAME.makeNotRequired();
		F.CUSTOMER_LOCATION.makeNotRequired();
		F.THRDPRTY_ORG_NME.makeNotRequired();
		F.THIRDPARTY_LOC.makeNotRequired();
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.THIRDPARTY_LOC.writeValue('', '');
		F.CUSTOMER_NAME.writeValue('', '');
		F.CUSTOMER_LOCATION.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.show();
		F.INTERNAL_DEPARTMENT_LOCATION.show();
		F.INTERNAL_DEPARTMENT_CONTACT.show();

	} else if (F.ORIGIN.read() == 3) {
		F.CUSTOMER_NAME.hide(); //3 for ThirdParty
		F.CUSTOMER_NAME.writeValue('', '');
		F.CUSTOMER_LOCATION.hide();
		F.CUSTOMER_LOCATION.writeValue('', '');
		F.THRDPRTY_ORG_NME.show()

		F.THIRDPARTY_LOC.show();
		if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '') {
			F.THRDPRTY_ORG_NME.makeRequired();
			F.THIRDPARTY_LOC.makeRequired();
		}
		F.CUSTOMER_NAME.makeNotRequired();
		F.CUSTOMER_LOCATION.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_LOCATION.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_LOCATION.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_LOCATION.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');

	} else {
		F.CUSTOMER_NAME.hide(); //2 For Internal
		F.CUSTOMER_LOCATION.hide();
		F.THRDPRTY_ORG_NME.hide();
		F.THIRDPARTY_LOC.hide();
		F.CUSTOMER_NAME.makeNotRequired();
		F.CUSTOMER_LOCATION.makeNotRequired();
		F.THRDPRTY_ORG_NME.makeNotRequired();
		F.THIRDPARTY_LOC.makeNotRequired();
		F.THRDPRTY_ORG_NME.writeValue('', '');
		F.THIRDPARTY_LOC.writeValue('', '');
		F.CUSTOMER_NAME.writeValue('', '');
		F.CUSTOMER_LOCATION.writeValue('', '');
		F.INTERNAL_DEPARTMENT_NAME.hide();
		F.INTERNAL_DEPARTMENT_LOCATION.hide();
		F.INTERNAL_DEPARTMENT_CONTACT.hide();
		F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
		F.INTERNAL_DEPARTMENT_LOCATION.makeNotRequired();
		F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
		F.INTERNAL_DEPARTMENT_NAME.writeValue('', '');
		F.INTERNAL_DEPARTMENT_LOCATION.writeValue('', '');
		F.INTERNAL_DEPARTMENT_CONTACT.writeValue('', '');

	}
}

//This function is for showing Action Tab when click on Initiate Action Item
function showActionTab() {
	//F.getTab('MSAI_41').goToTab(12);
	//document.getElementById('MSAI_1150').innerHTML ='<a id=MSAI_1150 class=msai_flexi_button tabindex="0" title = "Refresh" onclick="javascript:checkResponse()" aside_onclick="javascript:checkResponse()"><img src="/ext/resources/images/default/msi/appstudio/refresh_action.gif" width=18 height=18 align = right>';
	var getrwcnt = F.ACT.getRowCount();
	if (getrwcnt > 0) {
		for (var i = 1; i <= getrwcnt; i++) {
			actionValidate(i);
			//alert('showactiontab fun called');
		}
	}

	F.getTab(Tabs.ACTION).show();
	F.ACTION_ITEM_NO.enable();
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
	gridHandler('ACTION_RELATES_TO', 'ACTION_RELATES_TO', 'ACT');
	//actionRelatesTo();
	var row1 = F.ACT.getRowCount();
	if (F.ACTION_ITEM_NO.read(row1) != '' && F.ACTION_ITEM_TITLE.read(row1) != '' && F.ACTION_OWNER.read(row1) != '') {
		F.ACT.addRow(true, true);
		//var row = F.ACT.getRowCount();
		//var step = parseInt(F.HID_STEP.read());
		// F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
	} else {
		var row = F.ACT.getRowCount();
		var step = parseInt(F.HID_STEP.read());
		F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
	}

	/*var rows=F.ACT.getRowCount();
	for(var i=1;i<rows;i++){
	if(F.ACTION_STEP_HIDDEN.read(i)=='Y'){
	F.ACT.disableRow(i);
	}
	}*/

}

function actionRelatesTo(ax) {

	//alert('ax'+ax);
	//alert('in relates to');
	var step = F.HID_STEP.read();
	//alert(step+' '+ax+' '+stpObject[step]);
	F.ACTION_RELATES_TO.writeValue(step, stpObject[step], ax);

}

//This code is for making the Fields required in Action Tab
//var n= F.ACT.getRowCount();

F.ACT.afterAddRow(function () {
	alert('hey1');

	var n = F.ACT.getRowCount();
	//alert('n value'+n);
	//n = n + 1;
	if (F.ACTION_STEP_HIDDEN.read(n) == '') {
		alert('hey');
		F.ACT.setDataGridConfig = {
			"ACTION_ITEM_TITLE" : {
				"text" : {
					"displayValue" : "Act1"
				}
			}
		};
		F.ACT.dataGrid.body.refresh();
	}
	F.ACTION_ITEM_NO.write(n, n);

	//alert('n'+n);

	actionRelatesTo(n);
	enableActionItems(n);
	gridHandler('ACTION_RELATES_TO', 'ACTION_RELATES_TO', 'ACT');
	actionValidate(n);
});

function actionCheckboxValidation() {
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
			//fn_checkbox_disabling();
			$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + x + ')').find('td:eq(0)').find('input').attr('disabled', true);
		}
	}
}
function actionValidate(x) {
	//alert('actionValidate fun called'+x);
	//debugger;
	F.ACTION_ITEM_TITLE.makeRequired(x);
	//F.ACTION_ITEM_TITLE.disable(x);
	//F.ACTION_ITEM_NO.disable(x);
	F.ACTION_OWNER.makeRequired(x);
	F.ACTION_ITEM_START_DATE.makeRequired(x);
	F.ACTION_ITEM_DUE_DATE.makeRequired(x);
	F.ACTION_DESC.makeRequired(x);
	F.ACTION_PRIORITY.makeRequired(x);
	F.ACTION_ITEM_NO.makeRequired(x);
	F.ACTION_RESPONSE.disableAll();
	F.ACTION_RELATES_TO.disable(x);
	actionCheckboxValidation();
	/*if (F.ACTION_STEP_HIDDEN.read(x) == 'Y' || F.ACTION_STEP_HIDDEN.read(x) == 'N') {
	F.ACT.disableRow(x);
	//fn_checkbox_disabling();
	$('#msai_multirow_datagrid_' + F.ACT.getID()).find('tbody').find('tr:eq(' + x + ')').find('td:eq(0)').find('input').attr('disabled', true);*/
}

/*  if (F.ACTION_ITEM_NO.read() != '' && F.ACTION_ITEM_TITLE.read() != '') {
F.ACT.addRow(true, true);
var row = F.ACT.getRowCount();
var step = parseInt(F.HID_STEP.read());
F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
} else {
var row = F.ACT.getRowCount();
var step = parseInt(F.HID_STEP.read());
F.ACTION_RELATES_TO.writeValue(step, stpObject[step], row);
}*/

/*
function fn_checkbox_disabling(){

$('input:checkbox').click(function(){
return false;
});}*/

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

	return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
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

//ACtion Based Validations
F.USER_ACTION.onChange(function () {
	//alert('in change action');
	var z = F.USER_ACTION.read();
	/*if (F.USER_ACTION.read() == 17 && F.DD_CURRENT_STAGE.read() == 'MGR') {
	F.APPROVE_CAR_INITIATION.makeNotRequired();
	F.USER_COMMENT.makeRequired();
	}*/
	if (F.USER_ACTION.read() == 2 || F.USER_ACTION.read() == 4 || F.USER_ACTION.read() == 7 || F.USER_ACTION.read() == 6 || F.USER_ACTION.read() == 13 || F.USER_ACTION.read() == 10 || F.USER_ACTION.read() == 17) { //2-cancel,4-Seek additional info,7-change ownership,6-request for change,13transfer of ownership
		F.USER_COMMENT.makeRequired();
	} else {
		F.USER_COMMENT.makeNotRequired();
		if ((F.DD_CURRENT_STAGE.read() == 'INT' && F.HID_PREVIOUS_STAGE.read() == 'MGR') || (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN'))
			F.USER_COMMENT.makeRequired();
	}
	if (F.USER_ACTION.read() == 2 || F.USER_ACTION.read() == 17 || F.USER_ACTION.read() == 13) {
		if (F.DD_CURRENT_STAGE.read() == 'MGR')
			//F.DUE_DATE.makeNotRequired();
			if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') {
				STPmakeNotRequire();
			}
		//alert('action');
	} else {
		if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT') {
			STPmakeRequire();
		}
	}
	//Retaining Manager value after selecting transfer of owner ship again other options selected
	if ((F.USER_ACTION.read() == 2 || F.USER_ACTION.read() == 17 || F.USER_ACTION.read() == '') && (F.DD_CURRENT_STAGE.read() == 'MGR')) {
		//alert('hello');
		F.MANAGER.writeValue(mgrStored1, mgrDisp1);
	}
	//This code is for Ask for Manager name change when manager want to request for ownership change
	if (F.USER_ACTION.read() == 7 || F.USER_ACTION.read() == 13 || F.USER_ACTION.read() == 3) { //3-trigger action || F.USER_ACTION.read() == 3
		var mgrStored2 = F.MANAGER.read();
		var mgrDisp2 = F.MANAGER.readDisplayedValue();
		if (F.DD_CURRENT_STAGE.read() == 'MGR')
			if (mgrStored1 == mgrStored2) {
				alert(jsAlertMessages["MGR_CHANGE"]);
				F.MANAGER.writeValue('', '');
				//alert('hello');
				//F.USER_ACTION.writeValue('');
				flag = 0;
			} else {
				flag = 1;
				//alert(p1+'here u r'+r1);
				F.PRIORITY.write(p1);
				F.RESP_DEPT.writeValue(r1, d1);
			}

		if (F.HID_STEP.read() == 5) {
			F.CRA_PLAN_IMPL_SUMMARY.makeNotRequired();
		}
		//when Action is request for Ownership or trigger action items following fields need to optional
		if (F.HID_STEP.read() == 2) {
			//alert('on change');
			for (var row = 1; row <= F.QST.getRowCount(); row++) {
				makeFieldRequired('QST_NO', parseInt(row), 'N');
				makeFieldRequired('ANSWER', parseInt(row), 'N');
			}
		}

		//when Action is request for Ownership or trigger action items following fields need to optional
		if (F.HID_STEP.read() == 1) {
			//alert('here');
			for (var row = 1; row <= F.PTM.getRowCount(); row++) {
				makeFieldRequired('PTM_NO', parseInt(row), 'N');
				makeFieldRequired('PTM_NAME', parseInt(row), 'N');
				makeFieldRequired('PTM_ROLE', parseInt(row), 'N');
			}
			//F.PTM_NO.makeRequired(row);
		}
		if (F.HID_STEP.read() == 3) {
			for (var row = 1; row <= F.CNT.getRowCount(); row++) {
				makeFieldRequired('CNT_NO', parseInt(row), 'N');
				makeFieldRequired('CNT_ACTION_DESCRIPTION', parseInt(row), 'N');
			}

		}
		if (F.HID_STEP.read() == 4) {
			for (var row = 1; row <= F.RCA.getRowCount(); row++) {
				makeFieldRequired('RCA_NO', parseInt(row), 'N');
				makeFieldRequired('RCA_TYPE', parseInt(row), 'N');
				makeFieldRequired('RCA_DESCRIPTION', parseInt(row), 'N');
			}

		}
		if (F.HID_STEP.read() == 5) {
			for (var i = 1; i <= F.CRA.getRowCount(); i++) {
				makeFieldRequired('CRA_NO', parseInt(i), 'N');
				makeFieldRequired('CRA_ACTION', parseInt(i), 'N');
			}
		}
		if (F.HID_STEP.read() == 6) {
			F.NEED_EFFECT_VERIFICATION.makeNotRequired();
		}
		if (F.HID_STEP.read() == 7) {
			F.SUMMARY_OF_REC_PREV_PLAN.makeNotRequired();
			for (var row = 1; row <= F.PRA.getRowCount(); row++) {
				makeFieldRequired('PRA_NO', parseInt(row), 'N');
				makeFieldRequired('PRA_ACTION', parseInt(row), 'N');

			}
		}

	} else {
		if (F.HID_STEP.read() == 5) {
			F.CRA_PLAN_IMPL_SUMMARY.makeRequired();
		}
	}
	if (F.USER_ACTION.read() == 10) {
		if (F.HID_STEP.read() == 9)
			tskNotRequireValidation();
	}
	if (F.USER_ACTION.read() == 5) {
		if (F.HID_STEP.read() == 9)
			tskValidation();
	}

	if (F.USER_ACTION.read() == 14) {
		if (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'SOW') {
			F.NEW_STEP_OWNER.show();
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

	if (F.USER_ACTION.read() == 4) {
		if (F.DD_CURRENT_STAGE.read() == 'OWN' && F.HID_PREVIOUS_STAGE.read() == 'SOW') {
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

	if (F.USER_ACTION.read() == 7 || F.USER_ACTION.read() == 3) {
		if (F.HID_STEP.read() == 4) {
			RCA_makenotrequired();
		}

	}
	if (F.USER_ACTION.read() == 1) {
		//alert('here2'+F.USER_ACTION.read());
		if (F.HID_STEP.read() == 4) {
			if (F.RCA.getRowCount() > 1)
				RCA_makerequired();
		}
		if (F.HID_STEP.read() == 1) {
			if (F.PTM.getRowCount() > 1)
				ptmValidation();
		}
		if (F.HID_STEP.read() == 2) {
			if (F.QST.getRowCount() > 1)
				qstValidations();
		}
		if (F.HID_STEP.read() == 3) {
			if (F.CNT.getRowCount() > 1)
				cntValidation();
		}
		if (F.HID_STEP.read() == 4) {
			if (F.RCA.getRowCount() > 1)
				RCA_Validation();
		}
		if (F.HID_STEP.read() == 5) {
			if (F.CRA.getRowCount() > 1)
				craValidation();
		}
		if (F.HID_STEP.read() == 6) {
			F.NEED_EFFECT_VERIFICATION.makeRequired();
		}
		if (F.HID_STEP.read() == 7) {
			praValidation();
			F.SUMMARY_OF_REC_PREV_PLAN.makeRequired()
		}
	}

	//alert('out'+F.USER_ACTION.read());

	if ((F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'INT')) //|| (F.DD_CURRENT_STAGE.read() == 'MGR' && F.HID_PREVIOUS_STAGE.read() == 'OWN')) {
	{
		if (cnt == 0)
			if (F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == '') {
				//if(formStatus!=1)
				removeFromAction();
				//alert('2564');
				cnt++;
			}
	}
	if ((F.USER_ACTION.read() == '' && F.APPROVE_CAR_INITIATION.read() == 2) && (F.DD_CURRENT_STAGE.read() == 'MGR')) {
		if (cnt1 == 0) {
			//if(formStatus!=1)
			F.USER_ACTION.removeFromDropDown(14);
		}
		//alert('2571');
		cnt1++;
	}
	/*if (F.STEP_OWNER.read(F.HID_STEP.read()) == F.CAR_OWNER.read() && cnt2 == 0) {
	F.USER_ACTION.removeFromDropDown(7);
	//F.USER_ACTION.write('');
	cnt2++;
	}*/

	//alert('end'+F.USER_ACTION.read());

});

/*Action Response validation*/
function checkResponse() {

	if (F.HID_ACTION_HELPER.read() != '') {

		F.HID_ACTION_HELPER.callInfolet();
		setTimeout(function () {
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
						if (F.ACT_NO.read(z) == actionID && actionStatus == 'Complete') {
							actions[i] = 'i';
							//alert(z);
							F.ACTION_RESPONSE.write(actionResponse, z);
						}
						if (F.ACT_NO.read(z) == actionIDs && F.ACTION_OWNER.read(z) != actionOwner) {
							// alert('owner'+actionOwner);
							F.ACTION_OWNER.write(actionOwner, z);

						}
						if (F.ACT_NO.read(z) == actionIDs && F.ACTION_APPROVER.read(z) != actionApprover) {
							// alert('owner'+actionApprover);
							F.ACTION_APPROVER.write(actionApprover, z);
						}

					}

				}

			}
			// alert('hey');
			var mx = actions.toString();
			var mx = mx.replace(/i,/g, "");
			var mx = mx.replace(/,i/g, "");
			//alert('actions');
			// alert(mx);
			F.HID_ACTION_HELPER.write(mx);
			//alert('hid_act_helper'+F.HID_ACTION_HELPER.read());
			F.HID_ACTION_RESPONSE.write('');
			F.HID_ACT_OWNER_CHANGE.write('');
		}, 200);
	}
	actionCheckboxValidation();
}
// should be called on add row,onlclick of link and onload /
function enableActionItems(q) {
	if ((F.ACTION_RELATES_TO.read(q) == F.HID_STEP.read()) && F.ACTION_STEP_HIDDEN.read(q) == '') {
		//alert('F.ACTION_RELATES_TO.read(q)' + F.ACTION_RELATES_TO.read(q));
		//alert('F.HID_STEP.read()' + F.HID_STEP.read());
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
		alert(jsAlertMessages["FROM_DATE_LT_STEP_DATE"]);
		F.ACTION_ITEM_START_DATE.write('', row);
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

/* Action Date validations ends*/
//Please wirte all these showFirstPage of all the tabs on the respective step conditions and not all at one shot in on page load, rather do this on tab click event
/*F.STP.showFirstPage();
F.STP.showPage(1);

F.STP.showFirstPage();
F.STP.showPage(1);

F.RCA.showFirstPage();
F.RCA.showPage(1);
F.CRA.showFirstPage();
F.CRA.showPage(1);
F.PRA.showFirstPage();
F.PRA.showPage(1);
F.TSK.showFirstPage();
F.TSK.showPage(1);
F.CPQ.showFirstPage();
F.CPQ.showPage(1);
 */
/* F.getTab("MSAI_42").onClick(function() {
alert('call fun');

alert('called fun')

} );
 */

/*else if (F.HID_STEP.read() == 1)
{
F.getTab("MSAI_99").hide(); //step1 Tab
Var a=F.Step_Info.read();
}
else if (F.HID_STEP.read() == 2)
{
F.getTab("MSAI_127").hide(); //ste2 Tab
}
else if (F.HID_STEP.read() == 3)
{
F.getTab("MSAI_166").hide(); //ste3 Tab
}
else if (F.HID_STEP.read() == 4)
{
F.getTab("MSAI_197").hide(); //ste4 Tab
}
else if (F.HID_STEP.read() == 5)
{
F.getTab("MSAI_242").hide();//
}
else if (F.HID_STEP.read() == 6)
{
F.getTab("MSAI_283").hide(); //ste6 Tab

}
else if (F.HID_STEP.read() == 7)
{
F.getTab("MSAI_313").hide(); //ste7 Tab
}
else if (F.HID_STEP.read() == 8)
{
F.getTab("MSAI_350").hide(); //ste8 Tab
}

 */

/*
if (F.CAR_CREATED_BY.read() == '') {
F.CAR_CREATED_BY.write(F.DD_CURRENT_USER_NAME.read());
alert(F.DD_CURRENT_USER_NAME.read());
}
 */

/*F.CAR_CREATED_BY.onChange(function() {
F.CAR_CREATED_BY.callInfolet();
});
F.EMP_DET.afterAddRow(function()
{
//New row added to EMP_DET, do some validations
});*/
