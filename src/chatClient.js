import AmityClient, {
  ApiRegion,
  UserRepository,
  ChannelRepository,
  MessageRepository,
  ChannelMembershipRepository
} from "@amityco/js-sdk";

export const client = new AmityClient({
  apiKey: "b0e9eb0c6edda46d48658d14575d178dd55f8fb4b3323e2b",
  apiRegion: ApiRegion.EU,
});

export const channelId = "global_channel";

export const registerSession = async function (userId, displayName) {
  //if user does not exist, user will be created and logged in
  //if user does exist user will be logged in
  await client.registerSession({ userId, displayName });
  return await getUser(userId);
};

export const getUser = async function (userId) {
  return await UserRepository.getUser(userId);
};

export const joinChannel = async function (channelId) {
  return await ChannelRepository.joinChannel({ channelId });
};

export const leaveChannel = async function(channelId){
  return await ChannelMembershipRepository.leaveChannel({channelId});
}

export const queryChannels = async function (query) {
  let queryFilter;

  /*
    keyword: Specify keyword that should be in channel displayName
    includeDeleted : Specify whether to search for channels that has been closed. Possible values are:
    null (default) - Show both channel is active and closed.
    false - Search for channels that is still open
    tags : Search for channels with the specific tags. If more than 1 tags are specified in the query, system will search for channels that contain any of those tags.
    excludeTags : Search for channels without the specific tags. If more than 1 tags are specified in the query, system will search for channels that does not contain any one of those tags.
    filter : Membership status of the user. Possible values are:
    all (default) - Search for channels 
    member - Search for channels that the user is a member of
    notMember - Search for channels that the user is not a member of
    flagged - Search for channels that the user flagged
    types : type of channel to search for - conversation , broadcast , live or community
    userId : Search for channels that is created by a given User ID
  */
  if(query){
    queryFilter = query;
  }
  const channelList = await ChannelRepository.queryChannels(queryFilter) 
  console.log(channelList);
  return channelList;
}

export const queryMessages = function (channelId) {
  return MessageRepository.queryMessages({
    channelId,
  });
};

export const sendMessage = async function (channelId, text) {
  return await MessageRepository.createTextMessage({
    channelId,
    text,
  });
};
