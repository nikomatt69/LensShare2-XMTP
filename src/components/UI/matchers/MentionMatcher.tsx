
import formatHandle from 'src/utils/functions/formatHandle';
import { Matcher } from 'interweave';
import type { Profile } from 'src/utils/lens';
import Link from 'next/link';
import { createElement } from 'react';

export const Mention = ({ ...props }: any) => {
    const profile = {
        __typename: 'Profile',
        handle: props?.display.slice(1),
        name: null,
        id: null
    };

    return (
        <Link
            href={`/${formatHandle(props.display.slice(1))}`}
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            
            {/* {profile?.handle ? (
                <UserPreview
                    isBig={props?.isBig}
                    profile={profile as Profile}
                    followStatusLoading={props?.followStatusLoading}
                >
                    <Slug isMention={true} slug={formatHandle(props.display)} />
                </UserPreview>
            ) : (
                <Slug isMention={true} slug={formatHandle(props.display)} />
            )} */}
        </Link>
    );
};

export class MentionMatcher extends Matcher {
    replaceWith(match: string, props: any) {
        return createElement(Mention, props, match);
    }

    asTag(): string {
        return 'a';
    }

    match(value: string) {
        return this.doMatch(value, /@[\w.-]+/, (matches) => {
            return { display: matches[0] };
        });
    }
}