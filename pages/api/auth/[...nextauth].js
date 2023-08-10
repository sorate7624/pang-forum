import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'effeaa3a65517f6fc198',
      clientSecret: '7abf101b7d8dd1ba2a39c6b801dd0f8258720f0b',
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('forum');
        let user = await db
          .collection('user_cred')
          .findOne({ email: credentials.email });
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return user;
      },
    }),
  ],

  //기간설정은 무시됨, github은 access token 유효기간 8시간, refresh token 유효기간 6개월
  jwt: {
    maxAge: 60,
  },
  callbacks: {
    // JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
    async jwt({ token, account, user }) {
      console.log('account', account);
      console.log('user', user);
      console.log('token', token);

      // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        };
      }

      // 2. 남은 시간이 임박한 경우 access token 재발급하기
      // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
      let remainingTime =
        token.accessTokenExpires - Math.round(Date.now() / 1000);
      if (remainingTime < 60 * 60 * 8 - 10) {
        console.log('유효기간 얼마안남음');
        let newJWT = await refreshAccessToken(token); // 3. 깃헙에게 재발급해달라고 조르기
        console.log('새로운 JWT : ', newJWT);
        return newJWT;
      } else {
        return token;
      }
    },

    //getServerSession 실행시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정가능
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
