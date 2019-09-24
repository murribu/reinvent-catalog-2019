// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPartner = `query GetPartner($id: ID!) {
  getPartner(id: $id) {
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
export const listPartners = `query ListPartners(
  $filter: ModelPartnerFilterInput
  $limit: Int
  $nextToken: String
) {
  listPartners(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPartnerAdmin = `query GetPartnerAdmin($id: ID!) {
  getPartnerAdmin(id: $id) {
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
export const listPartnerAdmins = `query ListPartnerAdmins(
  $filter: ModelPartnerAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listPartnerAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      partner {
        id
        name
        enabled
      }
      user {
        id
        owner
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getUserProfile = `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
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
export const listUserProfiles = `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPrivateUserProfile = `query GetPrivateUserProfile($id: ID!) {
  getPrivateUserProfile(id: $id) {
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
export const listPrivateUserProfiles = `query ListPrivateUserProfiles(
  $filter: ModelPrivateUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrivateUserProfiles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getFollow = `query GetFollow($id: ID!) {
  getFollow(id: $id) {
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
export const listFollows = `query ListFollows(
  $filter: ModelFollowFilterInput
  $limit: Int
  $nextToken: String
) {
  listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      to {
        id
        owner
      }
      from {
        id
        owner
      }
      followToId
      followFromId
      acceptedAt
      declinedAt
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getInvitation = `query GetInvitation($id: ID!) {
  getInvitation(id: $id) {
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
export const listInvitations = `query ListInvitations(
  $filter: ModelInvitationFilterInput
  $limit: Int
  $nextToken: String
) {
  listInvitations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      token
      user {
        id
        owner
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
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
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
export const listCategories = `query ListCategories(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getDiagnosis = `query GetDiagnosis($id: ID!) {
  getDiagnosis(id: $id) {
    id
    name
    icd10Code
    enabled
  }
}
`;
export const listDiagnoses = `query ListDiagnoses(
  $filter: ModelDiagnosisFilterInput
  $limit: Int
  $nextToken: String
) {
  listDiagnoses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      icd10Code
      enabled
    }
    nextToken
  }
}
`;
export const getDiagnosisHistory = `query GetDiagnosisHistory($id: ID!) {
  getDiagnosisHistory(id: $id) {
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
export const listDiagnosisHistorys = `query ListDiagnosisHistorys(
  $filter: ModelDiagnosisHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listDiagnosisHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      status
      familyDiagnosis {
        id
        owner
      }
    }
    nextToken
  }
}
`;
export const getFamilyDiagnosis = `query GetFamilyDiagnosis($id: ID!) {
  getFamilyDiagnosis(id: $id) {
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
export const listFamilyDiagnosiss = `query ListFamilyDiagnosiss(
  $filter: ModelFamilyDiagnosisFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilyDiagnosiss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getFamilyMember = `query GetFamilyMember($id: ID!) {
  getFamilyMember(id: $id) {
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
export const listFamilyMembers = `query ListFamilyMembers(
  $filter: ModelFamilyMemberFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilyMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      family {
        id
        owner
        name
      }
      user {
        id
        owner
      }
      relation
      otherRelation
    }
    nextToken
  }
}
`;
export const getFamily = `query GetFamily($id: ID!) {
  getFamily(id: $id) {
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
export const listFamilys = `query ListFamilys(
  $filter: ModelFamilyFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getFavorite = `query GetFavorite($id: ID!) {
  getFavorite(id: $id) {
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
export const listFavorites = `query ListFavorites(
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
) {
  listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        owner
      }
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
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getPostFlag = `query GetPostFlag($id: ID!) {
  getPostFlag(id: $id) {
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
export const listPostFlags = `query ListPostFlags(
  $filter: ModelPostFlagFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        owner
      }
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
      status
      reviewedAt
      reviewedBy {
        id
        owner
      }
    }
    nextToken
  }
}
`;
export const getCommentFlag = `query GetCommentFlag($id: ID!) {
  getCommentFlag(id: $id) {
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
export const listCommentFlags = `query ListCommentFlags(
  $filter: ModelCommentFlagFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommentFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        owner
      }
      comment {
        id
        content
        attributes
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
      }
    }
    nextToken
  }
}
`;
export const getConversation = `query GetConversation($id: ID!) {
  getConversation(id: $id) {
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
export const listConversations = `query ListConversations(
  $filter: ModelConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      conversation {
        id
        owner
        participants
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
    nextToken
  }
}
`;
export const searchPosts = `query SearchPosts(
  $filter: SearchablePostFilterInput
  $sort: SearchablePostSortInput
  $limit: Int
  $nextToken: Int
) {
  searchPosts(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const searchConversations = `query SearchConversations(
  $filter: SearchableConversationFilterInput
  $sort: SearchableConversationSortInput
  $limit: Int
  $nextToken: Int
) {
  searchConversations(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const searchMessages = `query SearchMessages(
  $filter: SearchableMessageFilterInput
  $sort: SearchableMessageSortInput
  $limit: Int
  $nextToken: Int
) {
  searchMessages(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      conversation {
        id
        owner
        participants
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
    nextToken
  }
}
`;
