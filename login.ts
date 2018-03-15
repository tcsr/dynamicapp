{
    "MessageContent": [
        {
            "MessageLevel": "success",
            "MessageKey": "default",
            "Message": "New Password Saved"
        },
        {
            "MessageLevel": "success",
            "MessageKey": "length",
            "Message": "Registration Complete"
        },
        {
            "MessageLevel": "error",
            "MessageKey": "default",
            "Message": "There was a problem changing your password. Please try again."
        },
        {
            "MessageLevel": "error",
            "MessageKey": "length",
            "Message": "Account has been locked after 3 unsuccessful attempts."
        },
        {
            "MessageLevel": "error",
            "MessageKey": "invalid",
            "Message": "The username and password is invalid."
        }
    ],
    "HeaderContent": null,
    "BodyContent": {
        "FormContents": [
            {
                "Key": "username_label",
                "Type": "form",
                "Label": "Username",
                "Messages": [
                    {
                        "MessageLevel": "info",
                        "MessageKey": "default",
                        "Message": "Enter #labelname here"
                    },
                    {
                        "MessageLevel": "error",
                        "MessageKey": "empty",
                        "Message": "#labelname is required"
                    }
                ]
            },
            {
                "Key": "password_label",
                "Type": "form",
                "Label": "Password",
                "Messages": [
                    {
                        "MessageLevel": "info",
                        "MessageKey": "default",
                        "Message": "Enter #labelname here"
                    },
                    {
                        "MessageLevel": "error",
                        "MessageKey": "empty",
                        "Message": "#labelname is required"
                    }
                ]
            }
        ],
        "HtmlContents": null,
        "TextContents": [
            {
                "Key": "login_title_text",
                "Type": "text",
                "Text": "Sign in to Reward Center"
            },
            {
                "Key": "login_registration_msg",
                "Type": "text",
                "Text": "Do you have an account?"
            },
            {
                "Key": "sign_in_button_text",
                "Type": "text",
                "Text": "Sign In"
            }
        ],
        "ImageContents": null,
        "HyperlinkContents": [
            {
                "Key": "forgot_password_link",
                "Type": "link",
                "OpenLinkInNewWindow": false,
                "PartialURL": true,
                "LinkText": "Forgot Password?",
                "LinkURL": "/#/forgotpass"
            },
            {
                "Key": "register_link",
                "Type": "link",
                "OpenLinkInNewWindow": false,
                "PartialURL": true,
                "LinkText": "Register",
                "LinkURL": "/#/register"
            }
        ],
        "EmailContents": null,
        "OfferContents": null
    },
    "FooterContent": null
}

------------------

 loginPageData: any = {};
  formContents: any = [];
  textContents: any = [];
  hyperLinkContents: any = [];
  messageContents: any = [];

  login_text_loginTabLable;
  login_field_userName;
  login_field_password;
  login_page_username_validation_msg;
  login_page_password_validation_msg;
  login_button_submit = _.unescape('Sign In');
  login_button_register;
  
  
  
  
   if (result) {
          this.loginPageData = result;
          this.formContents = this.loginPageData.BodyContent.FormContents;
          this.textContents = this.loginPageData.BodyContent.TextContents;
          this.hyperLinkContents = this.loginPageData.BodyContent.HyperlinkContents;
          this.messageContents = this.loginPageData.MessageContent;

          this.login_text_loginTabLable = this.textContents[0].Text;
          this.login_field_userName = this.formContents[0].Label;
          this.login_field_password = this.formContents[1].Label;
          this.login_page_username_validation_msg = this.formContents[0].Messages[1].Message;
          this.login_page_password_validation_msg = this.formContents[1].Messages[1].Message;
          this.login_button_register = this.textContents[2].Text;

        } else {

        }
        
        ----
        
        getCarouselContent(texts){
    texts.content_texts.filter(element =>{
      if(element.view_all_url_text){
        this.viewAll = element.view_all_url_text;
      }
      if(element.view_all_url){
        this.viewAllUrl = element.view_all_url;
      }
      if(element.sale_text){
        this.saleText = element.sale_text;
      }
    });
  }








