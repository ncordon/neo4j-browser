import React from 'react'
import {
  DrawerBrowserCommand,
  DrawerExternalLink,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import { BuiltInGuideSidebarSlide } from 'browser/modules/Carousel/Slide'
import {
  LinkContainer,
  MarginTop,
  NoBulletsUl,
  Clickable,
  GuideListEntry,
  MarginBottomLi
} from 'browser/documentation/sidebar-guides/styled'
import { Guide } from 'shared/modules/guides/guidesDuck'
import docs, { GuideChapter } from 'browser/documentation'
import { BinIcon } from 'browser-components/icons/Icons'

type GuidePickerProps = {
  remoteGuides: Guide[]
  setCurrentGuide: (guide: Guide) => void
  updateRemoteGuides: (newList: Guide[]) => void
}

const builtInGuides: { name: GuideChapter; description: string }[] = [
  { name: 'intro', description: 'Navigating Neo4j Browser' },
  { name: 'concepts', description: 'Property graph model concepts' },
  { name: 'cypher', description: 'Cypher basics - create, match, delete' },
  {
    name: 'movie-graph',
    description: 'Queries and recommendations with Cypher - movie use case}'
  },
  {
    name: 'northwind-graph',
    description: 'Translate and import relation data into graph'
  }
]

const GuidePicker = ({
  remoteGuides,
  setCurrentGuide,
  updateRemoteGuides
}: GuidePickerProps): JSX.Element => (
  <BuiltInGuideSidebarSlide>
    You can also access Browser guides by running
    <DrawerBrowserCommand data-populate=":guide [guide name]">
      :guide [guide name]
    </DrawerBrowserCommand>
    in the code editor.
    <MarginTop pixels={25}>
      <DrawerSubHeader as="div" /* prevents guide styling of h5*/>
        Built-in guides
      </DrawerSubHeader>
    </MarginTop>
    <NoBulletsUl>
      {builtInGuides.map(({ name, description }) => (
        <MarginBottomLi
          key={name}
          onClick={() =>
            setCurrentGuide({ ...docs.guide.chapters[name], currentSlide: 0 })
          }
        >
          <DrawerBrowserCommand>:guide {name}</DrawerBrowserCommand>
          <MarginTop> {description} </MarginTop>
        </MarginBottomLi>
      ))}
    </NoBulletsUl>
    {remoteGuides.length !== 0 && (
      <>
        <MarginTop pixels={25}>
          <DrawerSubHeader as="div" /* prevents guide styling of h5*/>
            Remote Guides
          </DrawerSubHeader>
        </MarginTop>
        <NoBulletsUl>
          {remoteGuides.map(guide => (
            <GuideListEntry key={guide.title}>
              <DrawerBrowserCommand onClick={() => setCurrentGuide(guide)}>
                {guide.title}
              </DrawerBrowserCommand>
              <Clickable
                onClick={() => {
                  updateRemoteGuides(
                    remoteGuides.filter(({ title }) => title !== guide.title)
                  )
                }}
              >
                <BinIcon />
              </Clickable>
            </GuideListEntry>
          ))}
        </NoBulletsUl>
      </>
    )}
    <LinkContainer>
      <DrawerExternalLink href="https://neo4j.com/graphgists/">
        More guides
      </DrawerExternalLink>
    </LinkContainer>
  </BuiltInGuideSidebarSlide>
)

export default GuidePicker
