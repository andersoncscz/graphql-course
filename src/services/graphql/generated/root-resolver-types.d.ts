import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../resolvers/context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AccessToken = {
   __typename?: 'AccessToken',
  payload: PayLoad,
  token: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createProfile: Profile,
  updateProfile: Profile,
  deleteProfile?: Maybe<Profile>,
  createUser: AccessToken,
  updateUser: User,
  deleteUser?: Maybe<User>,
};


export type MutationCreateProfileArgs = {
  data: ProfileInput
};


export type MutationUpdateProfileArgs = {
  data: ProfileInput
};


export type MutationDeleteProfileArgs = {
  id: Scalars['ID']
};


export type MutationCreateUserArgs = {
  data: UserInput
};


export type MutationUpdateUserArgs = {
  data: UserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};

export type PayLoad = {
   __typename?: 'PayLoad',
  user: UserAuthenticated,
  iat: Scalars['Int'],
  exp?: Maybe<Scalars['Int']>,
};

export type Profile = {
   __typename?: 'Profile',
  id: Scalars['ID'],
  name: Scalars['String'],
  label: Scalars['String'],
  is_active: Scalars['Boolean'],
  created_at: Scalars['String'],
};

export type ProfileInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  label: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  profile?: Maybe<Profile>,
  profiles: Array<Profile>,
  user?: Maybe<User>,
  users: Array<User>,
  auth?: Maybe<AccessToken>,
};


export type QueryProfileArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  data: UserFilterInput
};


export type QueryAuthArgs = {
  data: UserAuthInput
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  created_at: Scalars['String'],
  is_active: Scalars['Boolean'],
  profiles?: Maybe<Array<Profile>>,
};

export type UserAuthenticated = {
   __typename?: 'UserAuthenticated',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  profiles?: Maybe<Array<Profile>>,
};

export type UserAuthInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UserFilterInput = {
  id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  is_active?: Maybe<Scalars['Boolean']>,
  profilesIds?: Maybe<Array<Scalars['ID']>>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Profile: ResolverTypeWrapper<Profile>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UserFilterInput: UserFilterInput,
  User: ResolverTypeWrapper<User>,
  UserAuthInput: UserAuthInput,
  AccessToken: ResolverTypeWrapper<AccessToken>,
  PayLoad: ResolverTypeWrapper<PayLoad>,
  UserAuthenticated: ResolverTypeWrapper<UserAuthenticated>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  ProfileInput: ProfileInput,
  UserInput: UserInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Profile: Profile,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  UserFilterInput: UserFilterInput,
  User: User,
  UserAuthInput: UserAuthInput,
  AccessToken: AccessToken,
  PayLoad: PayLoad,
  UserAuthenticated: UserAuthenticated,
  Int: Scalars['Int'],
  Mutation: {},
  ProfileInput: ProfileInput,
  UserInput: UserInput,
}>;

export type AccessTokenResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = ResolversObject<{
  payload?: Resolver<ResolversTypes['PayLoad'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationCreateProfileArgs, 'data'>>,
  updateProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'data'>>,
  deleteProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationDeleteProfileArgs, 'id'>>,
  createUser?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>,
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
}>;

export type PayLoadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PayLoad'] = ResolversParentTypes['PayLoad']> = ResolversObject<{
  user?: Resolver<ResolversTypes['UserAuthenticated'], ParentType, ContextType>,
  iat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type ProfileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  is_active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfileArgs, 'id'>>,
  profiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'data'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  auth?: Resolver<Maybe<ResolversTypes['AccessToken']>, ParentType, ContextType, RequireFields<QueryAuthArgs, 'data'>>,
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  is_active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  profiles?: Resolver<Maybe<Array<ResolversTypes['Profile']>>, ParentType, ContextType>,
}>;

export type UserAuthenticatedResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserAuthenticated'] = ResolversParentTypes['UserAuthenticated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  profiles?: Resolver<Maybe<Array<ResolversTypes['Profile']>>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AccessToken?: AccessTokenResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PayLoad?: PayLoadResolvers<ContextType>,
  Profile?: ProfileResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserAuthenticated?: UserAuthenticatedResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
