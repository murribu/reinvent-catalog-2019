// tslint:disable
// this is an auto generated file. This will be overwritten

export const createInvitationCustom = `mutation CreateInvitationCustom($input: CustomCreateInvitationInput!) {
  createInvitationCustom(input: $input) {
    id
    owner
    token
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    role
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    relation
    otherRelation
    acceptedAt
    createdAt
    updatedAt
  }
}
`;
export const createPartner = `mutation CreatePartner($input: CreatePartnerInput!) {
  createPartner(input: $input) {
    id
    name
    enabled
    navLogo {
      bucket
      region
      key
      identityId
    }
    users {
      items {
        id
        owner
      }
      nextToken
    }
    admins {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const updatePartner = `mutation UpdatePartner($input: UpdatePartnerInput!) {
  updatePartner(input: $input) {
    id
    name
    enabled
    navLogo {
      bucket
      region
      key
      identityId
    }
    users {
      items {
        id
        owner
      }
      nextToken
    }
    admins {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const deletePartner = `mutation DeletePartner($input: DeletePartnerInput!) {
  deletePartner(input: $input) {
    id
    name
    enabled
    navLogo {
      bucket
      region
      key
      identityId
    }
    users {
      items {
        id
        owner
      }
      nextToken
    }
    admins {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const createPartnerAdmin = `mutation CreatePartnerAdmin($input: CreatePartnerAdminInput!) {
  createPartnerAdmin(input: $input) {
    id
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const updatePartnerAdmin = `mutation UpdatePartnerAdmin($input: UpdatePartnerAdminInput!) {
  updatePartnerAdmin(input: $input) {
    id
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const deletePartnerAdmin = `mutation DeletePartnerAdmin($input: DeletePartnerAdminInput!) {
  deletePartnerAdmin(input: $input) {
    id
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    owner
    profile {
      id
      owner
      user {
        id
        owner
      }
      state
      bio
      avatar {
        bucket
        region
        key
        identityId
      }
      private
      chatEnabled
    }
    privateProfile {
      id
      owner
      user {
        id
        owner
      }
      firstName
      lastName
      email
      phoneNumber
      primaryTreatmentCenter
      pushNotificationsEnabled
      emailNotificationsEnabled
      smsNotificationsEnabled
      privacyAcceptances {
        version
        acceptedAt
      }
      termsAcceptances {
        version
        acceptedAt
      }
    }
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    managedPartners {
      items {
        id
      }
      nextToken
    }
    invitations {
      items {
        id
        owner
        token
        role
        relation
        otherRelation
        acceptedAt
        createdAt
        updatedAt
      }
      nextToken
    }
    families {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    favorites {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
    postFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    commentFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    owner
    profile {
      id
      owner
      user {
        id
        owner
      }
      state
      bio
      avatar {
        bucket
        region
        key
        identityId
      }
      private
      chatEnabled
    }
    privateProfile {
      id
      owner
      user {
        id
        owner
      }
      firstName
      lastName
      email
      phoneNumber
      primaryTreatmentCenter
      pushNotificationsEnabled
      emailNotificationsEnabled
      smsNotificationsEnabled
      privacyAcceptances {
        version
        acceptedAt
      }
      termsAcceptances {
        version
        acceptedAt
      }
    }
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    managedPartners {
      items {
        id
      }
      nextToken
    }
    invitations {
      items {
        id
        owner
        token
        role
        relation
        otherRelation
        acceptedAt
        createdAt
        updatedAt
      }
      nextToken
    }
    families {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    favorites {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
    postFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    commentFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    owner
    profile {
      id
      owner
      user {
        id
        owner
      }
      state
      bio
      avatar {
        bucket
        region
        key
        identityId
      }
      private
      chatEnabled
    }
    privateProfile {
      id
      owner
      user {
        id
        owner
      }
      firstName
      lastName
      email
      phoneNumber
      primaryTreatmentCenter
      pushNotificationsEnabled
      emailNotificationsEnabled
      smsNotificationsEnabled
      privacyAcceptances {
        version
        acceptedAt
      }
      termsAcceptances {
        version
        acceptedAt
      }
    }
    partner {
      id
      name
      enabled
      navLogo {
        bucket
        region
        key
        identityId
      }
      users {
        nextToken
      }
      admins {
        nextToken
      }
    }
    managedPartners {
      items {
        id
      }
      nextToken
    }
    invitations {
      items {
        id
        owner
        token
        role
        relation
        otherRelation
        acceptedAt
        createdAt
        updatedAt
      }
      nextToken
    }
    families {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    favorites {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
    postFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    commentFlags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
  }
}
`;
export const createUserProfile = `mutation CreateUserProfile($input: CreateUserProfileInput!) {
  createUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    state
    bio
    avatar {
      bucket
      region
      key
      identityId
    }
    private
    chatEnabled
  }
}
`;
export const updateUserProfile = `mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
  updateUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    state
    bio
    avatar {
      bucket
      region
      key
      identityId
    }
    private
    chatEnabled
  }
}
`;
export const deleteUserProfile = `mutation DeleteUserProfile($input: DeleteUserProfileInput!) {
  deleteUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    state
    bio
    avatar {
      bucket
      region
      key
      identityId
    }
    private
    chatEnabled
  }
}
`;
export const createPrivateUserProfile = `mutation CreatePrivateUserProfile($input: CreatePrivateUserProfileInput!) {
  createPrivateUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    firstName
    lastName
    email
    phoneNumber
    primaryTreatmentCenter
    pushNotificationsEnabled
    emailNotificationsEnabled
    smsNotificationsEnabled
    privacyAcceptances {
      version
      acceptedAt
    }
    termsAcceptances {
      version
      acceptedAt
    }
  }
}
`;
export const updatePrivateUserProfile = `mutation UpdatePrivateUserProfile($input: UpdatePrivateUserProfileInput!) {
  updatePrivateUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    firstName
    lastName
    email
    phoneNumber
    primaryTreatmentCenter
    pushNotificationsEnabled
    emailNotificationsEnabled
    smsNotificationsEnabled
    privacyAcceptances {
      version
      acceptedAt
    }
    termsAcceptances {
      version
      acceptedAt
    }
  }
}
`;
export const deletePrivateUserProfile = `mutation DeletePrivateUserProfile($input: DeletePrivateUserProfileInput!) {
  deletePrivateUserProfile(input: $input) {
    id
    owner
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    firstName
    lastName
    email
    phoneNumber
    primaryTreatmentCenter
    pushNotificationsEnabled
    emailNotificationsEnabled
    smsNotificationsEnabled
    privacyAcceptances {
      version
      acceptedAt
    }
    termsAcceptances {
      version
      acceptedAt
    }
  }
}
`;
export const createFollow = `mutation CreateFollow($input: CreateFollowInput!) {
  createFollow(input: $input) {
    id
    to {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    from {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    followToId
    followFromId
    acceptedAt
    declinedAt
    createdAt
    updatedAt
  }
}
`;
export const updateFollow = `mutation UpdateFollow($input: UpdateFollowInput!) {
  updateFollow(input: $input) {
    id
    to {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    from {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    followToId
    followFromId
    acceptedAt
    declinedAt
    createdAt
    updatedAt
  }
}
`;
export const deleteFollow = `mutation DeleteFollow($input: DeleteFollowInput!) {
  deleteFollow(input: $input) {
    id
    to {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    from {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    followToId
    followFromId
    acceptedAt
    declinedAt
    createdAt
    updatedAt
  }
}
`;
export const createInvitation = `mutation CreateInvitation($input: CreateInvitationInput!) {
  createInvitation(input: $input) {
    id
    owner
    token
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    role
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    relation
    otherRelation
    acceptedAt
    createdAt
    updatedAt
  }
}
`;
export const updateInvitation = `mutation UpdateInvitation($input: UpdateInvitationInput!) {
  updateInvitation(input: $input) {
    id
    owner
    token
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    role
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    relation
    otherRelation
    acceptedAt
    createdAt
    updatedAt
  }
}
`;
export const deleteInvitation = `mutation DeleteInvitation($input: DeleteInvitationInput!) {
  deleteInvitation(input: $input) {
    id
    owner
    token
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    role
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    relation
    otherRelation
    acceptedAt
    createdAt
    updatedAt
  }
}
`;
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
  }
}
`;
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
  }
}
`;
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    posts {
      items {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      nextToken
    }
  }
}
`;
export const createDiagnosis = `mutation CreateDiagnosis($input: CreateDiagnosisInput!) {
  createDiagnosis(input: $input) {
    id
    name
    icd10Code
    enabled
  }
}
`;
export const updateDiagnosis = `mutation UpdateDiagnosis($input: UpdateDiagnosisInput!) {
  updateDiagnosis(input: $input) {
    id
    name
    icd10Code
    enabled
  }
}
`;
export const deleteDiagnosis = `mutation DeleteDiagnosis($input: DeleteDiagnosisInput!) {
  deleteDiagnosis(input: $input) {
    id
    name
    icd10Code
    enabled
  }
}
`;
export const createDiagnosisHistory = `mutation CreateDiagnosisHistory($input: CreateDiagnosisHistoryInput!) {
  createDiagnosisHistory(input: $input) {
    id
    owner
    status
    familyDiagnosis {
      id
      owner
      family {
        id
        owner
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      history {
        nextToken
      }
    }
  }
}
`;
export const updateDiagnosisHistory = `mutation UpdateDiagnosisHistory($input: UpdateDiagnosisHistoryInput!) {
  updateDiagnosisHistory(input: $input) {
    id
    owner
    status
    familyDiagnosis {
      id
      owner
      family {
        id
        owner
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      history {
        nextToken
      }
    }
  }
}
`;
export const deleteDiagnosisHistory = `mutation DeleteDiagnosisHistory($input: DeleteDiagnosisHistoryInput!) {
  deleteDiagnosisHistory(input: $input) {
    id
    owner
    status
    familyDiagnosis {
      id
      owner
      family {
        id
        owner
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      history {
        nextToken
      }
    }
  }
}
`;
export const createFamilyDiagnosis = `mutation CreateFamilyDiagnosis($input: CreateFamilyDiagnosisInput!) {
  createFamilyDiagnosis(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    history {
      items {
        id
        owner
        status
      }
      nextToken
    }
  }
}
`;
export const updateFamilyDiagnosis = `mutation UpdateFamilyDiagnosis($input: UpdateFamilyDiagnosisInput!) {
  updateFamilyDiagnosis(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    history {
      items {
        id
        owner
        status
      }
      nextToken
    }
  }
}
`;
export const deleteFamilyDiagnosis = `mutation DeleteFamilyDiagnosis($input: DeleteFamilyDiagnosisInput!) {
  deleteFamilyDiagnosis(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    history {
      items {
        id
        owner
        status
      }
      nextToken
    }
  }
}
`;
export const createFamilyMember = `mutation CreateFamilyMember($input: CreateFamilyMemberInput!) {
  createFamilyMember(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    relation
    otherRelation
  }
}
`;
export const updateFamilyMember = `mutation UpdateFamilyMember($input: UpdateFamilyMemberInput!) {
  updateFamilyMember(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    relation
    otherRelation
  }
}
`;
export const deleteFamilyMember = `mutation DeleteFamilyMember($input: DeleteFamilyMemberInput!) {
  deleteFamilyMember(input: $input) {
    id
    owner
    family {
      id
      owner
      name
      members {
        nextToken
      }
      diagnoses {
        nextToken
      }
    }
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    relation
    otherRelation
  }
}
`;
export const createFamily = `mutation CreateFamily($input: CreateFamilyInput!) {
  createFamily(input: $input) {
    id
    owner
    name
    members {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    diagnoses {
      items {
        id
        owner
      }
      nextToken
    }
  }
}
`;
export const updateFamily = `mutation UpdateFamily($input: UpdateFamilyInput!) {
  updateFamily(input: $input) {
    id
    owner
    name
    members {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    diagnoses {
      items {
        id
        owner
      }
      nextToken
    }
  }
}
`;
export const deleteFamily = `mutation DeleteFamily($input: DeleteFamilyInput!) {
  deleteFamily(input: $input) {
    id
    owner
    name
    members {
      items {
        id
        owner
        relation
        otherRelation
      }
      nextToken
    }
    diagnoses {
      items {
        id
        owner
      }
      nextToken
    }
  }
}
`;
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    attributes
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    category {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    postAuthorId
    postCategoryId
    postDiagnosisId
    media {
      bucket
      region
      key
      identityId
    }
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    tags
    version
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    content
    attributes
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    category {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    postAuthorId
    postCategoryId
    postDiagnosisId
    media {
      bucket
      region
      key
      identityId
    }
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    tags
    version
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    content
    attributes
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comments {
      items {
        id
        content
        attributes
        hidden
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    category {
      id
      name
      parent {
        id
        name
      }
      posts {
        nextToken
      }
    }
    diagnosis {
      id
      name
      icd10Code
      enabled
    }
    postAuthorId
    postCategoryId
    postDiagnosisId
    media {
      bucket
      region
      key
      identityId
    }
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    tags
    version
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    content
    attributes
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    version
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    content
    attributes
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    version
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    author {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    content
    attributes
    flags {
      items {
        id
        status
        reviewedAt
      }
      nextToken
    }
    hidden
    createdAt
    updatedAt
    version
  }
}
`;
export const createFavorite = `mutation CreateFavorite($input: CreateFavoriteInput!) {
  createFavorite(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    createdAt
    updatedAt
  }
}
`;
export const updateFavorite = `mutation UpdateFavorite($input: UpdateFavoriteInput!) {
  updateFavorite(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    createdAt
    updatedAt
  }
}
`;
export const deleteFavorite = `mutation DeleteFavorite($input: DeleteFavoriteInput!) {
  deleteFavorite(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    createdAt
    updatedAt
  }
}
`;
export const createPostFlag = `mutation CreatePostFlag($input: CreatePostFlagInput!) {
  createPostFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const updatePostFlag = `mutation UpdatePostFlag($input: UpdatePostFlagInput!) {
  updatePostFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const deletePostFlag = `mutation DeletePostFlag($input: DeletePostFlagInput!) {
  deletePostFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    post {
      id
      title
      content
      attributes
      author {
        id
        owner
      }
      comments {
        nextToken
      }
      category {
        id
        name
      }
      diagnosis {
        id
        name
        icd10Code
        enabled
      }
      postAuthorId
      postCategoryId
      postDiagnosisId
      media {
        bucket
        region
        key
        identityId
      }
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      tags
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const createCommentFlag = `mutation CreateCommentFlag($input: CreateCommentFlagInput!) {
  createCommentFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comment {
      id
      post {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      author {
        id
        owner
      }
      content
      attributes
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const updateCommentFlag = `mutation UpdateCommentFlag($input: UpdateCommentFlagInput!) {
  updateCommentFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comment {
      id
      post {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      author {
        id
        owner
      }
      content
      attributes
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const deleteCommentFlag = `mutation DeleteCommentFlag($input: DeleteCommentFlagInput!) {
  deleteCommentFlag(input: $input) {
    id
    user {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
    comment {
      id
      post {
        id
        title
        content
        attributes
        postAuthorId
        postCategoryId
        postDiagnosisId
        hidden
        createdAt
        updatedAt
        tags
        version
      }
      author {
        id
        owner
      }
      content
      attributes
      flags {
        nextToken
      }
      hidden
      createdAt
      updatedAt
      version
    }
    status
    reviewedAt
    reviewedBy {
      id
      owner
      profile {
        id
        owner
        state
        bio
        private
        chatEnabled
      }
      privateProfile {
        id
        owner
        firstName
        lastName
        email
        phoneNumber
        primaryTreatmentCenter
        pushNotificationsEnabled
        emailNotificationsEnabled
        smsNotificationsEnabled
      }
      partner {
        id
        name
        enabled
      }
      managedPartners {
        nextToken
      }
      invitations {
        nextToken
      }
      families {
        nextToken
      }
      posts {
        nextToken
      }
      comments {
        nextToken
      }
      favorites {
        nextToken
      }
      postFlags {
        nextToken
      }
      commentFlags {
        nextToken
      }
    }
  }
}
`;
export const createConversation = `mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    id
    owner
    participants
    messages {
      items {
        id
        owner
        participants
        type
        textContent
        meta
        messageConversationId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    meta
    createdAt
    updatedAt
    version
  }
}
`;
export const updateConversation = `mutation UpdateConversation($input: UpdateConversationInput!) {
  updateConversation(input: $input) {
    id
    owner
    participants
    messages {
      items {
        id
        owner
        participants
        type
        textContent
        meta
        messageConversationId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    meta
    createdAt
    updatedAt
    version
  }
}
`;
export const deleteConversation = `mutation DeleteConversation($input: DeleteConversationInput!) {
  deleteConversation(input: $input) {
    id
    owner
    participants
    messages {
      items {
        id
        owner
        participants
        type
        textContent
        meta
        messageConversationId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    meta
    createdAt
    updatedAt
    version
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    owner
    conversation {
      id
      owner
      participants
      messages {
        nextToken
      }
      meta
      createdAt
      updatedAt
      version
    }
    participants
    type
    textContent
    media {
      bucket
      region
      key
      identityId
    }
    meta
    messageConversationId
    createdAt
    updatedAt
    version
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    owner
    conversation {
      id
      owner
      participants
      messages {
        nextToken
      }
      meta
      createdAt
      updatedAt
      version
    }
    participants
    type
    textContent
    media {
      bucket
      region
      key
      identityId
    }
    meta
    messageConversationId
    createdAt
    updatedAt
    version
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    owner
    conversation {
      id
      owner
      participants
      messages {
        nextToken
      }
      meta
      createdAt
      updatedAt
      version
    }
    participants
    type
    textContent
    media {
      bucket
      region
      key
      identityId
    }
    meta
    messageConversationId
    createdAt
    updatedAt
    version
  }
}
`;
