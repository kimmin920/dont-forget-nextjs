import { MessageSchemaType } from '@/lib/validators/message';
import { messageData } from './message-data';
import {
  GUIDE_WORK_SENIOR,
  GUIDE_WORK_BOSS,
  GUIDE_TEACHER,
  GUIDE_PARENTS,
} from './message-guide';

export const chatbotPrompt = `
You are a helpful message-generator chatbot embedded on a message-generating website in Korea.
You are able to generate appropriate messages according to customers needs.
You are fluent in Korean and only generate text-messages in Korean, unless you are asked other languages.
You will get some message samples chosen by a customer, you generate messages taht follows tone and manners of the given messages, but the content must be new and suitable.
You generate messages with similar length of samples chosen by the customer.
You generate a message within a max_tokens of 256.
You create a message either for birthday wish or greeting, if it's greeting message, you should you consider the season of the current day, for example, if it's winter you might say "감기 조심하세요", and if it's summer you might say "더운데 시원한 여름 보내세요" etc.

You make a message following guide below:
  상황에 따라 적절한 메세지를 작성하는 방법에 대한 내용입니다.
  ${GUIDE_WORK_SENIOR}
  ${GUIDE_WORK_BOSS}
  ${GUIDE_TEACHER}
  ${GUIDE_PARENTS}

Also never say something like below, it's weird sentence:
  '{보내는사람}로부터'
  '{보내는사람}님의 {받는사람}께'
`;

export const generateUserPromt = (props: MessageSchemaType) => {
  const { type, from, to } = props;
  return `Generate ${type} message, its very important to generate message in a suitable and appropriate manner sending from ${from} to ${to}.
    sample messages:
    ${type === 'BIRTHDAY' && BIRTHDAY_METADATA}
  `;
};

const BIRTHDAY_METADATA = [
  '아버님 생신 진심으로 축하드립니다❤️. 아버님의 넉넉한 마음과 든든한 지지가 항상 저희 가정에 큰 힘이 되어주십니다. 아버님 덕분에 저도 더 좋은 사람이 되려 노력하고 있어요. 항상 건강하시고, 올 한 해도 아버님께서 소망하시는 모든 일들이 이루어지길 기원할게요. 행복하시고 즐거운 시간 보내시길 바라며, 맛있는 음식과 함께 즐거운 시간 보내세요. 아버님 항상 감사드립니다.',
  '존경하는 아버님께..❤️ \n 아버님 생신을 진심으로 축하드려요❤️ 항상 건강하시고 행복하세요^^ 언제나 감사드립니다. 제가 많이 부족하지만 예쁘게 봐주세요! 앞으로 노력 하겠습니다😀 사랑합니다🥰',
  '어머님(아버님), 생신을 진심으로 축하 드립니다. 이렇게 한 가족이 되어, 어머님(아버님)의 생신을 함께 축하할 수 있어 기쁩니다. 언제나 건강하시고, 행복하세요.',
  '어머님(아버님), 저 ○○○예요. ○○번째 생신을 진심으로 축하 드립니다. 며느리(사위)에게 보여주시는 무한한 사랑에, 항상 감사하면서도 어떻게 마음을 전해야 하나 싶었는데. 이렇게 어머님(아버님)의 생신을 맞아, 감사하다는 말을 할 수 있어 다행이라는 생각이 듭니다. 우리 어머님(아버님). 언제나 건강하시고, 우리 어머님(아버님)의 90세, 100세 생신도 함께 축하할 수 있었으면 좋겠습니다.',
  '생신을 축하 드립니다. 항상 환하게 웃을 수 있는, 행복한 일들만 가득하시길 바라겠습니다.',
  '생신을 진심으로 축하 드립니다. 이 뜻 깊은 날이 앞으로도 끝없이 반복될 수 있도록, 언제나 곁에서 응원하겠습니다.',
  '생신을 축하 드리며. 항상 건강하시고, 웃는 모습을 뵐 수 있기를 바라겠습니다.',
  '눈부시게 빛나는 오늘, 생신을 맞이한 어르신께 축하를 드릴 수 있어 기쁩니다. 오래도록 아로새길 아름다운 추억을 만드시길 바라며. 좋은 하루 되세요.',
];
