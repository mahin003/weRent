import React from 'react';

const Footer = () => {
    return (
        <div className=".container-fluid  mt-4" style={{ backgroundColor: "rgb(211, 204, 204)",padding:"2px" }}>

            <div class="row border">
                <div class="col-md-12 col-md">
                    <div class="well well-md ">
                        <form class="form-horizontal col-md-5 mx-auto " action="" method="post">
                            <fieldset>
                                <legend class="text-center">Contact us</legend>


                                <div class="form-group">
                                    <div class="col-md-12">
                                        <input id="name" name="name" type="text" placeholder="Your name" class="form-control" />
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-md-12">
                                        <input id="email" name="email" type="text" placeholder="Your email" class="form-control" />
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-md-12">
                                        <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-md-12 text-right">
                                        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="text-center p-4" style={{backgroundColor: "rgba(0, 0, 1, 0.0)"}}>
                    © 2021 Copyright:
                    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">mahinqureship1@gmail.com</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;