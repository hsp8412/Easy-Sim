## 
# Front-End

- (admin) (Steven)

1. Do skeleton implementation of Figma designs
2. Implement Figma designs

- (carrier) (Steven)

1. Do skeleton implementation of Figma designs
2. Implement Figma designs

- (customer) (Andrew, Henry)

1. Do skeleton implementation of Figma designs
2. Implement Figma designs 

-----
3. footer (Andrew)
4. search bar (Andrew)
5. profile page (Henry)
6. countries (Henry, Steven)
7. forget password? (Andrew)
8. admin (Steven)


# Back-End

1. Create models for schemas (Joshua)
2. All endpoints that come to mind (Jade)

Admin

- Get Admin_Info
- Get User_Info
- Get Carrier_Info

- Get All_Users
- Get All_Carriers

- Post Proposal_Decision
- Post Delete_User_Account

User

- Get User_Info
- Get Ordered_Products
- Get View_Products
- Get Countries

- Post Request_Refund
- Post Delete_Account

Carrier

- Get Carrier_Info
- Get Proposal_Decision

- Post Create_Proposal
- Post Delete_Account \* Might be similar to User_Delete




authController
- GET login (user)
- DELETE logout (user)

usersController
- GET getMe (user)
- GET getAllUsers (admin)
- GET getUserById (admin)
- POST updateMyProfile (user)
    - POST updateMyEmail (user)
    - POST updateMyPassword (user)
- POST updateUserById (admin)
    - User
        - POST updateUserEmailById (admin)
        - POST updateUserPasswordById (admin)
    - Carrier
        - POST updateCarrierEmailById (admin)
        - POST updateCarrierPasswordById (admin)
- DELETE deleteMyAccount (user)
- DELETE deleteUserById (admin)

adminController
- GET getMe (admin)
- POST adminLogin (admin)
- POST adminLogout (admin)

carriersController
- GET getMe (carrier) // get token
- POST carrierLogin (carrier)
- POST carrierLogout (carrier)
- POST updateMyProfile (carrier)
- POST createNewCarrier (admin) // get role from middleware
- POST updateCarrierById (admin)
- DELETE deleteCarrierById (admin)

productsController
- GET getAllProducts (everyone)
- GET getMyProducts (carrier)
- GET getProductsByCarrierId (admin)
- POST deactivateProductByProductId (admin)
- creation of new produt will be integrated to proposal review

countriesController
- GET getAllCountries (everyone)
- GET getCountryById (everyone) (return products)

ordersController
- GET getMyOrders (user)
- GET getOrdersByProductId (carrier)
- POST createNewOrder (user) (get productId from req.body)

proposalsController
- GET getAllProposals (admin)
- GET getMyProposals (carrier)
- POST createNewProposal (carrier)
- POST reviewProposalByProposalId (admin)

refundsController
- GET getMyRefunds (carrier)
- POST createNewRefund (user)
- POST reviewRefundByRefundId (carrier)


====
- proposalsController, refundsController (Joshua)
- rest of the controllers (Jade)

# Presentation
- Introduction, overview (Joshua)
- Why React, Description (Steven)
- Technical, live demo (Andrew)