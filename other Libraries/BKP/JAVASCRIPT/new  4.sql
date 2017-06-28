procedure MS_CAP_EMAIL(   
  
    V_SCAR_NO_INTERNAL      VARCHAR2,p_object_type VARCHAR2
)
is
    
  x_param_names varchar2_array := varchar2_array();
  x_param_values clob_array    := clob_array();
  x_recipients varchar2_array  := varchar2_array();
  x_subject         VARCHAR2(500);
  x_template        VARCHAR2(1000);
  lv_mail_template  VARCHAR2(4000);
  lv_mail_subject   VARCHAR2(4000);
  lv_mail_status    VARCHAR2(5);
  x_enterprise_id   NUMBER;
  lv_mail_copyright VARCHAR2(2000);
  o_error_code number;
  O_ERROR_MESSAGE varchar2(2000);
  V_SCAR_ID         varchar2(4000);
  V_CREATION_TYPE  varchar2(4000);
  V_FINAL_APPROVER  varchar2(4000);
  V_PRIORITY    varchar2(4000);
  LV_METRIC_ID  number(10);
   xn_error_handle_id NUMBER;
        xn_error_seq       NUMBER;		
		lv_car_scar         VARCHAR2(100);
  
  
   BEGIN
   
	
	IF p_object_type='MS_CAP_CAR' THEN
		select CAR_ID,CREATION_TYPE,FINAL_APPROVER,PRIORITY 
		into v_SCAR_ID,v_CREATION_TYPE,v_FINAL_APPROVER,v_PRIORITY
		from MS_CAP_CAR
		where SCAR_NO_INTERNAL=V_SCAR_NO_INTERNAL;		
		lv_car_scar:='CAR';
	ELSE IF p_object_type='MS_CAP_SCAR'	THEN
		select SCAR_ID,CREATION_TYPE,FINAL_APPROVER,PRIORITY 
		into v_SCAR_ID,v_CREATION_TYPE,v_FINAL_APPROVER,v_PRIORITY
		from MS_CAP_SCAR
		where SCAR_NO_INTERNAL=V_SCAR_NO_INTERNAL;		
		lv_car_scar:='SCAR';
	END IF;

	select METRIC_ID into LV_METRIC_ID from SI_METRICS_T
	WHERE METRIC_NAME=p_object_type;

	x_enterprise_id := ms_apps_utilities.get_enterprise_id(lv_metric_id);


	X_SUBJECT:=lv_car_scar||v_scar_id ||' is awaiting your Final Approval ';


     
      x_template:='MS_CAP/MS_CMP_CAR_FINAL_APPROVER.html';
      x_recipients.EXTEND();
      x_recipients(1):=v_FINAL_APPROVER;
      

      

      x_param_names.EXTEND(5);
      x_param_names(1) :='CAR_ID';
      x_param_names(2) :='CAR_MANAGER';
      x_param_names(3) :='CAR_TYPE';
      X_PARAM_NAMES(4) :='CAR_PRIORITY';
      X_PARAM_NAMES(5) :='CAR_DUE_DATE';

     
      X_PARAM_VALUES.extend(5);
      x_param_values(1) := v_SCAR_ID;
      x_param_values(2) :=v_FINAL_APPROVER;
      x_param_values(3) :=v_CREATION_TYPE;
      X_PARAM_VALUES(4) :=V_PRIORITY;
      x_param_values(5) :='';
     


      si_alert_sv.send_email(2, -- 3:Low, 2:Normal, 1:High
      x_recipients, 100000,     -- enterprise id
      X_SUBJECT, X_TEMPLATE, X_PARAM_NAMES, X_PARAM_VALUES, O_ERROR_CODE, O_ERROR_MESSAGE);
 
   EXCEPTION
   when OTHERS then
null;        
end ;