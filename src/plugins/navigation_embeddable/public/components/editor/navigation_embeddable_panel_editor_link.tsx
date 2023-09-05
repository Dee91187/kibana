/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import useAsync from 'react-use/lib/useAsync';

import {
  EuiText,
  EuiIcon,
  EuiPanel,
  EuiToolTip,
  EuiFlexItem,
  EuiFlexGroup,
  EuiButtonIcon,
  EuiSkeletonTitle,
  DraggableProvidedDragHandleProps,
} from '@elastic/eui';
import { DashboardContainer } from '@kbn/dashboard-plugin/public/dashboard_container';

import { NavigationLinkInfo } from '../../embeddable/types';
import { validateUrl } from '../external_link/external_link_tools';
import { fetchDashboard } from '../dashboard_link/dashboard_link_tools';
import { NavEmbeddableStrings } from '../navigation_embeddable_strings';
import { DashboardLinkStrings } from '../dashboard_link/dashboard_link_strings';
import { DASHBOARD_LINK_TYPE, NavigationEmbeddableLink } from '../../../common/content_management';

export const NavigationEmbeddablePanelEditorLink = ({
  link,
  editLink,
  deleteLink,
  parentDashboard,
  dragHandleProps,
}: {
  editLink: () => void;
  deleteLink: () => void;
  link: NavigationEmbeddableLink;
  parentDashboard?: DashboardContainer;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) => {
  const [destinationError, setDestinationError] = useState<Error | undefined>();
  const parentDashboardTitle = parentDashboard?.select((state) => state.explicitInput.title);
  const parentDashboardId = parentDashboard?.select((state) => state.componentState.lastSavedId);

  const { value: linkLabel, loading: linkLabelLoading } = useAsync(async () => {
    if (!link.destination) {
      setDestinationError(DashboardLinkStrings.getDashboardErrorLabel());
      return;
    }

    if (link.type === DASHBOARD_LINK_TYPE) {
      if (parentDashboardId === link.destination) {
        return link.label || parentDashboardTitle;
      } else {
        const dashboard = await fetchDashboard(link.destination)
          .then((result) => {
            setDestinationError(undefined);
            return result;
          })
          .catch((error) => setDestinationError(error));
        return (
          link.label ||
          (dashboard ? dashboard.attributes.title : DashboardLinkStrings.getDashboardErrorLabel())
        );
      }
    } else {
      const { valid, message } = validateUrl(link.destination);
      if (!valid && message) {
        setDestinationError(new Error(message));
      }
      return link.label || link.destination;
    }
  }, [link]);

  const LinkLabel = useMemo(() => {
    const labelText = (
      <EuiFlexGroup tabIndex={0} gutterSize="s" responsive={false} wrap={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiIcon
            type={destinationError ? 'warning' : NavigationLinkInfo[link.type].icon}
            color={destinationError ? 'warning' : 'text'}
            aria-label={
              destinationError
                ? NavEmbeddableStrings.editor.panelEditor.getBrokenDashboardLinkAriaLabel()
                : NavigationLinkInfo[link.type].type
            }
          />
        </EuiFlexItem>

        <EuiFlexItem
          className={classNames('navEmbeddableLinkText', {
            'navEmbeddableLinkText--noLabel': !link.label,
          })}
        >
          <EuiSkeletonTitle
            size="xxxs"
            isLoading={linkLabelLoading}
            announceLoadedStatus={false}
            announceLoadingStatus={false}
          >
            <EuiText size="s" color={'default'} className="eui-textTruncate">
              {linkLabel}
            </EuiText>
          </EuiSkeletonTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    return () =>
      destinationError ? (
        <EuiToolTip
          content={destinationError.message}
          title={
            link.type === DASHBOARD_LINK_TYPE
              ? DashboardLinkStrings.getDashboardErrorLabel()
              : undefined // the messages thrown by an invalid URL are clear enough without an extra title
          }
        >
          {labelText}
        </EuiToolTip>
      ) : (
        labelText
      );
  }, [linkLabel, linkLabelLoading, destinationError, link.label, link.type]);

  return (
    <EuiPanel
      hasBorder
      hasShadow={false}
      color={destinationError ? 'warning' : 'plain'}
      className={`navEmbeddableLinkPanel ${destinationError ? 'linkError' : ''}`}
    >
      <EuiFlexGroup gutterSize="s" responsive={false} wrap={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiPanel
            color="transparent"
            paddingSize="none"
            {...dragHandleProps}
            aria-label={NavEmbeddableStrings.editor.panelEditor.getDragHandleAriaLabel()}
          >
            <EuiIcon type="grab" />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem className="navEmbeddableLinkText">
          <LinkLabel />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFlexGroup gutterSize="none" responsive={false} className="navEmbeddable_hoverActions">
            <EuiFlexItem>
              <EuiToolTip content={NavEmbeddableStrings.editor.getEditLinkTitle()}>
                <EuiButtonIcon
                  size="xs"
                  iconType="pencil"
                  onClick={editLink}
                  aria-label={NavEmbeddableStrings.editor.getEditLinkTitle()}
                />
              </EuiToolTip>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiToolTip content={NavEmbeddableStrings.editor.getDeleteLinkTitle()}>
                <EuiButtonIcon
                  size="xs"
                  iconType="trash"
                  aria-label={NavEmbeddableStrings.editor.getDeleteLinkTitle()}
                  color="danger"
                  onClick={deleteLink}
                />
              </EuiToolTip>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
