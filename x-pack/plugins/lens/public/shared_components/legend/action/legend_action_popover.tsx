/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { EuiContextMenuPanelDescriptor, EuiIcon, EuiPopover, EuiContextMenu } from '@elastic/eui';
import { useLegendAction } from '@elastic/charts';
import { ClickTriggerEvent } from '@kbn/charts-plugin/public';

export interface LegendActionPopoverProps {
  /**
   * Determines the panels label
   */
  label: string;
  /**
   * Callback on filter value
   */
  onFilter: (data: ClickTriggerEvent['data']) => void;
  /**
   * Determines the filter event data
   */
  context: ClickTriggerEvent['data'];
}

export const LegendActionPopover: React.FunctionComponent<LegendActionPopoverProps> = ({
  label,
  onFilter,
  context,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [ref, onClose] = useLegendAction<HTMLDivElement>();
  const panels: EuiContextMenuPanelDescriptor[] = [
    {
      id: 'main',
      title: label,
      items: [
        {
          name: i18n.translate('xpack.lens.shared.legend.filterForValueButtonAriaLabel', {
            defaultMessage: 'Filter for',
          }),
          'data-test-subj': `legend-${label}-filterIn`,
          icon: <EuiIcon type="plusInCircle" size="m" />,
          onClick: () => {
            setPopoverOpen(false);
            onFilter(context);
          },
        },
        {
          name: i18n.translate('xpack.lens.shared.legend.filterOutValueButtonAriaLabel', {
            defaultMessage: 'Filter out',
          }),
          'data-test-subj': `legend-${label}-filterOut`,
          icon: <EuiIcon type="minusInCircle" size="m" />,
          onClick: () => {
            setPopoverOpen(false);
            onFilter({ ...context, negate: true });
          },
        },
      ],
    },
  ];

  const Button = (
    <div
      tabIndex={0}
      ref={ref}
      role="button"
      aria-pressed="false"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginLeft: 4,
        marginRight: 4,
      }}
      data-test-subj={`legend-${label}`}
      onKeyPress={() => setPopoverOpen(!popoverOpen)}
      onClick={() => setPopoverOpen(!popoverOpen)}
    >
      <EuiIcon size="s" type="boxesVertical" />
    </div>
  );
  return (
    <EuiPopover
      button={Button}
      isOpen={popoverOpen}
      closePopover={() => {
        setPopoverOpen(false);
        onClose();
      }}
      panelPaddingSize="none"
      anchorPosition="upLeft"
      title={i18n.translate('xpack.lens.shared.legend.filterOptionsLegend', {
        defaultMessage: '{legendDataLabel}, filter options',
        values: { legendDataLabel: label },
      })}
    >
      <EuiContextMenu initialPanelId="main" panels={panels} />
    </EuiPopover>
  );
};
