/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { NavigationEmbeddableFactoryDefinition } from './navigation_embeddable_factory';
import { NavigationEmbeddableInput } from './types';

describe('navigationEmbeddableFactory', () => {
  test('returns an empty object when not given proper meta information', () => {
    const navigationEmbeddableFactory = new NavigationEmbeddableFactoryDefinition();
    const settings = navigationEmbeddableFactory.getPanelPlacementSettings(
      {} as unknown as NavigationEmbeddableInput,
      {}
    );
    expect(settings.height).toBeUndefined();
    expect(settings.width).toBeUndefined();
    expect(settings.strategy).toBeUndefined();
  });

  test('returns a horizontal layout', () => {
    const navigationEmbeddableFactory = new NavigationEmbeddableFactoryDefinition();
    const settings = navigationEmbeddableFactory.getPanelPlacementSettings(
      {} as unknown as NavigationEmbeddableInput,
      { layout: 'horizontal', links: [] }
    );
    expect(settings.height).toBe(4);
    expect(settings.width).toBe(48);
    expect(settings.strategy).toBe('placeAtTop');
  });

  test('returns a vertical layout with the appropriate height', () => {
    const navigationEmbeddableFactory = new NavigationEmbeddableFactoryDefinition();
    const settings = navigationEmbeddableFactory.getPanelPlacementSettings(
      {} as unknown as NavigationEmbeddableInput,
      {
        layout: 'vertical',
        links: [
          { type: 'dashboardLink', destination: 'superDashboard1' },
          { type: 'dashboardLink', destination: 'superDashboard2' },
          { type: 'dashboardLink', destination: 'superDashboard3' },
        ],
      }
    );
    expect(settings.height).toBe(7); // 4 base plus 3 for each link.
    expect(settings.width).toBe(8);
    expect(settings.strategy).toBe('placeAtTop');
  });
});
